'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ExpenseForm from '@/components/ExpenseForm'
import axios from '@/lib/axios'

export default function CreateExpensePage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleAddExpense = async data => {
        if (isSubmitting) return
        setIsSubmitting(true)

        try {
            await axios.post('/api/expenses', data)

            alert('Expense added successfully!')
            router.push('/')
        } catch (error) {
            console.error('Failed to add expense:', error)

            if (error.response?.status === 422) {
                const validationErrors = error.response.data.errors
                const errorMessages = Object.values(validationErrors)
                    .flat()
                    .join('\n')
                alert(`Validation failed:\n${errorMessages}`)
            } else {
                alert('An error occurred. Please try again.')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Add New Expense
            </h1>
            <ExpenseForm
                onSubmit={handleAddExpense}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}
