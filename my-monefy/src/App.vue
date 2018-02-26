<template>
  <v-app
    id="inspire"
  >
    <v-navigation-drawer
      fixed
      clipped
      v-model="drawer"
      app
    >
      <v-layout row wrap align-center>
          <v-flex xs10 offset-xs1>
            <v-btn v-for="btn in btns" :key="btn.title" @click="setDateValue()" block widht="90%" :color="btn.color" dark large>{{btn.title}}</v-btn>
         </v-flex>
         <v-flex xs10 offset-xs1>
           <v-date-picker
             mode='range'
             v-model='selectedDate'
             show-caps>
           </v-date-picker>
         </v-flex>
      </v-layout>
    </v-navigation-drawer>
    {{valueCalc}}
    <v-toolbar
      color="red"
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
              <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
export default {
  name: 'App',
  props: [],
  data() {
    return {
      // activeIndex: '/pie'
      selectedDate: {
        start: new Date(2018, 0, 9),
        end: new Date(2018, 0, 18)
      },
      btns: [
        {
          title: 'год',
          type: 'year',
          color: 'error'
        },
        {
          title: 'месяц',
          type: 'month',
          color: 'blue-grey'
        },
        {
          title: 'день',
          type: 'day',
          color: 'success'
        }
      ],
      drawer: true,
    };
  },
  computed: {
    activeIndex(){
      return this.$route.params.id || '/';
    },
    valueCalc() {
      this.$store.dispatch('getPickedList',this.selectedDate);
    },
    pickedList: {
      get(){
        return this.$store.getters.pickedList
      },
      set(val){
        this.$store.dispatch('getPickedList',val);
      }
    },
  },

  methods: {
    setDateValue(type){
      // this.type = type;
      
    }
  }
}
</script>

<style>
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
  }
  .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }
/*  .Chart {
    background: #212733;
    border-radius: 15px;
    box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
    margin:  25px 0;
  }

  .Chart h2 {
    margin-top: 0;
    padding: 15px 0;
    color:  rgba(255, 0,0, 0.5);
    border-bottom: 1px solid #323d54;
  }*/
</style>
