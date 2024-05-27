<template>
  <Codemirror v-model:value="code" :options="cmOptions" border @change="onChange" @ready="onReady">
  </Codemirror>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Codemirror from 'codemirror-editor-vue3'
import type { Editor, EditorConfiguration } from 'codemirror'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/xml-hint.js'
import 'codemirror/theme/base16-light.css'
import CodeMirror from 'codemirror'
export default defineComponent({
  components: {
    Codemirror
  },
  setup() {
    const cminstance = ref<Editor>()
    const code = ref(`
    
    `)

    const tags = {
      '!top': ['dependency'],
      dependency: {
        children: ['groupId', 'artifactId', 'version']
      },
      groupId: {},
      artifactId: {},
      version: {}
    }
    function completeAfter(cm) {
      cm.getCursor()
      setTimeout(function () {
        if (!cm.state.completionActive) cm.showHint({ completeSingle: false })
      }, 100)

      return CodeMirror.Pass
    }

    const cmOptions: EditorConfiguration = {
      mode: 'xml',
      hintOptions: {
        schemaInfo: tags
      },
      extraKeys: {
        "'<'": completeAfter
      },

      lineNumbers: true,
      theme: 'base16-light'
    }

    return {
      code,
      cmOptions,
      onReady(cm: Editor) {
        cminstance.value = cm
      },
      onChange(value: string, cm: Editor) {
        console.log(value, cm)
      }
    }
  }
})
</script>
