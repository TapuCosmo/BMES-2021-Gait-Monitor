import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    monitors: {
      left: {
        t: [],
        acc: {
          x: [],
          y: [],
          z: []
        },
        gyr: {
          x: [],
          y: [],
          z: []
        }
      },
      right: {
        t: [],
        acc: {
          x: [],
          y: [],
          z: []
        },
        gyr: {
          x: [],
          y: [],
          z: []
        }
      }
    }
  },
  mutations: {
    pushData(state, {monitor, time, accData, gyrData}) {
      state.monitors[monitor].t.push(time);
      for (const comp of ["x", "y", "z"]) {
        state.monitors[monitor].acc[comp].push(accData[comp]);
        state.monitors[monitor].gyr[comp].push(gyrData[comp]);
      }
    }
  },
  actions: {
    pushData({commit}, commitData) {
      commit("pushData", commitData);
    }
  }
});
