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
       chartData: [],
       chartLabels: [],
       pickerOptions: {},
    }
  },
  mounted() {
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
      set(val){
        this.$store.state.commit('pick-list',val)
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
        this.$store.commit('pick-list',this.value);

          this.chartData = [];
          this.chartLabels = [];

          if(!this.pickedList) return false;

          this.pickedList.forEach((elem) => {
            if(this.formatAmount(elem.amount) < 0) {
              this.sortLables(elem.category)
            }
          });

          this.chartLabels.forEach((cat) => {
            this.categoryAmountSum(cat)
          });

          console.log('chartData',this.chartData)
          console.log('chartLabels',this.chartLabels)
    },
  },
  methods: {

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
    }

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
