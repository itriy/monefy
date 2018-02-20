import { Bar, mixins } from 'vue-chartjs'

export default {
  extends: Bar,
  data(){
    return {
      gradient: null,
      gradient2: null
    }
  },
  props: ['chartData','chartLabels'],
  watch: {
    chartData: function(newValue, oldValue){
       if(newValue != oldValue) this.myRender()
    }
  },
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    
    this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');

    this.myRender();
  },
  methods: {
    myRender() {
        if (this.$data._chart) {
            console.log('destroy')
            this.$data._chart.destroy();
        }

        this.renderChart({
          labels: this.chartLabels,
          datasets: [
            {
              label: 'Расход',
              borderColor: '#FC2525',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: 'white',
              backgroundColor: this.gradient,
              data: this.chartData[1]
            },{
              label: 'Доход',
              borderColor: '#05CBE1',
              pointBackgroundColor: 'white',
              pointBorderColor: 'white',
              borderWidth: 1,
              backgroundColor: this.gradient2,
              data: this.chartData[0]
            }
          ]
        },{responsive: true, maintainAspectRatio: false})
    }
  }
}