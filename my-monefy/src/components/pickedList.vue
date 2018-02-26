<template>
  <div>
    {{valueCalc}}
    <pie-example :chart-data="PieChartData" :chart-labels="PieChartLabels"></pie-example>
  </div>
</template>



<script>
import PieExample from './PieChart'


export default {
  name: 'pickedList',
  components: { PieExample },
  data () {
    return {
       PieChartData: [],
       PieChartLabels: [],
    }
  },
  computed: {


    valueCalc(){
       this.PieChartLabels = this.$store.getters.pickedListCategory;
       this.PieChartData = this.$store.getters.pickedSumListToCategory;
    }

  },
  created(){
    // this.pickerOptions = {
    //   shortcuts: [{
    //               text: 'Last week',
    //               onClick(picker) {
    //                 const end = new Date();
    //                 const start = new Date();
    //                 start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    //                 picker.$emit('pick', [start, end]);
    //               }
    //             }, {
    //               text: 'Last month',
    //               onClick(picker) {
    //                 const end = new Date();
    //                 const start = new Date();
    //                 start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    //                 picker.$emit('pick', [start, end]);
    //               }
    //             }, {
    //               text: 'Last 3 months',
    //               onClick(picker) {
    //                 const end = new Date();
    //                 const start = new Date();
    //                 start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
    //                 picker.$emit('pick', [start, end]);
    //               }
    //             },{
    //               text: 'Last year',
    //               onClick(picker) {
    //                 const end = new Date();
    //                 const start = new Date();
    //                 start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
    //                 picker.$emit('pick', [start, end]);
    //               }
    //             }]
    // }
  }
}
</script>

<style scoped>
  .datapicker {
    margin: 20px auto;
    display: block;
    /*margin-bottom: 20px;*/
  }
</style>
