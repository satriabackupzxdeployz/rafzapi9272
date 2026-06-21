import { fail, preflight } from 'lib/response'
import { searchServices } from 'lib/services'

export const runtime = 'nodejs'

export async function GET(request, { params }) {
  const handler = searchServices[params.slug]

  if (!handler) {
    return fail('Endpoint search tidak ditemukan', 404)
  }

  try {
    return await handler(request)
  } catch (error) {
    return fail(error.message || 'Terjadi kesalahan', 500)
  }
}

export async function OPTIONS() {
  return preflight()
}
