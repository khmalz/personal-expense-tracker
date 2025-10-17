import Link from 'next/link'
import './global.css'

export const metadata = {
    title: 'Expense Tracker',
    description: 'A simple personal expense tracker',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-50 min-h-screen">
                <nav className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-gray-800 font-semibold hover:text-blue-600">
                            Home
                        </Link>
                        <Link
                            href="/create"
                            className="text-gray-800 font-semibold hover:text-blue-600">
                            Add Expense
                        </Link>
                    </div>
                </nav>
                <main className="max-w-4xl mx-auto p-4 mt-6">{children}</main>
            </body>
        </html>
    )
}
