<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { 
  CodeSlashOutline,
  ListOutline,
  ArrowUndoOutline,
  ArrowRedoOutline
} from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import { FormatBoldOutlined, FormatItalicOutlined, FormatStrikethroughOutlined, FormatUnderlinedOutlined } from '@vicons/material'

const message = useMessage()
const content = ref('')

const editor = useEditor({
  content: `
    <h2>Welcome to Form Editor</h2>
    <p>Start typing your form content here...</p>
    <p>You can add form fields using the buttons above.</p>
  `,
  extensions: [
    StarterKit,
    Underline,
  ],
  onUpdate: ({ editor }) => {
    content.value = editor.getHTML()
  }
})

const clearEditor = () => {
  editor.value?.chain().focus().clearContent().run()
  message.info('Editor cleared')
}

const saveContent = () => {
  if (content.value) {
    localStorage.setItem('formEditorContent', content.value)
    message.success('Content saved successfully!')
  } else {
    message.warning('No content to save')
  }
}

const insertFormField = (type: string) => {
  const fieldTemplates: Record<string, string> = {
    text: '<div class="form-field"><label>Text Input:</label><input type="text" placeholder="Enter text..." /></div>',
    email: '<div class="form-field"><label>Email:</label><input type="email" placeholder="Enter email..." /></div>',
    textarea: '<div class="form-field"><label>Textarea:</label><textarea placeholder="Enter message..." rows="4"></textarea></div>',
    select: '<div class="form-field"><label>Select:</label><select><option>Option 1</option><option>Option 2</option><option>Option 3</option></select></div>',
    checkbox: '<div class="form-field"><label><input type="checkbox" /> Checkbox Option</label></div>',
    radio: '<div class="form-field"><label><input type="radio" name="radio-group" /> Radio Option 1</label><br><label><input type="radio" name="radio-group" /> Radio Option 2</label></div>'
  }

  const fieldHtml = fieldTemplates[type] || ''
  if (fieldHtml && editor.value) {
    editor.value.chain().focus().insertContent(fieldHtml).run()
    message.success(`${type} field inserted`)
  }
}

onMounted(() => {
  const savedContent = localStorage.getItem('formEditorContent')
  if (savedContent && editor.value) {
    editor.value.chain().focus().setContent(savedContent).run()
    content.value = savedContent
  }
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div class="form-editor">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Form Editor</h1>
        <p class="page-subtitle">Advanced rich text editor with formatting tools and content management</p>
      </div>
      
      <n-card title="Editor" >
        <template #header-extra>
          <n-space>
            <n-button @click="clearEditor" type="warning" size="small">
              Clear
            </n-button>
            <n-button @click="saveContent" type="primary" size="small">
              Save
            </n-button>
          </n-space>
        </template>

      <!-- Editor Toolbar -->
      <div class="editor-toolbar">
        <n-space>
          <n-button-group size="small">
            <n-button @click="editor?.chain().focus().toggleBold().run()" :type="editor?.isActive('bold') ? 'primary' : 'default'">
              <n-icon :component="FormatBoldOutlined" />
            </n-button>
            <n-button @click="editor?.chain().focus().toggleItalic().run()" :type="editor?.isActive('italic') ? 'primary' : 'default'">
              <n-icon :component="FormatItalicOutlined" />
            </n-button>
            <n-button @click="editor?.chain().focus().toggleUnderline().run()" :type="editor?.isActive('underline') ? 'primary' : 'default'">
              <n-icon :component="FormatUnderlinedOutlined" />
            </n-button>
            <n-button @click="editor?.chain().focus().toggleStrike().run()" :type="editor?.isActive('strike') ? 'primary' : 'default'">
              <n-icon :component="FormatStrikethroughOutlined" />
            </n-button>
          </n-button-group>

          <n-button-group size="small">
            <n-button @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()" :type="editor?.isActive('heading', { level: 1 }) ? 'primary' : 'default'">
              H1
            </n-button>
            <n-button @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()" :type="editor?.isActive('heading', { level: 2 }) ? 'primary' : 'default'">
              H2
            </n-button>
            <n-button @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()" :type="editor?.isActive('heading', { level: 3 }) ? 'primary' : 'default'">
              H3
            </n-button>
          </n-button-group>

          <n-button-group size="small">
            <n-button @click="editor?.chain().focus().toggleBulletList().run()" :type="editor?.isActive('bulletList') ? 'primary' : 'default'">
              <n-icon :component="ListOutline" />
            </n-button>
            <n-button @click="editor?.chain().focus().toggleOrderedList().run()" :type="editor?.isActive('orderedList') ? 'primary' : 'default'">
              <n-icon :component="ListOutline" />
            </n-button>
          </n-button-group>

          <n-button-group size="small">
            <n-button @click="editor?.chain().focus().toggleCode().run()" :type="editor?.isActive('code') ? 'primary' : 'default'">
              <n-icon :component="CodeSlashOutline" />
            </n-button>
            <n-button @click="editor?.chain().focus().toggleCodeBlock().run()" :type="editor?.isActive('codeBlock') ? 'primary' : 'default'">
              <n-icon :component="CodeSlashOutline" />
            </n-button>
          </n-button-group>

          <n-button-group size="small">
            <n-button @click="editor?.chain().focus().undo().run()" :disabled="!editor?.can().undo()">
              <n-icon :component="ArrowUndoOutline" />
            </n-button>
            <n-button @click="editor?.chain().focus().redo().run()" :disabled="!editor?.can().redo()">
              <n-icon :component="ArrowRedoOutline" />
            </n-button>
          </n-button-group>
        </n-space>
      </div>

      <!-- Editor Content -->
      <div class="editor-content">
        <editor-content :editor="editor" />
      </div>

      <!-- Form Fields Section -->
      <div class="form-fields-section">
        <h3>Form Fields</h3>
        <n-space>
          <n-button @click="insertFormField('text')" type="info" size="small">
            Text Input
          </n-button>
          <n-button @click="insertFormField('email')" type="info" size="small">
            Email Input
          </n-button>
          <n-button @click="insertFormField('textarea')" type="info" size="small">
            Textarea
          </n-button>
          <n-button @click="insertFormField('select')" type="info" size="small">
            Select Dropdown
          </n-button>
          <n-button @click="insertFormField('checkbox')" type="info" size="small">
            Checkbox
          </n-button>
          <n-button @click="insertFormField('radio')" type="info" size="small">
            Radio Button
          </n-button>
        </n-space>
      </div>
    </n-card>

    <!-- Preview Section -->
    <n-card title="Preview" class="preview-card" v-if="content">
      <div v-html="content" class="preview-content"></div>
    </n-card>
    </n-space>
  </div>
</template>

<style scoped>
.form-editor {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.editor-toolbar {
  padding: 12px;
  background: var(--bg-primary);
  border-radius: 6px;
  margin-bottom: 16px;
}

.editor-content {
  min-height: 300px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 16px;
  background: var(--bg-primary);
}

.form-fields-section {
  margin-top: 16px;
}

.form-fields-section h3 {
  margin-bottom: 12px;
  color: var(--text-secondary);
}

.preview-content {
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-primary);
}

/* TipTap Editor Styles */
:deep(.ProseMirror) {
  outline: none;
  min-height: 300px;
  line-height: 1.6;
}

:deep(.ProseMirror h1) {
  font-size: 2em;
  font-weight: bold;
  margin: 16px 0;
}

:deep(.ProseMirror h2) {
  font-size: 1.5em;
  font-weight: bold;
  margin: 14px 0;
}

:deep(.ProseMirror h3) {
  font-size: 1.2em;
  font-weight: bold;
  margin: 12px 0;
}

:deep(.ProseMirror p) {
  margin: 8px 0;
}

:deep(.ProseMirror ul, .ProseMirror ol) {
  margin: 8px 0;
  padding-left: 20px;
}

:deep(.ProseMirror pre) {
  background: #f4f4f4;
  padding: 12px;
  border-radius: 4px;
  font-family: monospace;
  margin: 12px 0;
}

:deep(.ProseMirror code) {
  background: #f4f4f4;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
}



:deep(.form-field label) {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
}

:deep(.form-field input),
:deep(.form-field textarea),
:deep(.form-field select) {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-size: 14px;
}

:deep(.form-field input:focus),
:deep(.form-field textarea:focus),
:deep(.form-field select:focus) {
  outline: none;
  border-color: #18a058;
  box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.2);
}

:deep(.form-field input[type="checkbox"]),
:deep(.form-field input[type="radio"]) {
  width: auto;
  margin-right: 8px;
}
</style>
