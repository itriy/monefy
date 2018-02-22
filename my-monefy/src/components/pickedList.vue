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

      <pie-example :chart-data="PieChartData" :chart-labels="PieChartLabels"></pie-example>

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
import PieExample from './PieChart'


export default {
  name: 'pickedList',
  components: { PieExample },
  data () {
    return {
       value: '',
       PieChartData: [],
       PieChartLabels: [],
       pickerOptions: {},
    }
  },
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
       this.$store.dispatch('getPickedList',this.value);

       this.PieChartLabels = this.$store.getters.pickedListCategory;
       this.PieChartData = this.$store.getters.pickedSumListToCategory;

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
