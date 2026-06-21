const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://api.rafztzy.eu.cc'

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

export function ok(result, extra = {}, status = 200) {
  return Response.json(
    {
      status: true,
      name: 'RAFZ API',
      baseUrl,
      ...extra,
      result
    },
    {
      status,
      headers: corsHeaders
    }
  )
}

export function fail(message, status = 400, extra = {}) {
  return Response.json(
    {
      status: false,
      name: 'RAFZ API',
      baseUrl,
      message,
      ...extra
    },
    {
      status,
      headers: corsHeaders
    }
  )
}

export function preflight() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  })
}
