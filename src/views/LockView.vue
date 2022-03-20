<template>
  <div
    class="w-full h-screen overflow-y-scroll font-roboto bg-black text-gray-100"
  >
    <div class="grid grid-cols-3">
      <div class="col-span-1 px-4">
        <div class="bg-gray-900 rounded-xl h-96">
          <div
            class="p-2 m-2 flex text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-blue-500 via-indigo-600 to-purple-500"
          >
            <div class="w-full">My Locks</div>
            <div>
              <button @click="getLocked" class="text-sm text-gray-200">
                Load
              </button>
            </div>
          </div>
          <hr />
          <div
            v-for="jig in jigs"
            :key="jig.location"
            class="p-2 m-0.5 bg-black rounded-xl"
            @click="loadLock(jig)"
          >
            {{ jig.message }}
          </div>
          <div v-if="!jigs || jigs.length === 0">
            <div
              class="p-16 text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-300 via-purple-600 to-pink-500"
            >
              Nothing to see here
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <div>
          {{ selectedLock }}
        </div>
        <div class="p-4 m-4">
          <div
            class="p-2 text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-300 via-purple-600 to-pink-500"
          >
            Create A Lock
          </div>
          <div class="w-full">
            <div class="text-lg font-bold w-full pl-4 text-gray-900">
              Your Name:
            </div>
            <div class="">
              <input
                v-model="name"
                class="ring-1 ring-indigo-500 rounded-xl bg-gray-100 w-3/4"
              />
            </div>
            <div class="text-lg font-bold">Your Message:</div>
            <div class="">
              <textarea
                type="textarea"
                rows="5"
                v-model="message"
                class="ring-1 ring-indigo-500 rounded-xl bg-gray-100 w-3/4 text-gray-900"
              />
            </div>
            <div>
              <button @click="createAJig">Create A Jig</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- NAV BAR -->
    <!-- <div>Owner: {{ ownerAddress }} Purse: {{ purseAddress }}</div> -->
    <div class="">
      <div>Use My Address:</div>
    </div>
  </div>
</template>

<script>
//garment arm sting pilot load again soccer phrase novel copper unable tent
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    let store = useStore();
    const state = reactive({
      count: 0,
      newSeed: "",
      name: "",
      message: "",
      jigs: store.state.userLocks,
      selectedLock: null,
    });
    return {
      ...toRefs(state),
    };
  },
  methods: {
    async createAJig() {
      let _run = new window.Run({
        trust: "*",
        purse: "KwZw2apQ2HJnTbnN6f26YzmYhU9KEmiCrb7HaVDi2MFnXLq6aH38",
        owner: "L2vg4igrv21c9H8LYkbZYj2XHmmYw8wMxyFni4pVM6ADtykxEbUL",
      });
      let LockerClass = await _run.load(
        "5b11de644722fdc47f7ac773d3455b6b260a98416935940940b5bb650c0a8fd6_o1"
      );
      console.log(LockerClass);
      await _run.sync();
      console.log(await _run.purse.balance());
      // let locked = new LockerClass("lock me ");
      let tx = new window.Run.Transaction();
      tx.update(() => {
        new LockerClass("Lock Me");
      });
      let txid = await tx.publish();
      console.log("published", txid);
      return "";
    },
    async getLocked() {
      let _run = new window.Run({
        trust: "*",
        purse: "KwZw2apQ2HJnTbnN6f26YzmYhU9KEmiCrb7HaVDi2MFnXLq6aH38",
        owner: "L2vg4igrv21c9H8LYkbZYj2XHmmYw8wMxyFni4pVM6ADtykxEbUL",
      });
      console.log("syncing");
      await _run.inventory.sync();
      console.log("synced");
      console.log(_run.inventory.jigs);
      this.jigs = _run.inventory.jigs;
      this.$store.commit("setUserLocks", this.jigs);
    },
    async getBalance() {
      return null;
    },
    loadLock(lock) {
      this.selectedLock = lock;
    },
  },
};
</script>

<style lang="scss" scoped></style>
