// app/edit/[id]/page.js
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ExpenseForm from '@/components/ExpenseForm'
import axios from '@/lib/axios'

export default function EditExpensePage() {
    const router = useRouter()
    const params = useParams()
    const { id } = params

    const [expenseToEdit, setExpenseToEdit] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (!id) return

        const fetchExpense = async () => {
            try {
                const response = await axios.get(`/api/expenses/${id}`)
                setExpenseToEdit(response.data.data)
            } catch (error) {
                console.error('Failed to fetch expense:', error)
                if (error.response?.status === 404) {
                    alert('Expense not found!')
                    router.push('/')
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchExpense()
    }, [id, router])

    const handleEditExpense = async data => {
        if (isSubmitting) return
        setIsSubmitting(true)

        try {
            await axios.put(`/api/expenses/${id}`, data)

            alert('Expense updated successfully!')
            router.push('/')
        } catch (error) {
            console.error('Failed to update expense:', error)
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

    if (isLoading) {
        return <p className="text-gray-500">Loading...</p>
    }

    if (!expenseToEdit) {
        return <p className="text-red-500">Could not load expense data.</p>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Edit Expense
            </h1>
            <ExpenseForm
                onSubmit={handleEditExpense}
                initialData={expenseToEdit}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}
