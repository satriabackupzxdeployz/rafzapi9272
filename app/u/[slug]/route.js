import { fail, preflight } from 'lib/response'
import { uploaderServices } from 'lib/services'

export const runtime = 'nodejs'

export async function POST(request, { params }) {
  const handler = uploaderServices[params.slug]

  if (!handler) {
    return fail('Endpoint uploader tidak ditemukan', 404)
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
