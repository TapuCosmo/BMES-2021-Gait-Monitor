<template>
  <div class="home">
    <SensorGraph
      :leftAnkleData="$store.state.monitors.left.ankle"
      :leftKneeData="$store.state.monitors.left.knee"
      :rightAnkleData="$store.state.monitors.right.ankle"
      :rightKneeData="$store.state.monitors.right.knee"
    />
    <Controls/>
  </div>
</template>

<script>
import Controls from "@/components/Controls";
import SensorGraph from "@/components/SensorGraph";

export default {
  name: "Graphs",
  components: {
    Controls,
    SensorGraph
  }
};
</script>
