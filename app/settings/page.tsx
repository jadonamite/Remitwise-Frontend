"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  Bell,
  Globe,
  ShieldCheck,
  Info,
  LogOut,
  CreditCard,
  MessageSquare,
  FileText,
  Lock,
  Clock,
} from "lucide-react";
import SettingsSection from "@/components/SettingsSection";
import SettingsItem from "@/components/SettingsItem";
import SettingsHeader from "@/components/SettingsHeader";

export default function SettingsPage() {
  // Mock state for settings
  const [notifications, setNotifications] = useState({
    billReminders: true,
    paymentConfirmations: true,
    goalUpdates: false,
  });

  const [security, setSecurity] = useState({
    transactionSigning: true,
  });

  const stellarAddress = "GCF2...7P3Q";

  return (
    <main className="min-h-screen bg-gray-50">
      <SettingsHeader />

      <div className="max-w-3xl mx-auto py-6">
        {/* Account Section */}
        <SettingsSection title="Account">
          <SettingsItem
            icon={<Wallet className="w-5 h-5" />}
            title="Stellar Address"
            description="Connected Wallet"
            type="text"
            value={stellarAddress}
          />
          <SettingsItem
            icon={<CreditCard className="w-5 h-5" />}
            title="Wallet Status"
            description="Connected via Freighter"
            type="navigation"
          />
          <SettingsItem
            icon={<LogOut className="w-5 h-5 text-red-500" />}
            title="Change Wallet"
            onClick={() => console.log("Change wallet")}
          />
        </SettingsSection>

        {/* Notifications Section */}
        <SettingsSection title="Notifications">
          <SettingsItem
            icon={<Bell className="w-5 h-5" />}
            title="Bill Reminders"
            description="Get notified before bills are due"
            type="toggle"
            enabled={notifications.billReminders}
            onToggle={(val) =>
              setNotifications({ ...notifications, billReminders: val })
            }
          />
          <SettingsItem
            icon={<Bell className="w-5 h-5" />}
            title="Payment Confirmations"
            description="Receive receipt after every transfer"
            type="toggle"
            enabled={notifications.paymentConfirmations}
            onToggle={(val) =>
              setNotifications({ ...notifications, paymentConfirmations: val })
            }
          />
          <SettingsItem
            icon={<Bell className="w-5 h-5" />}
            title="Goal Progress Updates"
            description="Weekly summary of your savings goals"
            type="toggle"
            enabled={notifications.goalUpdates}
            onToggle={(val) =>
              setNotifications({ ...notifications, goalUpdates: val })
            }
          />
        </SettingsSection>

        {/* Preferences Section */}
        <SettingsSection title="Preferences">
          <SettingsItem
            icon={<Globe className="w-5 h-5" />}
            title="Currency Display"
            description="Primary currency for dashboard"
            type="text"
            value="USD ($)"
          />
          <SettingsItem
            icon={<MessageSquare className="w-5 h-5" />}
            title="Language"
            description="Default app language"
            type="text"
            value="English"
          />
        </SettingsSection>

        {/* Security Section */}
        <SettingsSection title="Security">
          <SettingsItem
            icon={<Lock className="w-5 h-5" />}
            title="Transaction Signing"
            description="Always ask for signature"
            type="toggle"
            enabled={security.transactionSigning}
            onToggle={(val) =>
              setSecurity({ ...security, transactionSigning: val })
            }
          />
          <SettingsItem
            icon={<Clock className="w-5 h-5" />}
            title="Session Timeout"
            description="Automatically log out after inactivity"
            type="text"
            value="30 minutes"
          />
        </SettingsSection>

        {/* About Section */}
        <SettingsSection title="About">
          <SettingsItem
            icon={<Info className="w-5 h-5" />}
            title="App Version"
            type="text"
            value="v1.0.4-alpha"
          />
          <SettingsItem
            icon={<FileText className="w-5 h-5" />}
            title="Terms of Service"
            type="navigation"
          />
          <SettingsItem
            icon={<ShieldCheck className="w-5 h-5" />}
            title="Privacy Policy"
            type="navigation"
          />
          <SettingsItem
            icon={<MessageSquare className="w-5 h-5" />}
            title="Support"
            type="navigation"
          />
        </SettingsSection>
      </div>
    </main>
  );
}
