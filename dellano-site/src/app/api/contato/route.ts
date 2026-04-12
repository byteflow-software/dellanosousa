import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/schemas/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      const fields: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const key = String(issue.path[0])
        fields[key] = issue.message
      })
      return NextResponse.json({ error: 'Dados inválidos', fields }, { status: 400 })
    }

    const { name, email, phone, state, subject, message } = result.data

    await resend.emails.send({
      from: 'Site Dellano Sousa <noreply@dellanosousa.com.br>',
      to: process.env.CONTACT_EMAIL || 'contato@dellanosousa.com.br',
      replyTo: email,
      subject: `[Contato] ${subject} — ${name}`,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Estado:</strong> ${state}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <hr />
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Falha ao enviar mensagem. Tente novamente ou entre em contato via WhatsApp.' },
      { status: 500 }
    )
  }
}
