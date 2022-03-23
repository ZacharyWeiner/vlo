<template>
  <div>You Have Been Logged Out</div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
  mounted() {
    this.$store.commit("setUser", null);
  },
};
</script>

<style lang="scss" scoped></style>
