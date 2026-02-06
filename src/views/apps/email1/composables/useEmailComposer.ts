// composables/useEmailComposer.ts
import { ref, computed } from 'vue';
import type { EmailComposerState, Contact, Attachment } from '../types';
import { SAVE_DRAFT_DEBOUNCE_DELAY } from '../constants';

export function useEmailComposer() {
  const composerState = ref<EmailComposerState>({
    to: [],
    cc: [],
    bcc: [],
    subject: '',
    body: '',
    attachments: [],
    isSending: false,
  });

  const isDraft = computed(() => {
    return (
      composerState.value.subject.trim() === '' &&
      composerState.value.body.trim() === '' &&
      composerState.value.to.length === 0
    );
  });

  const isValid = computed(() => {
    return (
      composerState.value.to.length > 0 &&
      composerState.value.subject.trim() !== '' &&
      composerState.value.body.trim() !== ''
    );
  });

  const addRecipient = (email: Contact, type: 'to' | 'cc' | 'bcc' = 'to') => {
    if (!composerState.value[type].find((c) => c.email === email.email)) {
      composerState.value[type].push(email);
    }
  };

  const removeRecipient = (email: string, type: 'to' | 'cc' | 'bcc') => {
    composerState.value[type] = composerState.value[type].filter(
      (c) => c.email !== email
    );
  };

  const addAttachment = (file: File) => {
    const attachment: Attachment = {
      id: `attach-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    };
    composerState.value.attachments.push(attachment);
  };

  const removeAttachment = (attachmentId: string) => {
    composerState.value.attachments = composerState.value.attachments.filter(
      (a) => a.id !== attachmentId
    );
  };

  const sendEmail = async () => {
    if (!isValid.value) return false;

    composerState.value.isSending = true;
    try {
      // API call simulation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetComposer();
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    } finally {
      composerState.value.isSending = false;
    }
  };

  const saveDraft = async () => {
    if (isDraft.value) return;
    try {
      // API call simulation
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('Draft saved');
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  };

  const resetComposer = () => {
    composerState.value = {
      to: [],
      cc: [],
      bcc: [],
      subject: '',
      body: '',
      attachments: [],
      isSending: false,
    };
  };

  return {
    composerState,
    isDraft,
    isValid,
    addRecipient,
    removeRecipient,
    addAttachment,
    removeAttachment,
    sendEmail,
    saveDraft,
    resetComposer,
  };
}
