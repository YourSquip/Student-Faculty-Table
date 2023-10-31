<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app{
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  text-align: center; 
}
body{
  padding: 0;
  margin:0;
}

.add input{
  width:300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom:30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
}

.add button{
  width:320px;
  height:40px;
  border:1px solid skyblue;
  background: skyblue;
  color:#fff;
  cursor:pointer
}

select{
  width:320px;
  height: 50px;
  padding-left: 20px;
  display: block;
  margin-bottom:30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
}

</style>