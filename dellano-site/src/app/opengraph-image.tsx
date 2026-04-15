import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Dellano Sousa Advocacia — Defesa Criminal e Provas Digitais'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0f1f2e 0%, #1a3550 60%, #0f1f2e 100%)',
          padding: 80,
          color: '#ffffff',
          fontFamily: 'serif',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={220} height={220} style={{ marginBottom: 40 }} />
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Dellano Sousa Advocacia
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#c9a96e',
            marginTop: 24,
            fontFamily: 'sans-serif',
            fontWeight: 500,
          }}
        >
          Defesa Criminal · Provas Digitais
        </div>
      </div>
    ),
    { ...size },
  )
}
