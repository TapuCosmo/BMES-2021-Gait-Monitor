import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    t0: Date.now(),
    monitors: {
      left: {
        ankle: {
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
        knee: {
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
      },
      right: {
        ankle: {
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
        knee: {
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
    // monitors: {
    //   left: {
    //     ankle: {
    //       t: [1,2,3,4,5],
    //       acc: {
    //         x: [2, 5, 4, -1, 11],
    //         y: [6, 2, 7, 6, 1],
    //         z: [1, 3, 1, -5, 3]
    //       },
    //       gyr: {
    //         x: [2, 5, 4, -1, 11],
    //         y: [6, 2, 7, 6, 1],
    //         z: [1, 3, 1, -5, 3]
    //       }
    //     },
    //     knee: {
    //       t: [1,2,3,4,5],
    //       acc: {
    //         x: [2, 5, 4, -1, 11],
    //         y: [6, 2, 7, 6, 1],
    //         z: [1, 3, 1, -5, 3]
    //       },
    //       gyr: {
    //         x: [2, 5, 4, -1, 11],
    //         y: [6, 2, 7, 6, 1],
    //         z: [1, 3, 1, -5, 3]
    //       }
    //     }
    //   },
    //   right: {
    //     ankle: {
    //       t: [1,2,3,4,5],
    //       acc: {
    //         x: [2, 5, 4, -1, 11].map(n => n + 2),
    //         y: [6, 2, 7, 6, 1].map(n => n + 2),
    //         z: [1, 3, 1, -5, 3].map(n => n + 2)
    //       },
    //       gyr: {
    //         x: [2, 5, 4, -1, 11].map(n => n + 2),
    //         y: [6, 2, 7, 6, 1].map(n => n + 2),
    //         z: [1, 3, 1, -5, 3].map(n => n + 2)
    //       }
    //     },
    //     knee: {
    //       t: [1,2,3,4,5],
    //       acc: {
    //         x: [2, 5, 4, -1, 11].map(n => n + 2),
    //         y: [6, 2, 7, 6, 1].map(n => n + 2),
    //         z: [1, 3, 1, -5, 3].map(n => n + 2)
    //       },
    //       gyr: {
    //         x: [2, 5, 4, -1, 11].map(n => n + 2),
    //         y: [6, 2, 7, 6, 1].map(n => n + 2),
    //         z: [1, 3, 1, -5, 3].map(n => n + 2)
    //       }
    //     }
    //   }
    // },
    graphVisibility: {
      leftAnkle: true,
      leftKnee: true,
      rightAnkle: true,
      rightKnee: true
    },
    graphOffsets: {
      left: 0,
      right: 0
    },
    bluetooth: {
      left: null,
      right: null
    }
  },
  mutations: {
    resetData(state) {
      for (const side of ["left", "right"]) {
        state.monitors[side].t = [];
        for (const location of ["ankle", "knee"]) {
          for (const comp of ["x", "y", "z"]) {
            state.monitors[side][location].acc[comp] = [];
            state.monitors[side][location].gyr[comp] = [];
          }
        }
      }
    },
    pushData(state, {side, time, location, data}) {
      state.monitors[side][location].t.push(time);
      for (const comp of ["x", "y", "z"]) {
        state.monitors[side][location].acc[comp].push(data.acc[comp]);
        state.monitors[side][location].gyr[comp].push(data.gyr[comp]);
      }
    },
    setGraphVisibility(state, {graph, visible}) {
      state.graphVisibility[graph] = visible;
    },
    setGraphOffset(state, {side, offset}) {
      state.graphOffsets[side] = offset;
    },
    setBluetooth(state, {side, bluetoothMonitorInstance}) {
      state.bluetooth[side] = bluetoothMonitorInstance;
    }
   },
  actions: {
    resetData({commit}) {
      commit("resetData");
    },
    pushData({commit}, commitData) {
      commit("pushData", commitData);
    },
    setGraphVisibility({commit}, commitData) {
      commit("setGraphVisibility", commitData);
    },
    setGraphOffset({commit}, commitData) {
      commit("setGraphOffset", commitData);
    },
    setBluetooth({commit}, commitData) {
      commit("setBluetooth", commitData);
    }
  }
});
