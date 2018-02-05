<template>
  <div class="hello">
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="Pick a day">
    </el-date-picker><el-button type="primary">Default</el-button> 
    <p>{{value1}}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
       value1: ''
    }
  }
}
</script>

<style scoped>

</style>
