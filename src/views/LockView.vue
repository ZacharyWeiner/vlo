<template>
  <nav class="text-gray-100 bg-black max-h-screen overflow-y-scroll">
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
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
      <div
        class="p-2 mt-4 m-2 bg-gradient-to-b from-gray-100 to-gray-300 col-span-3 max-h-screen rounded-xl"
      >
        <div class="rounded-xl m-2">
          <div
            class="flex text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-500 via-gray-700 to-gray-900"
          >
            <div class="w-full">My Locker</div>
            <div class="pt-4">
              <button @click="getLocked" class="text-sm text-gray-900">
                Load
              </button>
            </div>
          </div>
          <hr class="py-4" />
          <div
            v-if="selectedLock"
            class="-m-4 rounded-xl overflow-y-scroll bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 mb-6"
          >
            <div
              v-if="selectedLock.message?.includes(':')"
              class="w-full flex items-center justify-between p-6 space-x-6"
            >
              <div class="flex-1 truncate">
                <div class="flex items-center space-x-3">
                  <h3
                    class="text-gray-900 text-sm text-left font-medium truncate w-full"
                  >
                    {{ selectedLock.message.split(":")[0] }}
                  </h3>
                  <span
                    class="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full"
                    >{{
                      selectedLock.message
                        .split(":")[2]
                        ?.substring(
                          0,
                          selectedLock.message.split(":")[2].length - 2
                        )
                    }}</span
                  >
                </div>
                <p class="text-left mt-1 text-gray-500 text-sm truncate">
                  {{ selectedLock.message.split(":")[1].substring(0, 100) }}
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
                <div
                  class="w-0 flex-1 flex rounded bg-gradient-to-b from-orange-500 to-pink-500 m-0.5 mb-0"
                >
                  <a
                    @click="premiumAlert"
                    class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-100 font-medium border border-transparent rounded-bl-lg hover:text-gray-100"
                  >
                    <MailIcon class="w-5 h-5 text-white" aria-hidden="true" />
                    <span class="ml-3">Send</span>
                  </a>
                </div>
                <div
                  class="-ml-px w-0 flex-1 flex rounded bg-gradient-to-b from-blue-500 to-indigo-500 m-0.5 mb-0"
                >
                  <a
                    norel
                    noopener
                    target="_blank"
                    :href="`https://www.whatsonchain.com/tx/${
                      selectedLock.location.split('_')[0]
                    }`"
                    class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-100 font-medium border border-transparent rounded-br-lg hover:text-gray-100"
                  >
                    <ShareIcon
                      class="w-5 h-5 text-gray-100"
                      aria-hidden="true"
                    />
                    <span class="ml-3">View On Chain</span>
                  </a>
                </div>
              </div>
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
                    <h3
                      class="text-gray-900 text-sm text-left font-medium truncate w-full"
                    >
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
                  <p class="text-left mt-1 text-gray-500 text-sm truncate">
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
                  <div
                    class="w-0 flex-1 flex rounded bg-gradient-to-b from-orange-500 to-pink-500 m-0.5 mb-0"
                  >
                    <a
                      @click="premiumAlert"
                      class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-100 font-medium border border-transparent rounded-bl-lg hover:text-gray-100"
                    >
                      <MailIcon class="w-5 h-5 text-white" aria-hidden="true" />
                      <span class="ml-3">Send</span>
                    </a>
                  </div>
                  <div
                    class="-ml-px w-0 flex-1 flex rounded bg-gradient-to-b from-blue-500 to-indigo-500 m-0.5 mb-0"
                  >
                    <a
                      norel
                      noopener
                      target="_blank"
                      :href="`https://www.whatsonchain.com/tx/${
                        jig.location.split('_')[0]
                      }`"
                      class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-100 font-medium border border-transparent rounded-br-lg hover:text-gray-100"
                    >
                      <ShareIcon
                        class="w-5 h-5 text-gray-100"
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
          <div class="flex">
            <div
              class="p-2 pt-2 pb-6 mt-1 text-3xl bg-clip-text text-transparent bg-gradient-to-b from-gray-600 via-gray-700 to-gray-900"
            >
              ACCOUNT
            </div>
            <div class="w-full text-right">
              <button
                @click="premiumAlert"
                class="items-center mt-1 text-white p-1 px-2 border border-transparent text-base font-medium rounded-full shadow-sm bg-gradient-to-r from-indigo-400 to-blue-500 hover:text-white hover:bg-blue-500 hover:outline-none hover:ring-2 hover:ring-blue-500"
              >
                New Address
              </button>
            </div>
          </div>
          <hr />
          <div class="pt-1 flex-1 space-y-2">
            <div class="bg-gray-100 rounded-xl shadow p-2">
              <div class="col-span-4 text-left">BlockchainID:</div>
              <div class="col-span-4 text-xs text-left">
                {{ userOwnerAddress }}
              </div>
            </div>
            <div class="bg-gray-100 rounded-xl shadow p-2">
              <div class="col-span-4 text-left pt-2">VXLockID :</div>
              <div class="col-span-4 text-xs pt-1 text-left">
                {{ user?.uid }}
              </div>
            </div>
            <div class="bg-gray-100 rounded-xl shadow p-2">
              <div class="col-span-4 text-left pt-2">Email Address :</div>
              <div class="col-span-4 text-xs pt-1 text-left">
                {{ user?.email }}
              </div>
            </div>
            <div class="bg-gray-100 rounded-xl shadow p-2">
              <div class="col-span-4 text-left pt-2">Signing Key :</div>
              <div class="col-span-4 text-xs pt-1 text-left">
                {{ userOwnerKey }}
              </div>
            </div>
            <div class="col-span-3">
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
import { useRouter } from "vue-router";
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
    CalendarIcon,
    PaperClipIcon,
    TagIcon,
    MailIcon,
    ShareIcon,
  },
  setup() {
    let router = useRouter();
    const labelled = ref(labels[0]);
    const dated = ref(dueDates[0]);
    let store = useStore();
    if (store.state.user === null) {
      router.push("/login");
    } else {
      console.log("User:", store.state.user);
    }
    console.log(window);
    let messageToSave = "Aribatrary Message";
    let signKey = window.bsv.PrivateKey.fromString(
      "L2vg4igrv21c9H8LYkbZYj2XHmmYw8wMxyFni4pVM6ADtykxEbUL"
    );
    let signedMessage = window.bsvMessage.sign(messageToSave, signKey);
    console.log(signedMessage);
    // let mnemonic = window.bsvMnemonic.fromWords(
    //   window.bsvMnemonic.WORDS.ENGLISH
    // );
    console.log(window.bsvMnemonic.Words.ENGLISH);
    // store.commit(
    //   "setUserPurseKey",
    //   "KwZw2apQ2HJnTbnN6f26YzmYhU9KEmiCrb7HaVDi2MFnXLq6aH38"
    // );
    let enabled = false;
    let _title = "";
    if (store.state.anonTitle !== "") {
      _title = store.state.anonTitle;
    }
    if (store.state.anonMessage !== "") {
      _title = store.state.anonMessage;
    }
    const state = reactive({
      count: 0,
      newSeed: "",
      name: _title,
      message: "",
      jigs: store.state.userLocks,
      selectedLock: null,
    });
    return {
      ...toRefs(state),
      enabled,
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
        "a6fbd56e08319384853f8df664a0648343080a2efdf7d1d317957636e63842c3_o1"
      );
      console.log(LockerClass);
      await _run.sync();
      console.log(await _run.purse.balance());
      let tx = new window.Run.Transaction();
      let messageToSave =
        this.name + ":" + this.message + ":" + new Date().toUTCString();
      let signKey = window.bsv.PrivateKey.fromString(_run.owner.privkey);
      let signedMessage = window.bsvMessage.sign(messageToSave, signKey);
      console.log(signedMessage);
      try {
        tx.update(() => {
          new LockerClass(
            messageToSave,
            signedMessage,
            _run.owner.address.toString()
          );
        });
        txid = await tx.publish();
        console.log("published", txid);
        let { addLock } = useFirebase(
          this.$store.state.user.uid,
          _run.owner.address
        );
        response = await addLock(messageToSave);
        console.log({ response });
        this.message = "";
        this.name = "";
        this.$store.dispatch("clearLockBoxes");
        await this.getLocked();
      } catch (err) {
        response = err;
        console.log({ err });
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
      this.$store.commit("setUserOwnerAddress", _run.owner.address);
      this.$store.commit("setUserOwnerKey", _run.owner.privkey);
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
    ...mapState(["userOwnerAddress", "userOwnerKey", "user"]),
  },
};
</script>

<style lang="scss" scoped></style>
