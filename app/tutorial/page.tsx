import Link from "next/link";
import { ArrowLeft, BookOpen, Play, CheckCircle } from "lucide-react";

export default function TutorialPage() {
    const tutorials = [
        {
            title: "Getting Started with RemitWise",
            description: "Learn the basics of sending money and managing your account",
            duration: "5 min",
        },
        {
            title: "Setting Up Family Wallets",
            description: "Connect and manage family member wallets for easy transfers",
            duration: "3 min",
        },
        {
            title: "Creating Savings Goals",
            description: "Set up and track your financial goals with RemitWise",
            duration: "4 min",
        },
        {
            title: "Emergency Transfers",
            description: "How to use emergency transfer for urgent situations",
            duration: "2 min",
        },
        {
            title: "Bill Payments",
            description: "Pay bills directly from your RemitWise wallet",
            duration: "3 min",
        },
    ];

    return (
        <div className="min-h-screen bg-[#141414]">
            {/* Header */}
            <header className="bg-(--background) shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/dashboard"
                            className="text-(--foreground) hover:text-(--foreground)"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-2xl font-bold text-(--foreground)">
                            Tutorials
                        </h1>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Learn How to Use RemitWise
                    </h2>
                    <p className="text-gray-400">
                        Watch our step-by-step tutorials to get the most out of RemitWise
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutorials.map((tutorial, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#D72323] transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-[#1a1a1a] rounded-lg group-hover:bg-[#D72323] transition-colors duration-300">
                                    <Play className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-sm text-gray-400">{tutorial.duration}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                {tutorial.title}
                            </h3>
                            <p className="text-gray-400 text-sm">{tutorial.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] rounded-2xl p-8 border border-[#2a2a2a]">
                    <div className="flex items-start gap-6">
                        <div className="p-4 bg-[#D72323] rounded-full">
                            <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-2">
                                Need More Help?
                            </h3>
                            <p className="text-gray-400 mb-4">
                                Visit our help center for detailed guides, FAQs, and support
                                resources.
                            </p>
                            <Link
                                href="/dashboard"
                                className="inline-block px-6 py-3 bg-[#D72323] hover:bg-[#B91C1C] text-white font-semibold rounded-lg transition-colors duration-200"
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
