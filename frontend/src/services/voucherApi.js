import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

export async function checkVoucher(flightNumber, date) {
  const { data } = await api.post('/check', { flightNumber, date })
  return data
}

export async function generateVoucher(payload) {
  const { data } = await api.post('/generate', payload)
  return data
}