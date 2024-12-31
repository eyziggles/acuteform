import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import type { NodeViewProps } from '@tiptap/core'
import FormKitComponent from '@/components/FormKitComponent.vue'

export const FormKitNode = Node.create({
  name: 'formKitNode',
  
  group: 'block',
  
  content: '',
  
  draggable: true,

  addAttributes() {
    return {
      type: {
        default: 'text',
      },
      label: {
        default: '',
      },
      validation: {
        default: '',
      },
      id: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'formkit-node',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 
      class: 'formkit-wrapper',
      'data-type': HTMLAttributes.type,
      'data-label': HTMLAttributes.label,
      'data-validation': HTMLAttributes.validation,
      'data-id': HTMLAttributes.id
    }]
  },

  addNodeView() {
    return VueNodeViewRenderer(FormKitComponent, {
      update: (props) => {
        return props.newNode.type.name === 'formKitNode'
      },
    })
  },
})
