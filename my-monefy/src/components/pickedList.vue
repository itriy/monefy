<template>
  <v-layout row wrap>
    <v-flex xs12 sm6>
      {{valueCalc}}
      {{value}}
      <!-- <pie-example :chart-data="PieChartData" :chart-labels="PieChartLabels"></pie-example> -->
    </v-flex>
  </v-layout>
</template>



<script>
import PieExample from './PieChart'


export default {
  name: 'pickedList',
  components: { PieExample },
  data () {
    return {
       // value: '',
       // value2: '',
       PieChartData: [],
       PieChartLabels: [],
       pickerOptions: {},
    }
  },
  props: ['value'],

  // mounted() {
  //   // this.$store.dispatch('getList');
  // },
  computed: {

    pickedList: {
      get(){
        return this.$store.getters.pickedList
      },
      set(val){
        this.$store.dispatch('getPickedList',val);
      }
    },
    valueCalc(){
       // this.$store.dispatch('getPickedList',this.value);

       this.PieChartLabels = this.$store.getters.pickedListCategory;
       this.PieChartData = this.$store.getters.pickedSumListToCategory;

       console.log(this.value)
       // console.log(this.value2)

       // this.year = new Date();

       // this.LineChartData = this.$store.getters.pickedSumToYear(this.year);

       // this.LineChartLabels = this.$store.getters.pickedDateList;
       // this.LineChartData = this.$store.getters.pickedIncomeOutgoList;

      // console.log('PieChartLabels',this.PieChartLabels)
      // console.log('PieChartData',this.PieChartData)

      // console.log('LineChartLabels',this.LineChartLabels)
      // console.log('LineChartData',this.LineChartData)
    }

  },
  created(){
    this.pickerOptions = {
      shortcuts: [{
                  text: 'Last week',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: 'Last month',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: 'Last 3 months',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                  }
                },{
                  text: 'Last year',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                    picker.$emit('pick', [start, end]);
                  }
                }]
    }
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
