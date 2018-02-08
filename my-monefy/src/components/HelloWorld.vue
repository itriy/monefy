<template>
  <div>
    <el-date-picker
      class="datapicker"
      v-model="value"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date">
    </el-date-picker>
    <el-table
      :data="listFilter"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="account"
        label="Account"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="category"
        sortable
        label="Category">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="Amount"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="currency"
        label="Currency"
        width="100">
      </el-table-column>
    </el-table>


    <line-example :chart-data="chartData" :chart-labels="chartLabels"></line-example>

  </div>
</template>

<script>
import axios from 'axios';
// import VueCharts from 'vue-chartjs'
// import { Pie } from 'vue-chartjs'
import LineExample from './LineChart'


export default {
  name: 'HelloWorld',
  components: { LineExample },
  data () {
    return {
       value: '',
       list: [],
       listFilter: [],
       chartData: [],
       chartLabels: []
    }
  },
  mounted() {
    this.loadData();
  },
  watch: {
    value: function() {

      // this.listFilter = (!this.value) ? [] : this.list.filter((elem) => {
      //   return this.formatDate(elem.date) >= +this.value[0] && this.formatDate(elem.date) <= +this.value[1]
      // })

      if (!this.value) return this.listFilter = [];

      this.listFilter = this.list.filter((elem) => {
        return this.formatDate(elem.date) >= +this.value[0] && this.formatDate(elem.date) <= +this.value[1]
      });
    },

    listFilter: function(){

        this.chartData = [];
        this.chartLabels = [];

        if(!this.listFilter) return false;

      this.listFilter.forEach((elem) => {
        if(this.formatAmount(elem.amount) < 0) {
          this.sortLables(elem.category)
        }
      });

      this.chartLabels.forEach((cat) => {
        this.categoryAmountSum(cat)
      });

      console.log('chartData',this.chartData)
      console.log('chartLabels',this.chartLabels)

    }
  },
  methods: {
    loadData() {
      this.loading = true;
        axios.get('/static/db.json')
          .then(response => response.data)
          .then((response) => {
            this.list = response;
            this.loading = false;
        });
    },

    sortLables(elem) {
      if(this.chartLabels.indexOf(elem) === -1 && elem.indexOf('To') && elem.indexOf('From')) this.chartLabels.push(elem)
    },

    categoryAmountSum(cat){
      let catArr = this.listFilter.filter((elem) => {
        return elem.category == cat
      })
      let result = catArr.reduce((sum, current) => {
        return sum + this.formatAmount(current.amount);
      }, 0)

      this.chartData.push(Math.abs(result));
    },

    formatAmount(val){
      let amount = val.split(' ');
      return parseInt(amount.join(''));
    },

    formatDate(value) {
      var arr = value.split('/')
      var date = +new Date(arr[2], arr[1]-1, arr[0]);

      return date;
    },

  },
}
</script>

<style scoped>
  .datapicker {
    margin: auto;
    display: block;
    margin-bottom: 20px;
  }
</style>
