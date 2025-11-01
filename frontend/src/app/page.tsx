import ExpensePage from '@/components/pages/ExpensePage'
import axios from '@/lib/axios'
import AxiosInstance from 'axios'
import type { Expense } from '@/types'
import { cacheLife, cacheTag } from 'next/cache'
import { use } from 'react'

type ApiResponse = {
    data: Expense[]
}

const ERROR_MESSAGES: { [key: number]: string } = {
    404: 'Data tidak ditemukan (Error 404).',
    500: 'Terjadi masalah di server (Error 500). Coba lagi nanti.',
}

async function getCacheExpenses() {
    'use cache'
    cacheTag('expenses')
    cacheLife({
        stale: 60 * 3, // (3 minutes)
        revalidate: 60, // (1 minute)
        expire: 60 * 60, // (1 hours)
    })

    try {
        const { data } = await axios.get<ApiResponse>('/api/expenses')
        return data.data
    } catch (err) {
        let errorMessage = 'Gagal memuat data dari server.'

        if (AxiosInstance.isAxiosError(err)) {
            if (err.response) {
                const statusCode = err.response.status
                errorMessage =
                    ERROR_MESSAGES[statusCode] ||
                    `Terjadi error: ${statusCode}.`

                console.error(
                    `[SERVER FETCH ERROR] Status ${statusCode}:`,
                    err.response.data,
                )
            } else if (err.request) {
                errorMessage =
                    'Tidak dapat terhubung ke server. Pastikan API berjalan.'
                console.error(
                    '[SERVER FETCH ERROR] Connection Error:',
                    err.message,
                )
            } else {
                errorMessage = `Error: ${err.message}`
                console.error(
                    '[SERVER FETCH ERROR] Axios Setup Error:',
                    err.message,
                )
            }
        } else if (err instanceof Error) {
            errorMessage = err.message
            console.error('[SERVER FETCH ERROR] Non-Axios Error:', err)
        }

        return { error: errorMessage }
    }
}

export default function HomePage() {
    const expenses = use(getCacheExpenses())

    return (
        <div>
            <ExpensePage expensesProps={expenses} />
        </div>
    )
}
