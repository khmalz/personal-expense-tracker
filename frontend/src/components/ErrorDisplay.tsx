export default function ErrorDisplay({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white border border-red-300 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
                Terjadi Kesalahan
            </h2>
            <p className="text-gray-700 text-center">{message}</p>
            <button
                onClick={() => window.location.reload()}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Coba Lagi
            </button>
        </div>
    )
}
