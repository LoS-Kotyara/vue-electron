<template>
  <codemirror
    placeholder="Input something here..."
    v-model="input"
    @input="update"
    :options="cmOptions"
  />
</template>

<script>
import _ from "lodash";
import { codemirror } from "vue-codemirror";

import { cmOptions as CmOptions } from "../js/CMOptions";

export default {
  name: "CMirror",
  components: {
    codemirror
  },
  data() {
    return {
      cmOptions: CmOptions
    };
  },
  methods: {
    update: _.debounce(function(data) {
      this.$store.dispatch("updateInput", data);
    }, 300)
  },
  computed: {
    input: {
      get() {
        return this.$store.getters.getInput;
      },
      set(Val) {
        return Val;
      }
    }
  }
};
</script>

<style>
@import "../css/CMirror.css";
</style>
