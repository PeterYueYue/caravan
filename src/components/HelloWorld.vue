<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <h2 class="test1">Essential Links</h2>
    <div class="div1"></div>
   
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style lang='less'>
@rem:100rem;
    .test1{
      font-size: 18/@rem;
    }
    .div1{
      width: 100/@rem;
      height: 100/@rem;
      background-color: red;
    }

</style>


