<template>
  <div>
    <div>
      <span class="offset-control">
        Left Leg Time Offset (s): <input type="number" v-model.number="leftOffset">
      </span>
      <span class="offset-control">
        Right Leg Time Offset (s): <input type="number" v-model.number="rightOffset">
      </span>
    </div>
    <div>
      <span>
        Graph Visibility:
      </span>
      <span class="visibility-control">
        Left Ankle: <input type="checkbox" v-model="leftAnkleGraphVisible">
      </span>
      <span class="visibility-control">
        Left Knee: <input type="checkbox" v-model="leftKneeGraphVisible">
      </span>
      <span class="visibility-control">
        Right Ankle: <input type="checkbox" v-model="rightAnkleGraphVisible">
      </span>
      <span class="visibility-control">
        Right Knee: <input type="checkbox" v-model="rightKneeGraphVisible">
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Controls",
  computed: {
    leftOffset: {
      get() {
        return this.$store.state.graphOffsets.left;
      },
      set(val) {
        this.$store.dispatch("setGraphOffset", {
          side: "left",
          offset: val
        });
        return val;
      }
    },
    rightOffset: {
      get() {
        return this.$store.state.graphOffsets.right;
      },
      set(val) {
        this.$store.dispatch("setGraphOffset", {
          side: "right",
          offset: val
        });
        return val;
      }
    },
    leftAnkleGraphVisible: {
      get() {
        return this.$store.state.graphVisibility.leftAnkle;
      },
      set(val) {
        this.$store.dispatch("setGraphVisibility", {
          graph: "leftAnkle",
          visible: !!val
        });
        return !!val;
      }
    },
    leftKneeGraphVisible: {
      get() {
        return this.$store.state.graphVisibility.leftKnee;
      },
      set(val) {
        this.$store.dispatch("setGraphVisibility", {
          graph: "leftKnee",
          visible: !!val
        });
        return !!val;
      }
    },
    rightAnkleGraphVisible: {
      get() {
        return this.$store.state.graphVisibility.rightAnkle;
      },
      set(val) {
        this.$store.dispatch("setGraphVisibility", {
          graph: "rightAnkle",
          visible: !!val
        });
        return !!val;
      }
    },
    rightKneeGraphVisible: {
      get() {
        return this.$store.state.graphVisibility.rightKnee;
      },
      set(val) {
        this.$store.dispatch("setGraphVisibility", {
          graph: "rightKnee",
          visible: !!val
        });
        return !!val;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.offset-control {
  margin-left: 8px;
  margin-right: 8px;
}
.visibility-control {
  margin-left: 4px;
  margin-right: 4px;
}
</style>
