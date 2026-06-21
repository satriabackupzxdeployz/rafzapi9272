import { fail, preflight } from 'lib/response'
import { toolServices } from 'lib/services'

export const runtime = 'nodejs'

export async function GET(request, { params }) {
  const handler = toolServices[params.slug]

  if (!handler) {
    return fail('Endpoint tools tidak ditemukan', 404)
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
