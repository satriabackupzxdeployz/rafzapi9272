const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://api.rafztzy.eu.cc'

export const site = {
  name: 'RAFZ API',
  baseUrl,
  contact: {
    whatsapp: '6282262921585',
    telegram: 'rafztzy_real',
    email: 'support@rafztzy.eu.cc'
  }
}

export const folders = [
  {
    key: 'd',
    title: 'Downloader',
    description: 'Download video, audio, dan thumbnail dari platform populer.'
  },
  {
    key: 'u',
    title: 'Uploader',
    description: 'Upload file lalu dapatkan direct URL gratis.'
  },
  {
    key: 't',
    title: 'Tools',
    description: 'Utility ringan untuk encode, hash, dan UUID.'
  },
  {
    key: 's',
    title: 'Search',
    description: 'Pencarian data publik gratis tanpa login.'
  },
  {
    key: 'i',
    title: 'Info',
    description: 'Info service, OG metadata, dan IP lookup.'
  }
]

export const apiCatalog = {
  d: [
    {
      slug: 'ttmp4',
      title: 'TikTok Downloader MP4',
      method: 'GET',
      path: '/d/ttmp4',
      params: ['url'],
      description: 'Download video TikTok ke MP4.',
      sample: `${baseUrl}/d/ttmp4?url=https://www.tiktok.com/@scout2015/video/6718335390845095173`
    },
    {
      slug: 'ttmp3',
      title: 'TikTok Downloader MP3',
      method: 'GET',
      path: '/d/ttmp3',
      params: ['url'],
      description: 'Ambil audio TikTok ke MP3.',
      sample: `${baseUrl}/d/ttmp3?url=https://www.tiktok.com/@scout2015/video/6718335390845095173`
    },
    {
      slug: 'ttthumb',
      title: 'TikTok Thumbnail',
      method: 'GET',
      path: '/d/ttthumb',
      params: ['url'],
      description: 'Ambil thumbnail TikTok.',
      sample: `${baseUrl}/d/ttthumb?url=https://www.tiktok.com/@scout2015/video/6718335390845095173`
    },
    {
      slug: 'igmp4',
      title: 'Instagram Downloader MP4',
      method: 'GET',
      path: '/d/igmp4',
      params: ['url'],
      description: 'Download video Instagram ke MP4.',
      sample: `${baseUrl}/d/igmp4?url=https://www.instagram.com/reel/xxxxxxxxxxx/`
    },
    {
      slug: 'igmp3',
      title: 'Instagram Downloader MP3',
      method: 'GET',
      path: '/d/igmp3',
      params: ['url'],
      description: 'Ambil audio dari video Instagram.',
      sample: `${baseUrl}/d/igmp3?url=https://www.instagram.com/reel/xxxxxxxxxxx/`
    },
    {
      slug: 'igthumb',
      title: 'Instagram Thumbnail',
      method: 'GET',
      path: '/d/igthumb',
      params: ['url'],
      description: 'Ambil thumbnail Instagram dari metadata halaman publik.',
      sample: `${baseUrl}/d/igthumb?url=https://www.instagram.com/reel/xxxxxxxxxxx/`
    },
    {
      slug: 'fbmp4',
      title: 'Facebook Downloader MP4',
      method: 'GET',
      path: '/d/fbmp4',
      params: ['url'],
      description: 'Download video Facebook ke MP4.',
      sample: `${baseUrl}/d/fbmp4?url=https://www.facebook.com/share/v/xxxxxxxxxx/`
    },
    {
      slug: 'fbmp3',
      title: 'Facebook Downloader MP3',
      method: 'GET',
      path: '/d/fbmp3',
      params: ['url'],
      description: 'Ambil audio dari video Facebook.',
      sample: `${baseUrl}/d/fbmp3?url=https://www.facebook.com/share/v/xxxxxxxxxx/`
    },
    {
      slug: 'fbthumb',
      title: 'Facebook Thumbnail',
      method: 'GET',
      path: '/d/fbthumb',
      params: ['url'],
      description: 'Ambil thumbnail Facebook dari metadata halaman publik.',
      sample: `${baseUrl}/d/fbthumb?url=https://www.facebook.com/share/v/xxxxxxxxxx/`
    },
    {
      slug: 'ytmp4',
      title: 'YouTube Downloader MP4',
      method: 'GET',
      path: '/d/ytmp4',
      params: ['url'],
      description: 'Download video YouTube ke MP4.',
      sample: `${baseUrl}/d/ytmp4?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ`
    },
    {
      slug: 'ytmp3',
      title: 'YouTube Downloader MP3',
      method: 'GET',
      path: '/d/ytmp3',
      params: ['url'],
      description: 'Download audio YouTube ke MP3.',
      sample: `${baseUrl}/d/ytmp3?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ`
    },
    {
      slug: 'ytthumb',
      title: 'YouTube Thumbnail',
      method: 'GET',
      path: '/d/ytthumb',
      params: ['url'],
      description: 'Ambil thumbnail YouTube dari video id.',
      sample: `${baseUrl}/d/ytthumb?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ`
    },
    {
      slug: 'spotifymp3',
      title: 'Spotify Downloader MP3',
      method: 'GET',
      path: '/d/spotifymp3',
      params: ['url'],
      description: 'Cari track Spotify ke YouTube lalu ambil audio-only.',
      sample: `${baseUrl}/d/spotifymp3?url=https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT`
    }
  ],
  u: [
    {
      slug: 'img2url',
      title: 'Img2Url',
      method: 'POST',
      path: '/u/img2url',
      params: ['file'],
      description: 'Upload gambar dan dapatkan direct URL.',
      sample: `curl -X POST "${baseUrl}/u/img2url" -F "file=@image.png"`
    },
    {
      slug: 'vid2url',
      title: 'Vid2Url',
      method: 'POST',
      path: '/u/vid2url',
      params: ['file'],
      description: 'Upload video dan dapatkan direct URL.',
      sample: `curl -X POST "${baseUrl}/u/vid2url" -F "file=@video.mp4"`
    },
    {
      slug: 'file2url',
      title: 'File2Url',
      method: 'POST',
      path: '/u/file2url',
      params: ['file'],
      description: 'Upload file umum dan dapatkan direct URL.',
      sample: `curl -X POST "${baseUrl}/u/file2url" -F "file=@archive.zip"`
    }
  ],
  t: [
    {
      slug: 'base64',
      title: 'Base64 Encode Decode',
      method: 'GET',
      path: '/t/base64',
      params: ['text', 'mode'],
      description: 'Encode atau decode Base64.',
      sample: `${baseUrl}/t/base64?mode=encode&text=rafzapi`
    },
    {
      slug: 'hash',
      title: 'Hash Generator',
      method: 'GET',
      path: '/t/hash',
      params: ['text', 'algo'],
      description: 'Hash text dengan md5, sha1, sha256, sha512.',
      sample: `${baseUrl}/t/hash?algo=sha256&text=rafzapi`
    },
    {
      slug: 'uuid',
      title: 'UUID Generator',
      method: 'GET',
      path: '/t/uuid',
      params: [],
      description: 'Generate UUID v4.',
      sample: `${baseUrl}/t/uuid`
    }
  ],
  s: [
    {
      slug: 'npm',
      title: 'NPM Search',
      method: 'GET',
      path: '/s/npm',
      params: ['q'],
      description: 'Cari package NPM secara publik.',
      sample: `${baseUrl}/s/npm?q=nextjs`
    },
    {
      slug: 'ghuser',
      title: 'GitHub User Lookup',
      method: 'GET',
      path: '/s/ghuser',
      params: ['u'],
      description: 'Ambil profile GitHub user.',
      sample: `${baseUrl}/s/ghuser?u=vercel`
    },
    {
      slug: 'wiki',
      title: 'Wikipedia Search',
      method: 'GET',
      path: '/s/wiki',
      params: ['q'],
      description: 'Cari artikel Wikipedia.',
      sample: `${baseUrl}/s/wiki?q=indonesia`
    }
  ],
  i: [
    {
      slug: 'health',
      title: 'Health Check',
      method: 'GET',
      path: '/i/health',
      params: [],
      description: 'Cek status service RAFZ API.',
      sample: `${baseUrl}/i/health`
    },
    {
      slug: 'ip',
      title: 'IP Lookup',
      method: 'GET',
      path: '/i/ip',
      params: ['ip'],
      description: 'Ambil info IP address.',
      sample: `${baseUrl}/i/ip?ip=8.8.8.8`
    },
    {
      slug: 'og',
      title: 'Open Graph Inspector',
      method: 'GET',
      path: '/i/og',
      params: ['url'],
      description: 'Ambil title, description, image dari metadata halaman.',
      sample: `${baseUrl}/i/og?url=https://vercel.com`
    }
  ]
}

export const allApis = folders.flatMap(folder =>
  apiCatalog[folder.key].map(item => ({
    ...item,
    folder: folder.key,
    group: folder.title
  }))
)
