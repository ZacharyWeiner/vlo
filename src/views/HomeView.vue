<template>
  <div class="flex-1 justify-center bg-black h-screen">
    <div class="flex justify-center">
      <img alt="Vue logo" class="" src="../assets/logo.png" />
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "HomeView",
  setup() {},
  components: {
    HelloWorld,
  },
  methods: {},
};
</script>
