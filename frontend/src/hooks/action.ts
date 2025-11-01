'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateExpenseCache() {
    try {
        revalidateTag('expenses', { expire: 60 * 60 })
        return { success: true }
    } catch (error) {
        console.error('Failed to revalidate cache:', error)
        return { success: false, error: 'Failed to revalidate cache' }
    }
}
