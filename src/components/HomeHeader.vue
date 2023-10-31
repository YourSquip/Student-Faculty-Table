<template>
    
<div class = "nav"> 
<router-link to="/">Home</router-link>
<router-link to="/add">Add Student</router-link>
<router-link to="/filter">Filter</router-link>
<!-- <router-link to="/update">Update</router-link> -->
    <!-- <a href="#">Delete</a> -->
</div>
</template>

<script>
export default{
    name:'HomeHeader',
   
}
</script>
<style>
.nav{
    background-color:rgb(61, 215, 215);
    overflow: hidden;
}
 
.nav a{
  float:left;
  color:rgb(92, 122, 122);
  padding:14px 16px;
  text-align: center;
  font-size: 17px;
  text-decoration: none;
  margin-right: 30px;

}

.nav a:hover{

    background: rgb(92, 147, 147);
    color:rgb(65, 209, 209);
}
</style>