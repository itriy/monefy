<template>
  <div id="app">
<!--     <el-menu :default-active="activeIndex" class="el-menu-demo" router mode="horizontal">
      <el-menu-item index="/">Main</el-menu-item>
      <el-menu-item index="info">Info</el-menu-item>
    </el-menu> -->
<!--     <div>
      <router-link to="/">Main</router-link>
      <router-link to="/info">Info</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // activeIndex: '/pie'
    };
  },
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
