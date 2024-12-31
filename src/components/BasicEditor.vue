<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="flex flex-col space-y-4">
      <button 
        @click="insertFormKitNode"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Insert FormKit Node
      </button>
      <editor-content :editor="editor" class="w-[1200px] min-h-[1200px] bg-white border border-gray-300 rounded-md p-8" />
    </div>
    <CommandBar v-model:open="commandBarOpen" @execute="handleCommand" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { ref, onMounted, onUnmounted } from 'vue'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { FormKitNode } from '../extensions/FormKitNode'
import CommandBar from './CommandBar.vue'

const editor = useEditor({
  content: '<div class="editor-content"></div>',
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: 'Start Typing ....',
    }),
    FormKitNode,
  ],
  onUpdate: ({ editor }) => {
    // Handle editor updates
  },
})

const commandBarOpen = ref(false)

// Handle command palette commands
const handleCommand = (command: string) => {
  switch (command) {
    case 'text-input':
      insertFormKitNode()
      break
    // Add more commands here
  }
}

// Open command palette with /
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === '/' && editor?.value?.isFocused) {
    event.preventDefault()
    commandBarOpen.value = true
    return false // Prevent further processing
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const getFieldCount = () => {
  if (!editor || !editor.value) return 0
  return editor.value.state.doc.content.content.filter(
    node => node.type.name === 'formKitNode'
  ).length
}

const insertFormKitNode = () => {
  try {
    if (!editor || !editor.value) {
      console.error('Editor instance is not available')
      return
    }

    const fieldCount = getFieldCount()
    const fieldId = `field-${fieldCount}`
    
    editor.value.chain()
      .focus()
      .insertContent([
        {
          type: 'formKitNode',
          attrs: {
            type: 'text',
            label: `New Field ${fieldCount + 1}`,
            validation: 'required',
            id: fieldId,
          },
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: ' ',
            },
          ],
        }
      ])
      .focus()
      .run()
  } catch (error) {
    console.error('Error inserting FormKit node:', error)
  }
}
</script>

<style>
.ProseMirror {
  min-height: 1200px;
  padding: 2rem;
}

.ProseMirror:focus {
  outline: none;
  border-color: #646cff;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
