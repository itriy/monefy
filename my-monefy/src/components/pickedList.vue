<template>
  <div>
    <el-date-picker
      class="datapicker"
      v-model="value"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      :picker-options="pickerOptions"
      end-placeholder="End date">
    </el-date-picker>

      {{valueCalc}}
      <div id="chartdiv" style="width: 100%; height: 400px;"></div>
      <!-- <pie-example :chart-data="PieChartData" :chart-labels="PieChartLabels"></pie-example> -->

        <el-collapse accordion>
          <el-collapse-item title="Table" name="1">
            <el-table
              :data="pickedList"
              stripe
              border
              style="width: 100%">
              <el-table-column
                prop="account"
                label="Account"
                sortable
                width="120">
              </el-table-column>
              <el-table-column
                prop="category"
                sortable
                label="Category">
              </el-table-column>
              <el-table-column
                prop="converted amount"
                label="Amount"
                sortable
                width="100">
              </el-table-column>

            </el-table>
          </el-collapse-item>
        </el-collapse>

  </div>
</template>

<script>


export default {
  name: 'pickedList',
  data () {
    return {

       // PieChartData: [],
       // PieChartLabels: [],
       pickerOptions: {},
       fp: null
    }
  },
  // created () {
  //   AmCharts.makeChart("chartdiv",
  //     {
  //       "type": "serial",
  //       "categoryField": "type",
  //       "chartCursor": {},
  //       "graphs": [
  //         {
  //           "type": "column",
  //           "title": "Pizza types",
  //           "valueField": "sold",
  //           "fillAlphas": 0.8
  //         }
  //       ],

  //       "dataProvider": [
  //         { "type": "Margherita", "sold": 120 },
  //         { "type": "Funghi", "sold": 82 },
  //         { "type": "Capricciosa", "sold": 78 },
  //         { "type": "Quattro Stagioni", "sold": 71 }
  //       ]
  //     }
  //   );
  // },
  mounted() {
    // this.$store.dispatch('getList');
    this.initChart();
  },
  computed: {

    value: {
      get(){
        return this.$store.getters.dateValue
      },
      set(val){
        this.$store.dispatch('setDateValue', val)
      }
    },
    pickedList (){
      return this.$store.getters.pickedList
    },
    valueCalc(){
       // this.$store.dispatch('getPickedList',this.value);

       console.log(this.pickedList)

       // this.PieChartLabels = this.$store.getters.pickedListCategory;
       // this.PieChartData = this.$store.getters.pickedSumListToCategory;

       // this.year = new Date();

       // this.LineChartData = this.$store.getters.pickedSumToYear(this.year);

       // this.LineChartLabels = this.$store.getters.pickedDateList;
       // this.LineChartData = this.$store.getters.pickedIncomeOutgoList;
    }

  },
  watch: {
    pickedList(val, old) {
      if(val != old) this.initChart()
    }
  },
  created(){
    // this.initChart(); 

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

  },
  methods: {
    initChart(){

      this.fp = AmCharts.makeChart( "chartdiv", {
        "type": "pie",
        "dataProvider": this.pickedList,
        "valueField": "converted amount",
        "titleField": "category",
         "balloon":{
         "fixedPosition":true
        }
      } );
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
  #chartdiv {
    width: 100%;
    height: 500px;
  }
</style>
