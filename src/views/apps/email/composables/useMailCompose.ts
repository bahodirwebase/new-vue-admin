import { reactive, computed } from 'vue'
import type { ComposeState, ComposeMode, Email } from '../types'

function freshState(): ComposeState {
  return {
    to: '', cc: '', bcc: '', subject: '', body: '',
    priority: 'normal', showCc: false, showBcc: false,
  }
}

export function useMailCompose() {
  const state   = reactive<ComposeState>(freshState())
  const sending = reactive({ value: false })

  const isValid = computed(() =>
    state.to.trim() !== '' && state.subject.trim() !== '' && state.body.trim() !== ''
  )

  function prefillReply(email: Email, mode: ComposeMode) {
    reset()
    if (mode === 'reply') {
      state.to      = `${email.from.name} <${email.from.email}>`
      state.subject = email.subject.startsWith('Re:') ? email.subject : `Re: ${email.subject}`
      state.body    = `\n\n--- Original Message ---\nFrom: ${email.from.name}\nDate: ${email.timestamp.toLocaleString()}\n\n${email.body}`
    } else if (mode === 'reply-all') {
      const others  = email.to.filter(r => r.email !== 'me@example.com')
      state.to      = `${email.from.name} <${email.from.email}>`
      state.cc      = others.map(r => `${r.name} <${r.email}>`).join(', ')
      state.showCc  = state.cc !== ''
      state.subject = email.subject.startsWith('Re:') ? email.subject : `Re: ${email.subject}`
      state.body    = `\n\n--- Original Message ---\nFrom: ${email.from.name}\nDate: ${email.timestamp.toLocaleString()}\n\n${email.body}`
    } else if (mode === 'forward') {
      state.subject = email.subject.startsWith('Fwd:') ? email.subject : `Fwd: ${email.subject}`
      state.body    = `\n\n--- Forwarded Message ---\nFrom: ${email.from.name} <${email.from.email}>\nDate: ${email.timestamp.toLocaleString()}\nSubject: ${email.subject}\n\n${email.body}`
    }
  }

  function reset() {
    Object.assign(state, freshState())
  }

  async function send(onSuccess: () => void) {
    if (!isValid.value) return
    sending.value = true
    await new Promise(r => setTimeout(r, 900))
    sending.value = false
    reset()
    onSuccess()
  }

  return { state, sending, isValid, prefillReply, reset, send }
}
