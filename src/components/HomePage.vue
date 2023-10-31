<template>
    <HomeHeader />
    <h1>Student List</h1>
    <h2>This app stores students and allows to add, update and delete students data </h2>
    <!-- <div class = "filter">
        <h2>Faculty filter</h2>
        <input v-model="student.faculty" name="faculty" placeholder="Enter Faculty">
        <h2>Group filter</h2>
        <input v-model="student.group" name="group" placeholder="Enter Group Number">
        
    </div> -->
    <!-- <button v-on:click="filterData(item.faculty,item.group)">Filter</button> -->
    <table border="1" >
        <tr>
            <td><strong>Surname</strong></td>
            <td><strong>Name</strong></td>
            <td><strong>Faculty</strong></td>
            <td><strong>Group</strong></td>
            <td><strong>Actions</strong></td>
        </tr>
        <tr v-for="item in students" :key="item.id" >

        <td>{{item.surname}}</td>
        <td>{{item.name}}</td>
        <td>{{item.faculty}}</td>
        <td>{{item.group}}</td>
        <td><router-link :to="'/update/'+item.id">Update</router-link>
            <button v-on:click="deleteStudent(item.id)">Delete</button>
        </td>
        </tr>
    </table>

</template>
<script setup>
import {ref, onMounted} from 'vue'
import { collection, getDocs, doc,deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase'

const students = ref([

])


onMounted(async () => {

    const querySnapshot = await getDocs(collection(db, "students"));
    let fbStudents = []
    querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    console.log(students.value)
    const student  = {
        id: doc.id,
        surname: doc.data().surname,
        name: doc.data().name,
        faculty: doc.data().faculty,
        group: doc.data().group
    }
    fbStudents.push(student)
})
students.value = fbStudents

});
</script>
<script >

import HomeHeader from './HomeHeader.vue'


export default{
    

    
    name:'HomePage',

    data(){
        return{
            name:'',
            student:[],
        }
    },
    components:{
        HomeHeader
    },
    async mounted(){
        this.loadData();

    },
    methods:{
        async deleteStudent(id){
            let result = await deleteDoc(doc(collection(db,'students'),id))
            console.warn(result)
            this.$router.go()
            //this.loadData()
            // let result = await axios.delete("http://localhost:3000/student/"+id);
            //console.warn(result)
            // if(result.status == 200){
            //     this.loadData()
            // }
        },
        async loadData(){
            let result = await getDocs(collection(db, "students"));
            console.warn(result);
            this.student = result.data;
            // let result = await axios.get("http://localhost:3000/student");
            // console.warn(result);
            // this.student = result.data;
        },
        
        
    }
    

};


    


</script>

<style>
td{
    width:160px;
    height:40px;
}
h2{
    font-size: 15px;
}
.filter{
    text-align: center;
}
/* button{
    width:10px;
    height:5px;
    font-size:20px
} */
</style>
