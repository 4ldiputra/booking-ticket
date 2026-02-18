import SeatCard from '../SeatCard'

export default function FlightResult({ result, toDisplayDate, onReset }) {
  return (
    <div className="mt-6 bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <h2 className="text-lg font-bold text-slate-800">Vouchers Generated!</h2>
      </div>

      <p className="text-sm text-slate-500 mb-4">
        Flight <strong>{result.data?.flight_number}</strong> · {toDisplayDate(result.data?.flight_date)} · {result.data?.aircraft_type}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {result.seats.map((seat, i) => (
          <SeatCard key={seat} seat={seat} index={i} />
        ))}
      </div>

      <button
        onClick={onReset}
        className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700
                   font-semibold py-2.5 rounded-xl text-sm transition"
      >
        Generate Another Flight
      </button>
    </div>
  )
}