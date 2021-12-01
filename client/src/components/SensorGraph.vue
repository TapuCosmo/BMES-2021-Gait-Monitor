<template>
  <div class="sensor-graph">
    <LineGraph class="graph" :chart-data="accGraphData" title="Accelerometer"/>
    <LineGraph class="graph" :chart-data="gyrGraphData" title="Gyroscope"/>
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
    accData: Object,
    gyrData: Object
  },
  computed: {
    accGraphData() {
      return {
        datasets: [
          {
            label: "x",
            fill: null,
            borderColor: "#ff0000",
            data: this.$props.accData.x
          },
          {
            label: "y",
            fill: null,
            borderColor: "#00ff00",
            data: this.$props.accData.y
          },
          {
            label: "z",
            fill: null,
            borderColor: "#0000ff",
            data: this.$props.accData.z
          }
        ]
      };
    },
    gyrGraphData() {
      return {
        datasets: [
          {
            label: "x",
            fill: null,
            borderColor: "#ff0000",
            data: this.$props.gyrData.x
          },
          {
            label: "y",
            fill: null,
            borderColor: "#00ff00",
            data: this.$props.gyrData.y
          },
          {
            label: "z",
            fill: null,
            borderColor: "#0000ff",
            data: this.$props.gyrData.z
          }
        ]
      };
    }
  }
}
</script>

<style scoped lang="scss">
.sensor-graph {
  height: 45vh;
  width: 98vw;
}
.graph {
  display: inline-block;
  width: 50%;
}
</style>
