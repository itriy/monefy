<template>
  <div>
    <p>{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
    <el-date-picker
      class="datapicker"
      v-model="value"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      :picker-options="pickerOptions"
      end-placeholder="End date">
    </el-date-picker>
    <line-example :chart-data="chartData" :chart-labels="chartLabels"></line-example>
    <el-table
      :data="pickedList"
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


  </div>
</template>

<script>
import axios from 'axios';
import LineExample from './LineChart'


export default {
  name: 'HelloWorld',
  components: { LineExample },
  data () {
    return {
       value: '',
       // list: [],
       // pickedList: [],
       chartData: [],
       chartLabels: [],
       pickerOptions: {},
    }
  },
  mounted() {
    // this.loadData();
    this.$store.dispatch('getList')
  },
  computed: {
    count () {
      return this.$store.state.count
    },

    pickedList: {
      get(){
        return this.$store.state.pickedList
      },
      set(value){
        this.$store.state.commit('pick-list',value)
      }
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
  },
  watch: {
    value() {
        this.$store.commit('pick-list',this.value)
    },

    // pickedList: function(){

    //     this.chartData = [];
    //     this.chartLabels = [];

    //     if(!this.pickedList) return false;

    //   this.pickedList.forEach((elem) => {
    //     if(this.formatAmount(elem.amount) < 0) {
    //       this.sortLables(elem.category)
    //     }
    //   });

    //   this.chartLabels.forEach((cat) => {
    //     this.categoryAmountSum(cat)
    //   });

    //   console.log('chartData',this.chartData)
    //   console.log('chartLabels',this.chartLabels)

    // }
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

    increment () {
      this.$store.commit('increment')
    },
    decrement () {
      this.$store.commit('decrement')
    },

    sortLables(elem) {
      if(this.chartLabels.indexOf(elem) === -1 && elem.indexOf('To') && elem.indexOf('From')) this.chartLabels.push(elem)
    },

    categoryAmountSum(cat){
      let catArr = this.pickedList.filter((elem) => {
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
