import Vue from "vue";
import Vuex from "vuex";

import showdown from "showdown";
import showdownKatex from "showdown-katex";
import showdownHighlight from "showdown-highlight";

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
      return converter.makeHtml(state.input);
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
