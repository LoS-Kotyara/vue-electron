import Vue from "vue";
import Vuex from "vuex";

import showdown from "showdown";
import showdownKatex from "showdown-katex";
import showdownHighlight from "showdown-highlight";
import sanitize from "sanitize-html";

const converter = new showdown.Converter({
  extensions: [showdownKatex(), showdownHighlight()]
});

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    input: "",
    output: ""
  },
  getters: {
    getInput: state => {
      return state.input;
    },
    getOutput: state => {
      let temp = sanitize(state.input);
      return converter.makeHtml(temp);
    }
  },
  mutations: {
    updateInput: (state, newData) => {
      state.input = newData;
    }
  },
  actions: {
    updateInput: (context, payload) => {
      context.commit("updateInput", payload);
    }
  },
  modules: {}
});
