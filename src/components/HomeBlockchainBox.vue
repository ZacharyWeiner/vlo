<template>
  <div class="relative">
    <div
      class="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500"
    >
      <label for="title" class="sr-only">Title</label>
      <input
        v-model="title"
        type="text"
        name="title"
        id="title"
        class="block w-full border-0 pl-2.5 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
        placeholder="Give your note a title."
      />
      <label for="description" class="sr-only">Description</label>
      <textarea
        v-model="message"
        rows="16"
        name="description"
        id="description"
        class="block w-full border-0 pl-2.5 py-1 resize-none placeholder-gray-500 focus:border-gray-500 focus:border-1 focus:ring-gray-500 focus:ring-1 sm:text-sm"
        placeholder="Save something to the blockchain. It will be there forever, so be considerate."
      />

      <!-- Spacer element to match the height of the toolbar -->
    </div>

    <div class="absolute bottom-0 inset-x-px">
      <!-- Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. -->
      <div
        class="flex flex-nowrap justify-end py-2 px-2 space-x-2 sm:px-3"
      ></div>
      <div
        class="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3"
      >
        <div class="flex"></div>
        <div class="flex-shrink-0">
          <button
            @click="saveInState"
            class="inline-flex items-center px-4 py-2 border border-0 text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-teal-500 to-teal-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  components: {},
  setup() {
    let _sTitle = "";
    let _sMessage = "";
    let store = useStore();
    if (store.state.anonTitle !== "") {
      _sTitle = store.state.anonTitle;
    }
    if (store.state.anonMessage !== "") {
      _sMessage = store.state.anonMessage;
    }
    const state = reactive({
      title: _sTitle,
      message: _sMessage,
    });
    return {
      ...toRefs(state),
    };
  },
  methods: {
    saveInState() {
      this.$store.commit("setAnonTitle", this.title);
      this.$store.commit("setAnonMessage", this.message);
      this.$emit("anonMessageSet");
    },
  },
};
</script>
