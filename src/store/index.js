import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "vx-lock-v1",
});

export default createStore({
  state: {
    userSeed: "",
    userOwnerKey: "",
    userOwnerAddress: "",
    userPurseKey: "",
    userPurseAddress: "",
    userLocks: [],
    lockerClassLocation:
      "5b11de644722fdc47f7ac773d3455b6b260a98416935940940b5bb650c0a8fd6_o1",
  },
  getters: {},
  mutations: {
    setUserSeed(state, _seed) {
      state.userSeed = _seed;
    },
    setUserOwnerKey(state, _key) {
      state.userOwnerKey = _key;
    },
    setUserOwnerAddress(state, _address) {
      state.userOwnerAddress = _address;
    },
    setUserPurseKey(state, _key) {
      state.userPurseKey = _key;
    },
    setUserPurseAddress(state, _address) {
      state.userPurseAddress = _address;
    },
    setUserLocks(state, locks) {
      state.userLocks = locks;
    },
  },
  actions: {
    login(
      { commit },
      _seed,
      _userPurseKey,
      _userPurseAddress,
      _userOwnerKey,
      _userOwnerAddress
    ) {
      commit("setUserSeed", _seed);
      commit("setUserPurseKey", _userPurseKey);
      commit("setUserPurseAddress", _userPurseAddress);
      commit("setUserOwnerKey", _userOwnerKey);
      commit("setUserOwnerAddress", _userOwnerAddress);
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin],
});
