import { Target, DollarSign, TrendingUp } from 'lucide-react'

interface StatsCardProps {
    label: string
    value: string
    icon: React.ReactNode
}

function StatsCard({ label, value, icon }: StatsCardProps) {
    return (
        <div
            className="rounded-[20px] p-6 border border-white/[0.08] relative"
            style={{
                background: 'linear-gradient(180deg, #1A1A1A 0%, #141414 100%)',
            }}
        >
            {/* Icon in top right */}
            <div className="absolute top-6 right-6 text-[#DC2626]">
                {icon}
            </div>

            {/* Label */}
            <div className="text-sm font-medium text-white/40 mb-2">
                {label}
            </div>

            {/* Value */}
            <div className="text-[40px] font-bold text-white leading-none tracking-tight">
                {value}
            </div>
        </div>
    )
}

interface SavingsGoalsStatsCardsProps {
    totalGoals?: number
    totalTarget?: number
    totalSaved?: number
}

export default function SavingsGoalsStatsCards({
    totalGoals = 4,
    totalTarget = 48000,
    totalSaved = 26500,
}: SavingsGoalsStatsCardsProps) {
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard
                label="Total Goals"
                value={String(totalGoals)}
                icon={<Target className="w-6 h-6" />}
            />
            <StatsCard
                label="Total Target"
                value={formatCurrency(totalTarget)}
                icon={<DollarSign className="w-6 h-6" />}
            />
            <StatsCard
                label="Total Saved"
                value={formatCurrency(totalSaved)}
                icon={<TrendingUp className="w-6 h-6" />}
            />
        </div>
    )
}
