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
  /*margin-top: 60px;*/
}
</style>
