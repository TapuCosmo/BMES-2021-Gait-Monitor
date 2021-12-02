<template>
  <div>
    <div class="sensor-graph">
      <LineGraph class="graph" :chart-data="ankleAccGraphData" title="Accelerometer (Ankle)"/>
      <LineGraph class="graph" :chart-data="ankleGyrGraphData" title="Gyroscope (Ankle)"/>
    </div>
    <div class="sensor-graph">
      <LineGraph class="graph" :chart-data="kneeAccGraphData" title="Accelerometer (Knee)"/>
      <LineGraph class="graph" :chart-data="kneeGyrGraphData" title="Gyroscope (Knee)"/>
    </div>
  </div>
</template>

<script>
import LineGraph from "@/components/LineGraph";

export default {
  name: "SensorGraph",
  components: {
    LineGraph
  },
  props: {
    leftAnkleData: Object,
    leftKneeData: Object,
    rightAnkleData: Object,
    rightKneeData: Object,
  },
  computed: {
    ankleAccGraphData() {
      return {
        datasets: [
          {
            label: "x (Left)",
            fill: null,
            borderColor: "#ff0000",
            data: this.$props.leftAnkleData.acc.x.map((d, i) => ({x: this.$props.leftAnkleData.t[i] + this.leftGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.leftAnkle
          },
          {
            label: "y (Left)",
            fill: null,
            borderColor: "#00ff00",
            data: this.$props.leftAnkleData.acc.y.map((d, i) => ({x: this.$props.leftAnkleData.t[i] + this.leftGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.leftAnkle
          },
          {
            label: "z (Left)",
            fill: null,
            borderColor: "#0000ff",
            data: this.$props.leftAnkleData.acc.z.map((d, i) => ({x: this.$props.leftAnkleData.t[i] + this.leftGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.leftAnkle
          },
          {
            label: "x (Right)",
            fill: null,
            borderColor: "#ff9999",
            data: this.$props.rightAnkleData.acc.x.map((d, i) => ({x: this.$props.rightAnkleData.t[i] + this.rightGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.rightAnkle
          },
          {
            label: "y (Right)",
            fill: null,
            borderColor: "#99ff99",
            data: this.$props.rightAnkleData.acc.y.map((d, i) => ({x: this.$props.rightAnkleData.t[i] + this.rightGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.rightAnkle
          },
          {
            label: "z (Right)",
            fill: null,
            borderColor: "#9999ff",
            data: this.$props.rightAnkleData.acc.z.map((d, i) => ({x: this.$props.rightAnkleData.t[i] + this.rightGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.rightAnkle
          }
        ]
      };
    },
    ankleGyrGraphData() {
      return {
        datasets: [
          {
            label: "x (Left)",
            fill: null,
            borderColor: "#ff0000",
            data: this.$props.leftAnkleData.gyr.x.map((d, i) => ({x: this.$props.leftAnkleData.t[i] + this.leftGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.leftAnkle
          },
          {
            label: "y (Left)",
            fill: null,
            borderColor: "#00ff00",
            data: this.$props.leftAnkleData.gyr.y.map((d, i) => ({x: this.$props.leftAnkleData.t[i] + this.leftGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.leftAnkle
          },
          {
            label: "z (Left)",
            fill: null,
            borderColor: "#0000ff",
            data: this.$props.leftAnkleData.gyr.z.map((d, i) => ({x: this.$props.leftAnkleData.t[i] + this.leftGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.leftAnkle
          },
          {
            label: "x (Right)",
            fill: null,
            borderColor: "#ff9999",
            data: this.$props.rightAnkleData.gyr.x.map((d, i) => ({x: this.$props.rightAnkleData.t[i] + this.rightGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.rightAnkle
          },
          {
            label: "y (Right)",
            fill: null,
            borderColor: "#99ff99",
            data: this.$props.rightAnkleData.gyr.y.map((d, i) => ({x: this.$props.rightAnkleData.t[i] + this.rightGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.rightAnkle
          },
          {
            label: "z (Right)",
            fill: null,
            borderColor: "#9999ff",
            data: this.$props.rightAnkleData.gyr.z.map((d, i) => ({x: this.$props.rightAnkleData.t[i] + this.rightGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.rightAnkle
          }
        ]
      };
    },
    kneeAccGraphData() {
      return {
        datasets: [
          {
            label: "x (Left)",
            fill: null,
            borderColor: "#ff0000",
            data: this.$props.leftKneeData.acc.x.map((d, i) => ({x: this.$props.leftKneeData.t[i] + this.leftGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.leftKnee
          },
          {
            label: "y (Left)",
            fill: null,
            borderColor: "#00ff00",
            data: this.$props.leftKneeData.acc.y.map((d, i) => ({x: this.$props.leftKneeData.t[i] + this.leftGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.leftKnee
          },
          {
            label: "z (Left)",
            fill: null,
            borderColor: "#0000ff",
            data: this.$props.leftKneeData.acc.z.map((d, i) => ({x: this.$props.leftKneeData.t[i] + this.leftGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.leftKnee
          },
          {
            label: "x (Right)",
            fill: null,
            borderColor: "#ff9999",
            data: this.$props.rightKneeData.acc.x.map((d, i) => ({x: this.$props.rightKneeData.t[i] + this.rightGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.rightKnee
          },
          {
            label: "y (Right)",
            fill: null,
            borderColor: "#99ff99",
            data: this.$props.rightKneeData.acc.y.map((d, i) => ({x: this.$props.rightKneeData.t[i] + this.rightGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.rightKnee
          },
          {
            label: "z (Right)",
            fill: null,
            borderColor: "#9999ff",
            data: this.$props.rightKneeData.acc.z.map((d, i) => ({x: this.$props.rightKneeData.t[i] + this.rightGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.rightKnee
          }
        ]
      };
    },
    kneeGyrGraphData() {
      return {
        datasets: [
          {
            label: "x (Left)",
            fill: null,
            borderColor: "#ff0000",
            data: this.$props.leftKneeData.gyr.x.map((d, i) => ({x: this.$props.leftKneeData.t[i] + this.leftGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.leftKnee
          },
          {
            label: "y (Left)",
            fill: null,
            borderColor: "#00ff00",
            data: this.$props.leftAnkleData.gyr.y.map((d, i) => ({x: this.$props.leftKneeData.t[i] + this.leftGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.leftKnee
          },
          {
            label: "z (Left)",
            fill: null,
            borderColor: "#0000ff",
            data: this.$props.leftAnkleData.gyr.z.map((d, i) => ({x: this.$props.leftKneeData.t[i] + this.leftGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.leftKnee
          },
          {
            label: "x (Right)",
            fill: null,
            borderColor: "#ff9999",
            data: this.$props.rightAnkleData.gyr.x.map((d, i) => ({x: this.$props.rightKneeData.t[i] + this.rightGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.rightKnee
          },
          {
            label: "y (Right)",
            fill: null,
            borderColor: "#99ff99",
            data: this.$props.rightAnkleData.gyr.y.map((d, i) => ({x: this.$props.rightKneeData.t[i] + this.rightGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.rightKnee
          },
          {
            label: "z (Right)",
            fill: null,
            borderColor: "#9999ff",
            data: this.$props.rightAnkleData.gyr.z.map((d, i) => ({x: this.$props.rightKneeData.t[i] + this.rightGraphOffset, y: d})),
            hidden: !this.$store.state.graphVisibility.rightKnee
          }
        ]
      };
    },
    leftGraphOffset() {
      return this.$store.state.graphOffsets.left;
    },
    rightGraphOffset() {
      return this.$store.state.graphOffsets.right;
    }
  }
}
</script>

<style scoped lang="scss">
.sensor-graph {
  height: 40vh;
  width: 98vw;
}
.graph {
  display: inline-block;
  width: 50%;
  height: 100%;
}
</style>
