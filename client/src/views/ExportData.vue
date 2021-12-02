<template>
  <div>
    <h1>Export Data</h1>
    <button @click="exportCSV">Export CSV</button>
    <h1>Import Data</h1>
    <button @click="importCSV">Import CSV</button>
  </div>
</template>

<script>
export default {
  name: "ExportData",
  methods: {
    exportCSV() {
      const headerRow = ["time", "side", "location", "accX", "accY", "accZ", "gyrX", "gyrY", "gyrZ"].join(",");
      const csvRows = [headerRow];
      for (const side of ["left", "right"]) {
        for (const location of ["ankle", "knee"]) {
          const readings = this.$store.state.monitors[side][location];
          for (let i = 0; i < readings.t.length; i++) {
            csvRows.push([
              readings.t[i],
              side,
              location,
              readings.acc.x[i],
              readings.acc.y[i],
              readings.acc.z[i],
              readings.gyr.x[i],
              readings.gyr.y[i],
              readings.gyr.z[i]
            ].join(","));
          }
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
      URL.revokeObjectURL(a.href);
    },
    importCSV() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "text/csv";
      input.onchange = e => {
        try {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.readAsText(file, "UTF-8");
          reader.onload = re => {
            const result = re.target.result;
            this.$store.dispatch("resetData");
            // Ignore header row
            const rows = result.split("\n").slice(1);
            for (const row of rows) {
              const elems = row.split(",");
              if (elems.length !== 9) {
                throw new Error("Incorrect data format");
              }
              this.$store.dispatch("pushData", {
                time: parseFloat(elems[0]),
                side: elems[1],
                location: elems[2],
                data: {
                  acc: {
                    x: parseFloat(elems[3]),
                    y: parseFloat(elems[4]),
                    z: parseFloat(elems[5])
                  },
                  gyr: {
                    x: parseFloat(elems[6]),
                    y: parseFloat(elems[7]),
                    z: parseFloat(elems[8])
                  }
                }
              });
            }
          };
        } catch (err) {
          console.error(err);
        }
      };
      input.click();
    }
  }
};
</script>
