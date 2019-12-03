<template>
  <div id="Page">
    <div id="input">
      <CMirror />
    </div>
    <div id="output" v-html="output" />
  </div>
</template>

<script>
import CMirror from "./CMirror";

export default {
  name: "Page",
  components: {
    CMirror
  },
  computed: {
    output: function() {
      return this.$store.getters.getOutput;
    }
  }
};
</script>

<style>
@import "../css/Page.css";
@import "../css/Output.css";
</style>
