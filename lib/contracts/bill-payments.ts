import { Networks, Account, TransactionBuilder, Operation, BASE_FEE, StrKey, Horizon } from '@stellar/stellar-sdk'

const HORIZON_URL = process.env.HORIZON_URL || 'https://horizon-testnet.stellar.org'
const NETWORK_PASSPHRASE = process.env.NETWORK_PASSPHRASE || Networks.TESTNET
const server = new Horizon.Server(HORIZON_URL)

// ── Bill type ─────────────────────────────────────────────────────────────────

export interface Bill {
  id: string
  name: string
  amount: number
  dueDate: string
  recurring: boolean
  frequencyDays?: number
  paid: boolean
  status: 'paid' | 'overdue' | 'urgent' | 'upcoming'
  owner: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function validatePublicKey(pk: string) {
  try {
    return StrKey.isValidEd25519PublicKey(pk)
  } catch (e) {
    return false
  }
}

async function loadAccount(accountId: string) {
  if (!validatePublicKey(accountId)) throw new Error('invalid-account')
  return await server.loadAccount(accountId)
}

/**
 * Derives a bill status from its dueDate and paid flag.
 */
function deriveStatus(dueDate: string, paid: boolean): Bill['status'] {
  if (paid) return 'paid'
  const due = new Date(dueDate).getTime()
  const now = Date.now()
  const diffDays = (due - now) / (1000 * 60 * 60 * 24)
  if (diffDays < 0) return 'overdue'
  if (diffDays <= 3) return 'urgent'
  return 'upcoming'
}

/**
 * NOTE: The bill_payments Soroban contract is not yet deployed.
 * Until a contract ID is available, reads are served from the mock data set
 * so all API routes work end-to-end today.
 *
 * When the contract is deployed:
 * 1. Set BILL_PAYMENTS_CONTRACT_ID in .env.local
 * 2. Replace the mock implementations below with real SorobanRpc contract reads.
 */

const MOCK_BILLS: Bill[] = [
  {
    id: '1',
    name: 'School Tuition',
    amount: 500,
    dueDate: '2026-01-25T00:00:00.000Z',
    recurring: false,
    paid: false,
    status: 'overdue',
    owner: 'mock',
  },
  {
    id: '2',
    name: 'Rent Payment',
    amount: 800,
    dueDate: '2026-02-01T00:00:00.000Z',
    recurring: true,
    frequencyDays: 30,
    paid: false,
    status: 'urgent',
    owner: 'mock',
  },
  {
    id: '3',
    name: 'Electricity Bill',
    amount: 150,
    dueDate: '2026-02-05T00:00:00.000Z',
    recurring: true,
    frequencyDays: 30,
    paid: false,
    status: 'upcoming',
    owner: 'mock',
  },
  {
    id: '4',
    name: 'Internet Service',
    amount: 60,
    dueDate: '2026-02-10T00:00:00.000Z',
    recurring: true,
    frequencyDays: 30,
    paid: true,
    status: 'paid',
    owner: 'mock',
  },
]

// ── Read layer ────────────────────────────────────────────────────────────────

/**
 * Returns a single bill by ID for the given owner.
 * Throws 'not-found' if no bill matches.
 */
export async function getBill(id: string, owner: string): Promise<Bill> {
  // TODO: replace with contract read when BILL_PAYMENTS_CONTRACT_ID is set
  const bill = MOCK_BILLS.find((b) => b.id === id)
  if (!bill) throw new Error('not-found')
  return { ...bill, status: deriveStatus(bill.dueDate, bill.paid), owner }
}

/**
 * Returns all unpaid bills for the given owner.
 */
export async function getUnpaidBills(owner: string): Promise<Bill[]> {
  // TODO: replace with contract read when BILL_PAYMENTS_CONTRACT_ID is set
  return MOCK_BILLS
    .filter((b) => !b.paid)
    .map((b) => ({ ...b, status: deriveStatus(b.dueDate, b.paid), owner }))
}

/**
 * Returns all bills (paid and unpaid) for the given owner.
 */
export async function getAllBills(owner: string): Promise<Bill[]> {
  // TODO: replace with contract read when BILL_PAYMENTS_CONTRACT_ID is set
  return MOCK_BILLS.map((b) => ({
    ...b,
    status: deriveStatus(b.dueDate, b.paid),
    owner,
  }))
}

/**
 * Returns the sum of all unpaid bill amounts for the given owner.
 */
export async function getTotalUnpaid(owner: string): Promise<number> {
  const unpaid = await getUnpaidBills(owner)
  return unpaid.reduce((sum, b) => sum + b.amount, 0)
}

/**
 * Returns all overdue bills for the given owner.
 */
export async function getOverdueBills(owner: string): Promise<Bill[]> {
  const all = await getAllBills(owner)
  return all.filter((b) => b.status === 'overdue')
}

// ── Write layer (transaction builders) ───────────────────────────────────────

export async function buildCreateBillTx(
  owner: string,
  name: string,
  amount: number,
  dueDate: string,
  recurring: boolean,
  frequencyDays?: number
) {
  if (!validatePublicKey(owner)) throw new Error('invalid-owner')
  if (!(amount > 0)) throw new Error('invalid-amount')
  if (recurring && !(frequencyDays && frequencyDays > 0)) throw new Error('invalid-frequency')
  if (Number.isNaN(Date.parse(dueDate))) throw new Error('invalid-dueDate')

  const acctResp = await loadAccount(owner)
  const source = new Account(owner, acctResp.sequence)

  const txBuilder = new TransactionBuilder(source, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })

  txBuilder.addOperation(Operation.manageData({ name: 'bill:name', value: name.slice(0, 64) }))
  txBuilder.addOperation(Operation.manageData({ name: 'bill:amount', value: String(amount) }))
  txBuilder.addOperation(Operation.manageData({ name: 'bill:dueDate', value: new Date(dueDate).toISOString() }))
  txBuilder.addOperation(Operation.manageData({ name: 'bill:recurring', value: recurring ? '1' : '0' }))
  if (recurring && frequencyDays) {
    txBuilder.addOperation(Operation.manageData({ name: 'bill:frequencyDays', value: String(frequencyDays) }))
  }

  const tx = txBuilder.setTimeout(300).build()
  return tx.toXDR()
}

export async function buildPayBillTx(caller: string, billId: string) {
  if (!validatePublicKey(caller)) throw new Error('invalid-caller')
  if (!billId) throw new Error('invalid-billId')

  const acctResp = await loadAccount(caller)
  const source = new Account(caller, acctResp.sequence)

  const txBuilder = new TransactionBuilder(source, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })

  txBuilder.addOperation(Operation.manageData({ name: `bill:pay:${billId}`, value: '1' }))

  const tx = txBuilder.setTimeout(300).build()
  return tx.toXDR()
}

export async function buildCancelBillTx(caller: string, billId: string) {
  if (!validatePublicKey(caller)) throw new Error('invalid-caller')
  if (!billId) throw new Error('invalid-billId')

  const acctResp = await loadAccount(caller)
  const source = new Account(caller, acctResp.sequence)

  const txBuilder = new TransactionBuilder(source, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })

  txBuilder.addOperation(Operation.manageData({ name: `bill:cancel:${billId}`, value: '1' }))

  const tx = txBuilder.setTimeout(300).build()
  return tx.toXDR()
}

export default {
  getBill,
  getUnpaidBills,
  getAllBills,
  getTotalUnpaid,
  getOverdueBills,
  buildCreateBillTx,
  buildPayBillTx,
  buildCancelBillTx,
}