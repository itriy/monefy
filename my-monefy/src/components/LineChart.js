import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
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
          labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Аугуст', 'Сентябрь', 'Октябрь', 'Ноябрь','Декабрь'],
          datasets: [
            {
              label: 'Расход',
              backgroundColor: this.gradient,
              data: [40, 39, 10, 40, 39, 80, 40]
            },
          ]
        },{responsive: true, maintainAspectRatio: false})
    }
  }
}