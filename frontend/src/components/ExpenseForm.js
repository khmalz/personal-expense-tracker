'use client'

import { useState, useEffect } from 'react'

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Other']

export default function ExpenseForm({
    onSubmit,
    initialData = {},
    isSubmitting = false,
}) {
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState(CATEGORIES[0])

    useEffect(() => {
        if (initialData.description) {
            setDescription(initialData.description)
            setAmount(initialData.amount.toString())
            setCategory(initialData.category)
        }
    }, [initialData])

    const handleSubmit = e => {
        e.preventDefault()
        if (!description || !amount || parseFloat(amount) <= 0) {
            alert('Please fill in all fields with valid values.')
            return
        }
        onSubmit({
            description,
            amount: parseFloat(amount),
            category,
        })
    }

    const inputClass =
        'w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
    const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col max-w-full gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div>
                <label htmlFor="description" className={labelClass}>
                    Description:
                </label>
                <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    className={inputClass}
                />
            </div>

            <div>
                <label htmlFor="amount" className={labelClass}>
                    Amount ($):
                </label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    min="0.01"
                    step="0.01"
                    required
                    className={inputClass}
                />
            </div>

            <div>
                <label htmlFor="category" className={labelClass}>
                    Category:
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    required
                    className={inputClass}>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400">
                {isSubmitting
                    ? 'Submitting...'
                    : initialData.id
                      ? 'Update Expense'
                      : 'Add Expense'}
            </button>
        </form>
    )
}
