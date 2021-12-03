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
      window.monitor = monitor;
      this.$store.dispatch("setBluetooth", {
        side,
        bluetoothMonitorInstance: monitor
      });
      await monitor.connect();
      monitor.on("newValue", e => {
        const dv = e.target.value;
        const decoder = new TextDecoder("ascii");
        const text = decoder.decode(new Uint8Array(dv.buffer));
        const data = text.split(",").map(n => parseInt(n));
        this.$store.dispatch("pushData", {
          side,
          time: (Date.now() - this.$store.state.t0) / 1000,
          location: "ankle", // dv.getUint8(0) == 0 ? "ankle" : "knee",
          data: {
            // acc: {
            //   x: dv.getInt16(1),
            //   y: dv.getInt16(3),
            //   z: dv.getInt16(5)
            // },
            // gyr: {
            //   x: dv.getInt16(7),
            //   y: dv.getInt16(9),
            //   z: dv.getInt16(11)
            // }
            acc: {
              x: (data[3] < 2 ** 15) ? data[3] : -(2 ** 16 - data[3]),
              y: (data[4] < 2 ** 15) ? data[4] : -(2 ** 16 - data[4]),
              z: (data[5] < 2 ** 15) ? data[5] : -(2 ** 16 - data[5])
            },
            gyr: {
              x: (data[0] < 2 ** 15) ? data[0] : -(2 ** 16 - data[0]),
              y: (data[1] < 2 ** 15) ? data[1] : -(2 ** 16 - data[1]),
              z: (data[2] < 2 ** 15) ? data[2] : -(2 ** 16 - data[2])
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
