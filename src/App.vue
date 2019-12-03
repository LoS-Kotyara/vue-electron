<template>
  <div id="aad8a13">
    <Page />
  </div>
</template>

<script>
import Page from "./components/Page";

export default {
  name: "app",
  components: {
    Page
  }
};
</script>

<style>
html {
  background: #22273f;
}
#aad8a13 {
  padding: 0;
}
html,
body,
#aad8a13,
#Page {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
@import "./css/root.css";
</style>
