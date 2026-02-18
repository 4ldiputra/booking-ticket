import { useState } from 'react'
import { checkVoucher, generateVoucher } from '../services/voucherApi'
import { validateForm } from '../utils/validators'

export function useVoucherForm() {
  const [form, setForm] = useState({
    crewName: '',
    crewId: '',
    flightNumber: '',
    flightDate: '',
    aircraft: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [apiError, setApiError] = useState(null)

  function toDisplayDate(isoDate) {
    if (!isoDate) return ''
    const [y, m, d] = isoDate.split('-')
    return `${d}-${m}-${y}`
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setResult(null)
    setApiError(null)

    const errs = validateForm(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)

    try {
      const { exists } = await checkVoucher(form.flightNumber, form.flightDate)

      if (exists) {
        setApiError(
          `Vouchers have already been generated for flight ${form.flightNumber} on ${toDisplayDate(form.flightDate)}.`
        )
        setLoading(false)
        return
      }

      const data = await generateVoucher({
        name: form.crewName,
        id: form.crewId,
        flightNumber: form.flightNumber,
        date: form.flightDate,
        aircraft: form.aircraft,
      })

      setResult(data)
    } catch (err) {
      const status = err.response?.status
      const message = err.response?.data?.message

      if (status === 409) {
        setApiError(message || 'Vouchers already exist for this flight and date.')
      } else if (status === 422) {
        setApiError('Validation error: ' + JSON.stringify(err.response?.data?.errors))
      } else {
        setApiError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setForm({
      crewName: '',
      crewId: '',
      flightNumber: '',
      flightDate: '',
      aircraft: '',
    })
    setErrors({})
    setResult(null)
    setApiError(null)
  }

  return {
    form,
    errors,
    loading,
    result,
    apiError,
    handleChange,
    handleSubmit,
    handleReset,
    toDisplayDate,
  }
}