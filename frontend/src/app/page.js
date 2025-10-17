'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import useExpense from '@/hooks/expense'
import { CATEGORIES } from '@/lib/data/categories'

export default function HomePage() {
    const {
        expenses,
        isLoading,
        fetchExpenses,
        filterExpenses,
        deleteExpense,
    } = useExpense()

    const [filter, setFilter] = useState('All')
    const router = useRouter()

    useEffect(() => {
        fetchExpenses()
    }, [fetchExpenses])

    useEffect(() => {
        filterExpenses(filter)
    }, [filter, filterExpenses])

    const handleDelete = async id => {
        if (confirm('Are you sure you want to delete this expense?')) {
            const success = await deleteExpense(id)
            if (success) {
                alert('Expense deleted successfully!')
            } else {
                alert('Failed to delete expense. Please try again.')
            }
        }
    }

    const totalAmount = expenses.reduce(
        (sum, expense) => sum + parseFloat(expense.amount),
        0,
    )

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading expenses...</p>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                My Expenses
            </h1>

            <div className="mb-6">
                <label
                    htmlFor="category-filter"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by Category:
                </label>
                <select
                    id="category-filter"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option value="All">All</option>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <div className="my-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Total: ${totalAmount.toFixed(2)}
                </h2>
            </div>

            <ul className="list-none p-0 space-y-4">
                {expenses.length > 0 ? (
                    expenses.map(expense => (
                        <li
                            key={expense.id}
                            className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <strong className="text-lg font-semibold text-gray-900">
                                        {expense.description}
                                    </strong>
                                    <br />
                                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                                        {expense.category}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-bold text-gray-800">
                                        ${parseFloat(expense.amount).toFixed(2)}
                                    </span>
                                    <br />
                                    <small className="text-gray-500 text-sm">
                                        {new Date(
                                            expense.timestamp,
                                        ).toLocaleDateString()}
                                    </small>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() =>
                                        router.push(`/edit/${expense.id}`)
                                    }
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium">
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(expense.id)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm font-medium">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">
                        No expenses found for this category.
                        <Link
                            href="/create"
                            className="text-blue-600 hover:underline ml-1">
                            Add one!
                        </Link>
                    </p>
                )}
            </ul>
        </div>
    )
}
