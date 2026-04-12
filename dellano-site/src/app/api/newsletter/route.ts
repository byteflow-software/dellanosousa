import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { newsletterSchema } from '@/lib/schemas/newsletter'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = newsletterSchema.safeParse(body)

    if (!result.success) {
      const fields: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const key = String(issue.path[0])
        fields[key] = issue.message
      })
      return NextResponse.json({ error: 'Dados inválidos', fields }, { status: 400 })
    }

    const { name, email } = result.data

    await resend.emails.send({
      from: 'Site Dellano Sousa <noreply@dellanosousa.com.br>',
      to: process.env.CONTACT_EMAIL || 'contato@dellanosousa.com.br',
      subject: `[Newsletter] Nova inscrição — ${name}`,
      html: `
        <h2>Nova inscrição na newsletter</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Falha ao cadastrar. Tente novamente em alguns minutos.' },
      { status: 500 }
    )
  }
}
