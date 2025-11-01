'use client'

import ExpenseForm from '@/components/ExpenseForm'
import { revalidateExpenseCache } from '@/hooks/action'
import axios from '@/lib/axios'
import type { Expense, ExpenseFormData, ValidationResponseData } from '@/types'
import type { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditExpensePage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    useEffect(() => {
        if (!id) return

        const fetchExpense = async () => {
            try {
                const response = await axios.get<{ data: Expense }>(
                    `/api/expenses/${id}`,
                )

                setExpenseToEdit(response.data.data)
            } catch (err) {
                const error = err as AxiosError
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

    const handleEditExpense = async (data: ExpenseFormData) => {
        if (isSubmitting) return
        setIsSubmitting(true)

        try {
            await axios.put(`/api/expenses/${id}`, data)

            await revalidateExpenseCache()

            alert('Expense updated successfully!')
            router.push('/')
        } catch (err) {
            const error = err as AxiosError<ValidationResponseData>
            console.error('Failed to update expense:', error)
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
