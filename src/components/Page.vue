<template>
  <div id="Page">
    <div id="input">
      <codemirror
        placeholder="Input something here..."
        v-model="input"
        :options="cmOptions"
      ></codemirror>
    </div>
    <div id="output" v-html="output" />
  </div>
</template>

<script>
import _ from "lodash";

import showdown from "showdown";
import showdownKatex from "showdown-katex";
import showdownHighlight from "showdown-highlight";

const converter = new showdown.Converter({
  extensions: [showdownKatex(), showdownHighlight()]
});

converter.setFlavor("github");

import { codemirror } from "vue-codemirror";

import "../../node_modules/codemirror/mode/markdown/markdown.js";
import "../../node_modules/codemirror/theme/moxer.css";
import "../../node_modules/codemirror/lib/codemirror.css";

// Дополниетельные стили прокрутки
import "../../node_modules/codemirror/addon/scroll/simplescrollbars.js";
import "../../node_modules/codemirror/addon/scroll/simplescrollbars.css";

// Добавление текста, который показывается, если поле пустое
import "../../node_modules/codemirror/addon/display/placeholder.js";

// Автоматическое закрытие скобок
import "../../node_modules/codemirror/addon/edit/closebrackets.js";

// Нахождение парной скобки
import "../../node_modules/codemirror/addon/edit/matchbrackets.js";

import "../../node_modules/codemirror/addon/search/search.js";
import "../../node_modules/codemirror/addon/search/searchcursor.js";

import "../../node_modules/codemirror/addon/dialog/dialog.js";
import "../../node_modules/codemirror/addon/dialog/dialog.css";

export default {
  name: "Page",
  components: {
    codemirror
  },
  data() {
    return {
      input: "",
      cmOptions: {
        scrollbarStyle: "overlay",
        tabSize: 2,
        mode: "text/x-markdown",
        theme: "moxer",
        lineNumbers: true,
        line: true,
        lineWrapping: true,
        autoCloseBrackets: true,
        matchBrackets: true
      }
    };
  },
  methods: {
    update: _.debounce(function(e) {
      this.input = e.target.value;
    }, 300)
  },
  computed: {
    output: function() {
      return converter.makeHtml(this.input);
    }
  }
};
</script>

<style>
#Page {
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 50% 50%;
  font-family: monospace;
  height: 100%;
}
#input {
  resize: none;
  width: auto;
  margin: 0;
  border: 0pt;
  height: auto;
  font-size: 14pt;
  background: #22273f;
  color: #f8f8f8f8;
  border: solid #c45774;
  display: grid;
  grid-template-rows: 100%;
  overflow: hidden;
}
#output {
  height: auto;
  width: auto;
  font-size: 14pt;
  padding: 1em;
  margin: 0;
  color: #f8f8f8f8;
  word-wrap: break-word;
  border: solid #c45774;
  overflow: auto;
}

#output::-webkit-scrollbar {
  height: var(--scrollbar-size);
  width: var(--scrollbar-size);
}
#output::-webkit-scrollbar-track {
  background-color: var(--scrollbar-track-color);
}
#output::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-color);
  border: 1px solid #bbb;
  border-radius: 2px;
  width: 8px;
  /* Если нужно - добавьте :hover и:active */
}
#output::-webkit-scrollbar-thumb:vertical {
  min-height: var(--scrollbar-minlength);
}

div#output > pre,
div#output > span > span {
  background: hsla(34, 78%, 91%, 0.056);
  padding: 0.5em;
}

#input > div {
  display: grid;
  grid-template-rows: 100%;
}

.cm-s-moxer.CodeMirror {
  margin: 0;
  padding-top: 1em;
  /* color: #f8f8f8f8; */
  height: auto;
  font-size: 14pt;
}

.CodeMirror-code {
  word-wrap: break-word;
}

.CodeMirror-gutter,
.cm-s-moxer.CodeMirror,
#output {
  background: #22273f;
}

#input
  > div
  > div
  > div.CodeMirror-scroll
  > div.CodeMirror-sizer
  > div
  > div
  > div
  > div.CodeMirror-code
  > div
  > div
  > div {
  color: hsla(48, 100%, 50%, 0.618) !important;
}

#input
  > div
  > div
  > div.CodeMirror-scroll
  > div.CodeMirror-sizer
  > div
  > div
  > div
  > div.CodeMirror-code
  > div
  > pre {
  color: #f8f8f8f8;
}

.cm-s-moxer .CodeMirror-line::selection,
.cm-s-moxer .CodeMirror-line > span::selection,
.cm-s-moxer .CodeMirror-line > span > span::selection,
.CodeMirror-selected {
  background: #cccccc;
}

#input
  > div
  > div
  > div.CodeMirror-scroll
  > div.CodeMirror-sizer
  > div
  > div
  > div
  > div.CodeMirror-code
  > div
  > pre
  > span
  > span.cm-comment {
  color: hsla(0, 0%, 97%, 0.382);
}

#input
  > div
  > div
  > div.CodeMirror-scroll
  > div.CodeMirror-sizer
  > div
  > div
  > div
  > div.CodeMirror-code
  > div
  > pre
  > span
  > span.cm-header {
  color: #894366;
}
</style>
