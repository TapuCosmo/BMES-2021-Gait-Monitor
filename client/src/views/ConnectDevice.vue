<template>
  <div>
    <h1>Connect Devices</h1>
    <button class="connect-device-button" @click="connectDevice('left')">Connect Left Leg</button>
    <button class="connect-device-button" @click="connectDevice('right')">Connect Right Leg</button>
  </div>
</template>

<script>
import {BluetoothGaitMonitor, requestDevice} from "@/bluetooth.js";

export default {
  name: "ConnectDevice",
  methods: {
    async connectDevice(side) {
      const device = await requestDevice();
      const monitor = new BluetoothGaitMonitor(device);
      this.$store.dispatch("setBluetooth", {
        side,
        bluetoothMonitorInstance: monitor
      });
      monitor.on("newValue", e => {
        const dv = e.target.value;
        this.$store.dispatch("pushData", {
          side,
          time: Date.now() / 1000,
          location: dv.getUint8(0) == 0 ? "ankle" : "knee",
          data: {
            acc: {
              x: dv.getFloat32(1),
              y: dv.getFloat32(5),
              z: dv.getFloat32(9)
            },
            gyr: {
              x: dv.getFloat32(13),
              y: dv.getFloat32(17),
              z: dv.getFloat32(21)
            }
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.connect-device-button {
  margin-left: 4px;
  margin-right: 4px;
}
</style>
