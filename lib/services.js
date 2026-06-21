import { createHash, randomUUID } from 'crypto'
import { ok } from 'lib/response'
import { allApis } from 'lib/catalog'

const browserUa =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

const cobaltApi = process.env.COBALT_API || 'https://co.wuk.sh/api/json'
const catboxApi = 'https://catbox.moe/user/api.php'

function getParam(request, key, fallback = '') {
  return new URL(request.url).searchParams.get(key) || fallback
}

function needParam(request, key) {
  const value = getParam(request, key).trim()
  if (!value) {
    throw new Error(`Parameter ${key} wajib diisi`)
  }
  return value
}

function parseYouTubeId(input) {
  if (!input) return null
  const raw = input.trim()
  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw
  try {
    const url = new URL(raw)
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null
    }
    const v = url.searchParams.get('v')
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v
    const parts = url.pathname.split('/').filter(Boolean)
    const shortsIndex = parts.indexOf('shorts')
    if (shortsIndex !== -1 && parts[shortsIndex + 1]) {
      const id = parts[shortsIndex + 1]
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null
    }
    const embedIndex = parts.indexOf('embed')
    if (embedIndex !== -1 && parts[embedIndex + 1]) {
      const id = parts[embedIndex + 1]
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null
    }
    return null
  } catch {
    return null
  }
}

function metaValue(html, key) {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${key}["'][^>]+content=["']([^"']+)["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${key}["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+name=["']${key}["'][^>]+content=["']([^"']+)["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${key}["'][^>]*>`, 'i')
  ]
  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match?.[1]) return match[1]
  }
  return null
}

function titleValue(html) {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  return match?.[1]?.trim() || null
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': browserUa,
      'accept-language': 'en-US,en;q=0.9'
    },
    cache: 'no-store',
    redirect: 'follow'
  })
  if (!response.ok) {
    throw new Error('Gagal mengambil halaman target')
  }
  return await response.text()
}

async function extractOpenGraph(url) {
  const html = await fetchHtml(url)
  return {
    title: metaValue(html, 'og:title') || titleValue(html),
    description: metaValue(html, 'og:description') || metaValue(html, 'description'),
    image: metaValue(html, 'og:image')
  }
}

async function safeOpenGraph(url) {
  try {
    return await extractOpenGraph(url)
  } catch {
    return {
      title: null,
      description: null,
      image: null
    }
  }
}

async function cobaltDownload(url, isAudioOnly = false) {
  const response = await fetch(cobaltApi, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json'
    },
    body: JSON.stringify({
      url,
      filenamePattern: 'basic',
      disableMetadata: true,
      isAudioOnly,
      aFormat: 'mp3',
      vCodec: 'h264'
    }),
    cache: 'no-store'
  })

  const text = await response.text()
  let data = null

  try {
    data = JSON.parse(text)
  } catch {
    throw new Error(text || 'Provider downloader tidak valid')
  }

  if (!response.ok) {
    throw new Error(data?.text || data?.message || 'Provider downloader gagal')
  }

  if ((data.status === 'stream' || data.status === 'redirect') && data.url) {
    return {
      provider: 'cobalt',
      status: data.status,
      download: data.url,
      filename: data.filename || null
    }
  }

  if (data.status === 'picker' && Array.isArray(data.picker) && data.picker.length) {
    return {
      provider: 'cobalt',
      status: data.status,
      download: data.picker[0].url,
      filename: data.filename || null,
      picker: data.picker
    }
  }

  throw new Error(data?.text || 'File tidak ditemukan dari provider')
}

async function tikwmData(url) {
  const body = new URLSearchParams()
  body.set('url', url)
  body.set('hd', '1')

  const response = await fetch('https://www.tikwm.com/api/', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body,
    cache: 'no-store'
  })

  const data = await response.json()

  if (!response.ok || !data?.data) {
    throw new Error(data?.msg || 'Gagal mengambil data TikTok')
  }

  return data.data
}

async function searchYouTubeUrl(query) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
  const html = await fetchHtml(url)
  const match =
    html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/) ||
    html.match(/watch\?v=([a-zA-Z0-9_-]{11})/)

  if (!match?.[1]) {
    throw new Error('Hasil YouTube tidak ditemukan')
  }

  return `https://www.youtube.com/watch?v=${match[1]}`
}

async function spotifyMeta(url) {
  const response = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`, {
    headers: {
      'user-agent': browserUa
    },
    cache: 'no-store'
  })

  if (!response.ok) {
    throw new Error('Track Spotify tidak valid atau tidak bisa dibaca')
  }

  return await response.json()
}

async function spotifyToMp3(url) {
  const meta = await spotifyMeta(url)
  const query = `${meta.title || ''} ${meta.author_name || ''} audio`.trim()
  const youtube = await searchYouTubeUrl(query)
  const data = await cobaltDownload(youtube, true)

  return {
    provider: 'spotify-youtube-audio',
    title: meta.title || null,
    author: meta.author_name || null,
    youtube,
    search: query,
    download: data.download,
    filename: data.filename
  }
}

async function uploadToCatbox(file) {
  const body = new FormData()
  body.append('reqtype', 'fileupload')
  body.append('fileToUpload', file, file.name)

  const response = await fetch(catboxApi, {
    method: 'POST',
    body,
    cache: 'no-store'
  })

  const text = (await response.text()).trim()

  if (!response.ok || !text.startsWith('http')) {
    throw new Error(text || 'Upload gagal')
  }

  return text
}

async function needFile(request) {
  const form = await request.formData()
  const file = form.get('file')

  if (!file || typeof file.name !== 'string') {
    throw new Error('Field file wajib diisi')
  }

  if (file.size > 50 * 1024 * 1024) {
    throw new Error('Ukuran file maksimal 50MB')
  }

  return file
}

export const downloaderServices = {
  async ttmp4(request) {
    const url = needParam(request, 'url')
    const data = await tikwmData(url)
    return ok({
      source: url,
      type: 'mp4',
      title: data.title || null,
      author: data.author?.nickname || data.author?.unique_id || null,
      thumbnail: data.cover || data.origin_cover || null,
      download: data.play || data.hdplay || data.wmplay || null
    })
  },

  async ttmp3(request) {
    const url = needParam(request, 'url')
    const data = await tikwmData(url)
    return ok({
      source: url,
      type: 'mp3',
      title: data.title || null,
      author: data.author?.nickname || data.author?.unique_id || null,
      thumbnail: data.cover || data.origin_cover || null,
      download: data.music || null
    })
  },

  async ttthumb(request) {
    const url = needParam(request, 'url')
    const data = await tikwmData(url)
    return ok({
      source: url,
      type: 'jpg',
      title: data.title || null,
      thumbnail: data.cover || data.origin_cover || null
    })
  },

  async igmp4(request) {
    const url = needParam(request, 'url')
    const data = await cobaltDownload(url, false)
    const og = await safeOpenGraph(url)
    return ok({
      source: url,
      type: 'mp4',
      provider: data.provider,
      thumbnail: og.image,
      title: og.title,
      download: data.download
    })
  },

  async igmp3(request) {
    const url = needParam(request, 'url')
    const data = await cobaltDownload(url, true)
    const og = await safeOpenGraph(url)
    return ok({
      source: url,
      type: 'mp3',
      provider: data.provider,
      thumbnail: og.image,
      title: og.title,
      download: data.download
    })
  },

  async igthumb(request) {
    const url = needParam(request, 'url')
    const og = await extractOpenGraph(url)
    if (!og.image) throw new Error('Thumbnail Instagram tidak ditemukan')
    return ok({
      source: url,
      type: 'jpg',
      title: og.title,
      description: og.description,
      thumbnail: og.image
    })
  },

  async fbmp4(request) {
    const url = needParam(request, 'url')
    const data = await cobaltDownload(url, false)
    const og = await safeOpenGraph(url)
    return ok({
      source: url,
      type: 'mp4',
      provider: data.provider,
      thumbnail: og.image,
      title: og.title,
      download: data.download
    })
  },

  async fbmp3(request) {
    const url = needParam(request, 'url')
    const data = await cobaltDownload(url, true)
    const og = await safeOpenGraph(url)
    return ok({
      source: url,
      type: 'mp3',
      provider: data.provider,
      thumbnail: og.image,
      title: og.title,
      download: data.download
    })
  },

  async fbthumb(request) {
    const url = needParam(request, 'url')
    const og = await extractOpenGraph(url)
    if (!og.image) throw new Error('Thumbnail Facebook tidak ditemukan')
    return ok({
      source: url,
      type: 'jpg',
      title: og.title,
      description: og.description,
      thumbnail: og.image
    })
  },

  async ytmp4(request) {
    const url = needParam(request, 'url')
    const data = await cobaltDownload(url, false)
    const id = parseYouTubeId(url)
    return ok({
      source: url,
      type: 'mp4',
      provider: data.provider,
      thumbnail: id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : null,
      download: data.download
    })
  },

  async ytmp3(request) {
    const url = needParam(request, 'url')
    const data = await cobaltDownload(url, true)
    const id = parseYouTubeId(url)
    return ok({
      source: url,
      type: 'mp3',
      provider: data.provider,
      thumbnail: id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : null,
      download: data.download
    })
  },

  async ytthumb(request) {
    const url = needParam(request, 'url')
    const id = parseYouTubeId(url)

    if (!id) {
      throw new Error('URL YouTube tidak valid')
    }

    return ok({
      source: url,
      type: 'jpg',
      videoId: id,
      thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
    })
  },

  async spotifymp3(request) {
    const url = needParam(request, 'url')
    const data = await spotifyToMp3(url)
    return ok({
      source: url,
      type: 'mp3',
      ...data
    })
  }
}

export const uploaderServices = {
  async img2url(request) {
    const file = await needFile(request)
    if (!file.type.startsWith('image/')) {
      throw new Error('File harus berupa gambar')
    }
    const url = await uploadToCatbox(file)
    return ok({
      filename: file.name,
      mimetype: file.type,
      size: file.size,
      url
    })
  },

  async vid2url(request) {
    const file = await needFile(request)
    if (!file.type.startsWith('video/')) {
      throw new Error('File harus berupa video')
    }
    const url = await uploadToCatbox(file)
    return ok({
      filename: file.name,
      mimetype: file.type,
      size: file.size,
      url
    })
  },

  async file2url(request) {
    const file = await needFile(request)
    const url = await uploadToCatbox(file)
    return ok({
      filename: file.name,
      mimetype: file.type || 'application/octet-stream',
      size: file.size,
      url
    })
  }
}

export const toolServices = {
  async base64(request) {
    const text = needParam(request, 'text')
    const mode = getParam(request, 'mode', 'encode').toLowerCase()
    if (!['encode', 'decode'].includes(mode)) {
      throw new Error('Mode harus encode atau decode')
    }

    const output =
      mode === 'decode'
        ? Buffer.from(text, 'base64').toString('utf8')
        : Buffer.from(text, 'utf8').toString('base64')

    return ok({
      mode,
      input: text,
      output
    })
  },

  async hash(request) {
    const text = needParam(request, 'text')
    const algo = getParam(request, 'algo', 'sha256').toLowerCase()
    const allowed = ['md5', 'sha1', 'sha256', 'sha512']

    if (!allowed.includes(algo)) {
      throw new Error('Algo harus md5, sha1, sha256, atau sha512')
    }

    const output = createHash(algo).update(text).digest('hex')

    return ok({
      algo,
      input: text,
      output
    })
  },

  async uuid() {
    return ok({
      uuid: randomUUID()
    })
  }
}

export const searchServices = {
  async npm(request) {
    const q = needParam(request, 'q')
    const response = await fetch(`https://registry.npmjs.org/-/v1/search?size=10&text=${encodeURIComponent(q)}`, {
      cache: 'no-store'
    })
    const data = await response.json()

    return ok({
      query: q,
      total: data.total || 0,
      items: (data.objects || []).map(item => ({
        name: item.package.name,
        version: item.package.version,
        description: item.package.description,
        link: item.package.links?.npm
      }))
    })
  },

  async ghuser(request) {
    const username = needParam(request, 'u')
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers: {
        'user-agent': 'rafz-api'
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('User GitHub tidak ditemukan')
    }

    const data = await response.json()

    return ok({
      username: data.login,
      id: data.id,
      name: data.name,
      bio: data.bio,
      avatar: data.avatar_url,
      profile: data.html_url,
      followers: data.followers,
      following: data.following,
      publicRepos: data.public_repos
    })
  },

  async wiki(request) {
    const q = needParam(request, 'q')
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&utf8=1&origin=*&srlimit=10&srsearch=${encodeURIComponent(q)}`,
      {
        cache: 'no-store'
      }
    )

    const data = await response.json()

    return ok({
      query: q,
      total: data?.query?.searchinfo?.totalhits || 0,
      items: (data?.query?.search || []).map(item => ({
        title: item.title,
        snippet: item.snippet.replace(/<[^>]+>/g, ''),
        pageId: item.pageid,
        timestamp: item.timestamp,
        url: `https://en.wikipedia.org/?curid=${item.pageid}`
      }))
    })
  }
}

export const infoServices = {
  async health() {
    return ok({
      service: 'RAFZ API',
      uptime: process.uptime(),
      time: new Date().toISOString(),
      folders: 5,
      endpoints: allApis.length,
      runtime: 'nodejs'
    })
  },

  async ip(request) {
    const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    const target = getParam(request, 'ip', forwarded || '')
    const url = target ? `https://ipapi.co/${target}/json/` : 'https://ipapi.co/json/'
    const response = await fetch(url, {
      cache: 'no-store'
    })
    const data = await response.json()

    return ok({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      countryCode: data.country_code,
      postal: data.postal,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      org: data.org
    })
  },

  async og(request) {
    const url = needParam(request, 'url')
    const data = await extractOpenGraph(url)

    return ok({
      source: url,
      title: data.title,
      description: data.description,
      image: data.image
    })
  }
}
