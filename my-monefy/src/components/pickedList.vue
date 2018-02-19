<template>
  <div>
<!--     <p>
      <router-link to="/">main</router-link>
      <router-link to="/test">test</router-link>
    </p> -->
    
 <!-- <p>{{$route.params.id}}</p> -->
    <el-date-picker
      class="datapicker"
      v-model="value"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      :picker-options="pickerOptions"
      end-placeholder="End date">
    </el-date-picker>
    <el-row>
      <el-col :span="24">
        <el-menu :default-active="activeIndex" router mode="horizontal">
          <el-menu-item index="/">Pie</el-menu-item>
          <el-menu-item index="/line">Line</el-menu-item>
        </el-menu>
        
          <pie-example  v-if="$route.params.id !== 'line'" :chart-data="PieChartData" :chart-labels="PieChartLabels"></pie-example>

          <line-example  v-if="$route.params.id === 'line'" :chart-data="PieChartData" :chart-labels="PieChartLabels"></line-example>

      </el-col>
      <el-col :span="24">
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
                width="100">
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
                width="100">
              </el-table-column>
              <el-table-column
                prop="currency"
                label="Currency"
                width="100">
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import LineExample from './LineChart'
import PieExample from './PieChart'


export default {
  name: 'pickedList',
  components: { LineExample, PieExample },
  data () {
    return {
       value: '',
       PieChartData: [],
       PieChartLabels: [],
       pickerOptions: {},
       activeIndex: '/'
    }
  },
  mounted() {
    this.$store.dispatch('getList');
  },
  computed: {

    // activeIndex(){
    //   this.activeIndex = this.$route.params.id ? $route.params.id : '/'
    // },

    pickedList: {
      get(){
        return this.$store.state.pickedList
      },
      set(val){
        this.$store.dispatch('getPickedList',val);
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

          this.$store.dispatch('getPickedList',this.value);

          this.PieChartData = [];
          this.PieChartLabels = [];

          if(!this.pickedList) return false;

          this.pickedList.forEach((elem) => {
            if(this.formatAmount(elem.amount) < 0) {
              this.sortLables(elem.category)
            }
          });

          this.PieChartLabels.forEach((cat) => {
            this.categoryAmountSum(cat)
          });

          console.log('PieChartData',this.PieChartData)
          console.log('PieChartLabels',this.PieChartLabels)
    },
  },
  methods: {

    sortLables(elem) {
      if(this.PieChartLabels.indexOf(elem) === -1 && elem.indexOf('To') && elem.indexOf('From')) this.PieChartLabels.push(elem)
    },

    categoryAmountSum(cat){
      let catArr = this.pickedList.filter((elem) => {
        return elem.category == cat
      })
      let result = catArr.reduce((sum, current) => {
        return sum + this.formatAmount(current.amount);
      }, 0)

      this.PieChartData.push(Math.abs(result));
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
