<template>
  <div>
    <h1>Export Data</h1>
    <button @click="exportCSV">Export CSV</button>
  </div>
</template>

<script>
export default {
  name: "ExportData",
  methods: {
    exportCSV() {
      const headerRow = ["time", "monitor", "accX", "accY", "accZ", "gyrX", "gyrY", "gyrZ"].join(",");
      const csvRows = [headerRow];
      for (const side of ["left", "right"]) {
        const monitor = this.$store.state.monitors[side];
        for (let i = 0; i < monitor.t.length; i++) {
          csvRows.push([
            monitor.t[i],
            side,
            monitor.acc.x[i],
            monitor.acc.y[i],
            monitor.acc.z[i],
            monitor.gyr.x[i],
            monitor.gyr.y[i],
            monitor.gyr.z[i]
          ].join(","));
        }
      }
      const csv = `${csvRows.join("\n")}`;
      const blob = new Blob([csv], {
        type: "text/csv"
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `gaitData-${Date.now()}`;
      a.click();
      URL.revokeObjectURL(a.href)
    }
  }
};
</script>
