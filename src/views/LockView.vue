<template>
  <nav class="text-gray-100 bg-black">
    <!-- <router-link class="text-gray-100" to="/">Home</router-link> |
    <router-link class="text-gray-100" to="/about">About</router-link> | -->
    <router-link class="text-gray-100" to="/lock">Lock</router-link> |
    <!-- <router-link class="text-gray-100" to="/register">Register</router-link> |
    <router-link class="text-gray-100" to="/login">Login</router-link> | -->
    <router-link class="text-gray-100" to="/logout">Logout</router-link>
  </nav>
  <div class="w-full h-screen font-roboto">
    <div class="grid grid-cols-1 lg:grid-cols-7">
      <!--  COLUMN 1 NEW LOCK FORM  -->
      <div class="col-span-2 rounded-b-xl bg-gray-100 m-2 mt-0">
        <div class="lock-form p-4">
          <div class="relative">
            <div
              class="border border-gray-300 rounded-lg shadow-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-0.5 focus-within:ring-indigo-500"
            >
              <label for="title" class="sr-only">Title</label>
              <input
                type="text"
                v-model="name"
                name="title"
                id="title"
                class="block w-full border-0 pl-1 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
                placeholder="Title"
              />
              <label for="description" class="sr-only">Description</label>
              <textarea
                v-model="message"
                rows="5"
                name="description"
                id="description"
                class="block pl-1 w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
                placeholder="Write a description..."
              />

              <!-- Spacer element to match the height of the toolbar -->
              <div aria-hidden="true">
                <div class="py-2">
                  <div class="h-9" />
                </div>
                <div class="h-px" />
                <div class="py-2">
                  <div class="py-px">
                    <div class="h-9" />
                  </div>
                </div>
              </div>
            </div>

            <div class="absolute bottom-0 inset-x-px">
              <!-- Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. -->
              <div
                class="flex flex-nowrap justify-end py-2 px-2 space-x-2 sm:px-3"
              >
                <Listbox
                  as="div"
                  v-model="labelled"
                  class="flex-shrink-0"
                  @click="premiumAlert"
                >
                  <ListboxLabel class="sr-only"> Add a label </ListboxLabel>
                  <div class="relative">
                    <ListboxButton
                      class="relative inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3"
                    >
                      <TagIcon
                        :class="[
                          labelled.value === null
                            ? 'text-gray-300'
                            : 'text-gray-500',
                          'flex-shrink-0 h-5 w-5 sm:-ml-1',
                        ]"
                        aria-hidden="true"
                      />
                      <span
                        :class="[
                          labelled.value === null ? '' : 'text-gray-900',
                          'hidden truncate sm:ml-2 sm:block',
                        ]"
                        >{{
                          labelled.value === null ? "Label" : labelled.name
                        }}</span
                      >
                    </ListboxButton>
                  </div>
                </Listbox>

                <Listbox
                  as="div"
                  v-model="dated"
                  class="flex-shrink-0"
                  @click="premiumAlert"
                >
                  <ListboxLabel class="sr-only"> Add a due date </ListboxLabel>
                  <div class="relative">
                    <ListboxButton
                      class="relative disabled inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3"
                    >
                      <CalendarIcon
                        :class="[
                          dated.value === null
                            ? 'text-gray-300'
                            : 'text-gray-500',
                          'flex-shrink-0 h-5 w-5 sm:-ml-1',
                        ]"
                        aria-hidden="true"
                      />
                      <span
                        :class="[
                          dated.value === null ? '' : 'text-gray-900',
                          'hidden truncate sm:ml-2 sm:block',
                        ]"
                        >{{
                          dated.value === null ? "Due date" : dated.name
                        }}</span
                      >
                    </ListboxButton>
                  </div>
                </Listbox>
              </div>
              <div
                class="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3"
              >
                <div class="flex">
                  <button
                    @click="premiumAlert"
                    type="button"
                    class="-ml-2 -my-2 rounded-full px-3 py-2 inline-flex items-center text-left text-gray-400 group"
                  >
                    <PaperClipIcon
                      class="-ml-1 h-5 w-5 mr-2 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span
                      class="text-sm text-gray-500 group-hover:text-gray-600 italic"
                      >Attach a file</span
                    >
                  </button>
                </div>
                <div class="flex-shrink-0">
                  <button
                    @click="createAJig"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="extra-configuration p-4" @click="premiumAlert">
          <div
            class="p-2 m-2 bg-gray-800 w-full flex rounded-xl text-gray-100 mr-2"
          >
            <div class="pl-5 text-left w-full">Encrypt</div>
            <div>
              <Switch
                v-model="enabled"
                :class="[
                  enabled ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                ]"
              >
                <span class="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  :class="[
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                  ]"
                />
              </Switch>
            </div>
          </div>
          <div
            class="p-2 m-2 bg-gray-800 w-full flex rounded-xl text-gray-100 mr-2"
          >
            <div class="pl-5 text-left w-full">Generate New Address</div>
            <div>
              <Switch
                v-model="enabled"
                :class="[
                  enabled ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                ]"
              >
                <span class="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  :class="[
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                  ]"
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
      <!--  COLUMN 2 MY LOCKS LIST -->
      <div class="p-2 mt-4 m-2 bg-gray-100 col-span-3 max-h-screen rounded-xl">
        <div class="rounded-xl m-2">
          <div
            class="flex text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-500 via-gray-600 to-gray-900"
          >
            <div class="w-full">My Locker</div>
            <div class="pt-4">
              <button @click="getLocked" class="text-sm text-gray-800">
                Load
              </button>
            </div>
          </div>
          <hr class="py-4" />
          <div
            v-if="selectedLock"
            class="rounded-xl p-2 m-2 max-h-24 overflow-y-scroll bg-gray-100 text-gray-900 border-2 border-green-300"
          >
            <div v-if="selectedLock.message?.includes(':')">
              <div class="text-left text-xs text-gray-800 flex">
                <div class="w-full">
                  {{ selectedLock.message.split(":")[0] }}
                </div>
                <div class="text-right text-xs">
                  {{ selectedLock.message.split(":")[2] }}
                </div>
              </div>
              <div class="text-left">
                {{ selectedLock.message.split(":")[1] }}
              </div>
            </div>
            <div v-else>
              <div>{{ selectedLock.message }}</div>
            </div>
          </div>
          <ul
            role="list"
            class="grid grid-cols-1 gap-6 overflow-y-scroll"
            style="max-height: 850px"
          >
            <li
              v-for="jig in jigs"
              :key="jig.location"
              @click="loadLock(jig)"
              class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div
                v-if="jig.message?.includes(':')"
                class="w-full flex items-center justify-between p-6 space-x-6"
              >
                <div class="flex-1 truncate">
                  <div class="flex items-center space-x-3">
                    <h3 class="text-gray-900 text-sm font-medium truncate">
                      {{ jig.message.split(":")[0] }}
                    </h3>
                    <span
                      class="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full"
                      >{{
                        jig.message
                          .split(":")[2]
                          ?.substring(0, jig.message.split(":")[2].length - 2)
                      }}</span
                    >
                  </div>
                  <p class="mt-1 text-gray-500 text-sm truncate">
                    {{ jig.message.split(":")[1].substring(0, 100) }}
                  </p>
                </div>
                <!-- <img
                  class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                  :src="person.imageUrl"
                  alt=""
                /> -->
              </div>
              <div>
                <div class="-mt-px flex divide-x divide-gray-200">
                  <div class="w-0 flex-1 flex">
                    <a
                      @click="premiumAlert"
                      class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                    >
                      <MailIcon
                        class="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span class="ml-3">Send</span>
                    </a>
                  </div>
                  <div class="-ml-px w-0 flex-1 flex">
                    <a
                      norel
                      noopener
                      target="_blank"
                      :href="`https://www.whatsonchain.com/tx/${
                        jig.location.split('_')[0]
                      }`"
                      class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                    >
                      <ShareIcon
                        class="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span class="ml-3">View On Chain</span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--  COLUMN 3 MY Account Info -->
      <div class="col-span-2 bg-gray-100">
        <div class="rounded-xl p-2 m-2 mt-4 flex-1 bg-white">
          <div
            class="p-2 pt-2 pb-6 mt-1 text-3xl bg-clip-text text-transparent bg-gradient-to-b from-gray-600 via-gray-700 to-gray-900"
          >
            ACCOUNT
          </div>
          <hr />
          <div class="grid grid-cols-2">
            <div class="col-span-1 text-left">Blockchain Address:</div>
            <div class="col-span-1 text-xs">{{ userOwnerAddress }}</div>
            <div class="col-span-1 text-left">VXLockID :</div>
            <div class="col-span-1 text-xs">{{ user.uid }}</div>
            <div class="col-span-1 text-left">Email Address :</div>
            <div class="col-span-1 text-xs">{{ user.email }}</div>
            <div class="col-span-1 text-left">Signing Key :</div>
            <div class="col-span-1 text-xs"></div>
            <div class="col-span-2">
              <button
                @click="logout"
                class="w-full items-center mt-1 border border-transparent text-base font-medium rounded-full shadow-sm text-red-500 hover:text-white hover:bg-red-500 hover:outline-none hover:ring-2 hover:ring-red-500"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//garment arm sting pilot load again soccer phrase novel copper unable tent

import { reactive, ref, toRefs } from "vue";
import { useStore, mapState } from "vuex";
import { useFirebase } from "./../composition/useFirebase.js";
import { Switch } from "@headlessui/vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  //ListboxOption,
  //ListboxOptions,
} from "@headlessui/vue";
import {
  CalendarIcon,
  PaperClipIcon,
  TagIcon,
  MailIcon,
  //PhoneIcon,
  ShareIcon,
} from "@heroicons/vue/solid";

const assignees = [
  { name: "Unassigned", value: null },
  {
    name: "Wade Cooper",
    value: "wade-cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More items...
];
const labels = [
  { name: "Unlabelled", value: null },
  { name: "Engineering", value: "engineering" },
  // More items...
];
const dueDates = [
  { name: "No due date", value: null },
  { name: "Today", value: "today" },
  // More items...
];
export default {
  components: {
    Switch,
    Listbox,
    ListboxButton,
    ListboxLabel,
    //ListboxOption,
    //ListboxOptions,
    CalendarIcon,
    PaperClipIcon,
    TagIcon,
    //UserCircleIcon,
    MailIcon,
    //PhoneIcon,
    ShareIcon,
  },
  setup() {
    //const assigned = ref(assignees[0]);
    const labelled = ref(labels[0]);
    const dated = ref(dueDates[0]);
    let store = useStore();
    store.commit(
      "setUserPurseKey",
      "KwZw2apQ2HJnTbnN6f26YzmYhU9KEmiCrb7HaVDi2MFnXLq6aH38"
    );
    let enabled = false;
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
      enabled,
      assignees,
      labels,
      dueDates,
      //assigned,
      labelled,
      dated,
    };
  },
  methods: {
    async createAJig() {
      let txid;
      let response;
      if (this.message.length > 240) {
        alert(
          "Your message is too long, please upgrade to our pro-subscription"
        );
        return;
      }
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
      let messageToSave =
        this.name + ":" + this.message + ":" + new Date().toUTCString();
      console.log(messageToSave);
      try {
        tx.update(() => {
          new LockerClass(messageToSave);
        });
        txid = await tx.publish();
        console.log("published", txid);
        let { addLock } = useFirebase(
          this.$store.state.user.uid,
          _run.owner.address
        );
        response = await addLock(messageToSave);
        console.log(response);
        this.message = "";
        this.name = "";
      } catch (err) {
        response = err;
      }
      return response;
    },
    async getLocked() {
      console.log(this.$store.state.userPurseKey);
      let _run = new window.Run({
        trust: "*",
        purse: this.$store.state.userPurseKey,
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
    premiumAlert() {
      alert("Premium Options Coming Soon");
    },
  },
  computed: {
    ...mapState(["userOwnerAddress", "user"]),
  },
};
</script>

<style lang="scss" scoped></style>
