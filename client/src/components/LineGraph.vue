<script>
import {Line, mixins} from "vue-chartjs";
const {reactiveProp} = mixins;

export default {
  name: "LineGraph",
  extends: Line,
  mixins: [reactiveProp],
  props: {
    title: String
  },
  mounted() {
    this.renderChart(this.chartData, {
      responsive: true,
      showLine: true,
      scales: {
        xAxes: [{
          type: "linear",
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Time (s)"
          }
        }],
        yAxes: [{
          type: "linear",
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Raw"
          }
        }]
      },
      title: {
        display: true,
        text: this.$props.title
      },
      maintainAspectRatio: false,
      animation: false
    });
  }
}
</script>
