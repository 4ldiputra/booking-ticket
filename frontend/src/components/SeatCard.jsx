/**
 * Displays a single seat badge in the voucher result.
 */
export default function SeatCard({ seat, index }) {
  const colors = [
    'from-blue-500 to-blue-700',
    'from-indigo-500 to-indigo-700',
    'from-violet-500 to-violet-700',
  ]

  return (
    <div className={`bg-gradient-to-br ${colors[index]} text-white rounded-2xl p-6 flex flex-col items-center shadow-lg`}>
      <span className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1">
        Seat {index + 1}
      </span>
      <span className="text-4xl font-black">{seat}</span>
    </div>
  )
}