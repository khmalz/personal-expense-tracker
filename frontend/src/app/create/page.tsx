'use client'

import ExpenseForm from '@/components/ExpenseForm'
import { revalidateExpenseCache } from '@/hooks/action'
import axios from '@/lib/axios'
import type { ExpenseFormData, ValidationResponseData } from '@/types'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateExpensePage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const handleAddExpense = async (data: ExpenseFormData) => {
        if (isSubmitting) return
        setIsSubmitting(true)

        try {
            await axios.post('/api/expenses', data)

            await revalidateExpenseCache()

            alert('Expense added successfully!')
            router.push('/')
        } catch (err) {
            const error = err as AxiosError<ValidationResponseData>
            console.error('Failed to add expense:', error)

            if (error.response?.status === 422 && error.response.data.errors) {
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
