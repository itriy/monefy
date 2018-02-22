<template>
  <div>
      <el-date-picker
        v-model="year"
        type="year"
        class="datapicker"
        value-format="yyyy"
        placeholder="Pick a year">
      </el-date-picker>
 
    {{valueCalc}}
    <line-example :chart-data="LineChartData" :chart-labels="LineChartLabels"></line-example>
  </div>
</template>
<script>
  import LineExample from './LineChart'

  export default {
    name: 'yearChart',
    components: { LineExample },
    data () {
      return {
         year: '2018',
         LineChartData: [],
         LineChartLabels: [],
      }
    },
    computed: {
      valueCalc(){

         // this.year = new Date();

         this.LineChartData = this.$store.getters.pickedSumToYear(this.year);
      }
    }
  }
</script>
<style scoped>
  .datapicker {
    margin: 20px auto;
    display: block;
    /*margin: 20px;*/
  }
</style>