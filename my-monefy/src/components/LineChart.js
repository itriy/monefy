import { Pie, mixins } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['chartData','chartLabels'],
  // mixins: [mixins.reactiveData],
  watch: {
    chartData: function(newValue, oldValue){
        // console.log('newValue',newValue)
        // console.log('oldValue',oldValue)
       if(newValue != oldValue) this.myRender()

        // console.log('chart',this.chartData)
    }
  },
  mounted () {
    this.myRender();
  },
  methods: {
    myRender() {
        this.renderChart({
          labels: this.chartLabels,
          datasets: [
            {
              // label: ['#FC2525','#05CBE1','#FC2525','#05CBE1','#FC2525','#05CBE1','#FC2525'],
              backgroundColor: ['#FF25A5','#05CBE1','#AC2525','#050BE1','#FC2525','#95CBE1','#1C2525'],
              data: this.chartData,
            }
          ]
        },{responsive: true, maintainAspectRatio: false})

        // console.log('chart',this.chartData)
    }
  }
}