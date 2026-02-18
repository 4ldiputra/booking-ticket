import { useVoucherForm } from '../../hooks/useVoucherForm'
import FormField from './FormField'
import FlightResult from './FlightResult'
import ErrorMessage from './ErrorMessage'

const AIRCRAFT_OPTIONS = ['ATR', 'Airbus 320', 'Boeing 737 Max']

export default function VoucherForm() {
  const {
    form,
    errors,
    loading,
    result,
    apiError,
    handleChange,
    handleSubmit,
    handleReset,
    toDisplayDate,
  } = useVoucherForm()

  const inputClass = (name) =>
    `border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
      errors[name] ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'
    }`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-slate-800">Airline Voucher</h1>
          <p className="text-slate-500 text-sm mt-1">Seat Assignment System</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            
            {/* ✅ GANTI SEMUA <Field> JADI <FormField> */}
            <FormField label="Crew Name" name="crewName" required errors={errors}>
              <input
                id="crewName" name="crewName" type="text"
                value={form.crewName} onChange={handleChange}
                placeholder="e.g. Sarah Putri"
                className={inputClass('crewName')}
              />
            </FormField>

            <FormField label="Crew ID" name="crewId" required errors={errors}>
              <input
                id="crewId" name="crewId" type="text"
                value={form.crewId} onChange={handleChange}
                placeholder="e.g. 98123"
                className={inputClass('crewId')}
              />
            </FormField>

            <FormField label="Flight Number" name="flightNumber" required errors={errors}>
              <input
                id="flightNumber" name="flightNumber" type="text"
                value={form.flightNumber} onChange={handleChange}
                placeholder="e.g. GA102"
                className={`${inputClass('flightNumber')} uppercase`}
                onInput={(e) => {
                  e.target.value = e.target.value.toUpperCase()
                  handleChange(e)
                }}
              />
            </FormField>

            <FormField label="Flight Date" name="flightDate" required errors={errors}>
              <input
                id="flightDate" name="flightDate" type="date"
                value={form.flightDate} onChange={handleChange}
                className={inputClass('flightDate')}
              />
              {form.flightDate && (
                <span className="text-xs text-slate-400">
                  Selected: {toDisplayDate(form.flightDate)}
                </span>
              )}
            </FormField>

            <FormField label="Aircraft Type" name="aircraft" required errors={errors}>
              <select
                id="aircraft" name="aircraft"
                value={form.aircraft} onChange={handleChange}
                className={`${inputClass('aircraft')} cursor-pointer`}
              >
                <option value="">-- Select aircraft --</option>
                {AIRCRAFT_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </FormField>

            {apiError && <ErrorMessage message={apiError} />}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed
                         text-white font-bold py-3 rounded-xl transition shadow-md hover:shadow-lg mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Generating...
                </span>
              ) : 'Generate Vouchers'}
            </button>
          </form>
        </div>

        {/* Result */}
        {result && (
          <FlightResult 
            result={result} 
            toDisplayDate={toDisplayDate} 
            onReset={handleReset} 
          />
        )}
      </div>
    </div>
  )
}