<script setup lang="ts">
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { FormKit } from '@formkit/vue'
import type { Node as ProseMirrorNode } from '@tiptap/pm/model'
import type { NodeViewProps } from '@tiptap/core'

const props = defineProps<NodeViewProps>()

const handleInput = (value: string) => {
  props.updateAttributes({ 
    value,
    id: props.node.attrs.id 
  })
}
</script>

<template>
  <NodeViewWrapper class="formkit-node">
    <FormKit
      :type="node.attrs.type"
      :label="node.attrs.label"
      :validation="node.attrs.validation"
      @input="handleInput"
    />
    <NodeViewContent class="content" />
  </NodeViewWrapper>
</template>

<style>
.formkit-node {
  margin: 1rem 0;
}
</style>
