<script setup lang="ts">
import { Command } from 'cmdk'
import { ref, onMounted, onUnmounted } from 'vue'

const open = ref(false)

// Handle command execution
const executeCommand = (command: string) => {
  console.log('Executing command:', command)
  open.value = false
}

// Handle keydown events
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === '/') {
    event.preventDefault()
    open.value = true
  }
}

// Add event listeners
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Command.Dialog
    :open="open"
    @update:open="(val: boolean) => (open = val)"
    class="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg border shadow-md w-[450px]"
  >
    <Command.Input
      placeholder="Type a command or search..."
      class="w-full p-3 border-b focus:outline-none"
    />
    
    <Command.List class="max-h-[300px] overflow-y-auto">
      <Command.Empty class="p-3 text-gray-500">
        No results found.
      </Command.Empty>

      <Command.Group heading="Form Elements">
        <Command.Item
          value="text-input"
          @select="executeCommand('text-input')"
          class="p-2 hover:bg-gray-100 cursor-pointer"
        >
          Text Input
        </Command.Item>
      </Command.Group>
    </Command.List>
  </Command.Dialog>
</template>

<style>
[cmdk-root] {
  z-index: 1000;
}

[cmdk-item][data-selected="true"] {
  background-color: #f3f4f6;
}
</style>
