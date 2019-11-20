<template>
  <div id="Page">
    <textarea
      id="input"
      :value="input"
      @input="update"
      placeholder="Input something here"
    ></textarea>
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

export default {
  name: "Page",
  data() {
    return {
      input: ""
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
}
#input {
  resize: none;
  width: auto;
  padding: 1em;
  margin: 0;
  border: 0pt;
  height: auto;
  font-size: 14pt;
  background: #22273f;
  color: #f8f8f8f8;
  border: solid #c45774;
}
#input::placeholder {
  color: #f8f8f88f;
}
#output {
  height: auto;
  width: auto;
  font-size: 14pt;
  padding: 1em;
  margin: 0;
  background: #22273f;
  color: #f8f8f8f8;
  word-wrap: break-word;
  border: solid #c45774;
}

div#output > pre,
div#output > span > span {
  background: #faebd731;
  padding: 0.5em;
}
</style>
