import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getArtigoBySlug } from '@/lib/db'

export const alt = 'Artigo — Dellano Sousa Advocacia'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ slug: string }> }

export default async function Image({ params }: Props) {
  const { slug } = await params
  const article = await getArtigoBySlug(slug)
  const title = article?.title ?? 'Dellano Sousa Advocacia'
  const category = article?.category ?? 'Análises'

  const logo = await readFile(join(process.cwd(), 'public/images/brand/logo-white.png'))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0f1f2e 0%, #1a3550 60%, #0f1f2e 100%)',
          padding: 70,
          color: '#ffffff',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={72} height={72} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em' }}>
              Dellano Sousa Advocacia
            </div>
            <div style={{ fontSize: 18, color: '#c9a96e', fontFamily: 'sans-serif' }}>
              dellanosousa.com.br
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 20,
              color: '#c9a96e',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontFamily: 'sans-serif',
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize: title.length > 80 ? 48 : 60,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              maxWidth: 1060,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
