<template>
  <div class="home">
    <SensorGraph :accData="accData" :gyrData="gyrData"/>
    <SensorGraph :accData="accData" :gyrData="gyrData"/>
  </div>
</template>

<script>
import SensorGraph from "@/components/SensorGraph";

export default {
  name: "Graphs",
  components: {
    SensorGraph
  },
  data() {
    return {
      accData: {
        x: [{x: 1, y: 2}, {x: 2, y: 5}, {x: 3, y: 4}, {x: 4, y: -1}, {x: 5, y: 11}],
        y: [{x: 1, y: 6}, {x: 2, y: 2}, {x: 3, y: 7}, {x: 4, y: 6}, {x: 5, y: 1}],
        z: [{x: 1, y: 1}, {x: 2, y: 3}, {x: 3, y: 1}, {x: 4, y: -5}, {x: 5, y: 3}]
      },
      gyrData: {
        x: [{x: 1, y: 2}, {x: 2, y: 5}, {x: 3, y: 4}, {x: 4, y: -1}, {x: 5, y: 11}],
        y: [{x: 1, y: 6}, {x: 2, y: 2}, {x: 3, y: 7}, {x: 4, y: 6}, {x: 5, y: 1}],
        z: [{x: 1, y: 1}, {x: 2, y: 3}, {x: 3, y: 1}, {x: 4, y: -5}, {x: 5, y: 3}]
      }
    };
  }
};
</script>
