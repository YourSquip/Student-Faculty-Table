<template>
    <HomeHeader />
    <h1>Filter Students by Faculty and Group</h1>
    <form class = "filter">
        <input type="text" 
        name="faculty" 
        placeholder="Enter Faculty" 
        v-model="searchFaculty"
        class="faculty-search-input"/>
        <input type="text"
         name="group" 
         placeholder="Enter Group Number" 
         v-model="searchGroup"
         class="group-search-input"/>
   <button type="button" v-on:click="filterStud">Filter</button>
   </form>
   <tr>
            <td>Surname</td>
            <td>Name</td>
            <td>Faculty</td>
            <td>Group</td>

    </tr>
    <div class = "student-container">
        <div v-for="item in filtStud" :key="item.id">
            <td>{{item.surname}}</td>
            <td>{{item.name}}</td>
            <td>{{item.faculty}}</td>
            <td>{{item.group}}</td>
         </div>
    </div>
   
</template>
<script setup>
import HomeHeader from './HomeHeader.vue'
import {ref, onMounted} from 'vue'
import { collection, getDocs} from 'firebase/firestore';
import { db } from '@/firebase'

let searchFaculty;
let searchGroup;

const students = ref([

])
const filtStud = ref([

])
function filterStud(){
    filtStud.value = []

    let studArr = []
    students.value.forEach((item)=>{
        //console.warn("!!!!!!!!!!!!!")
        if(searchFaculty == undefined|| item.faculty.toLowerCase().includes(searchFaculty.toLowerCase() )){
            
            if(item.group == searchGroup || searchGroup == undefined){
                //studArr.push(item)
                filtStud.value.push(item)
                console.warn("!!!!!!!!!!!!!")
            }
        }

        //console.warn(item)
    })
    //console.(filtStud.value)
    //filtStud.value = studArr
    // const querySnapshot = getDocs(collection(db, "students"));
    //         let fbStudents = []
    //         querySnapshot.forEach((doc) => {
    //         console.log(doc.id, " => ", doc.data());
    //         console.log(students.value)
    //          const student  = {
    //         id: doc.id,
    //         surname: doc.data().surname,
    //         name: doc.data().name,
    //         faculty: doc.data().faculty,
    //         group: doc.data().group
    //         }
    //         fbStudents.push(student)
    //         })
    //         filtStud.value = fbStudents
            //console.log("HERE"+ students.value)
    //console.warn(students.value)

    //return students.value;
}

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
            console.log("HERE"+ students.value)
            //studList = fbStudents
});
</script>
<script>


export default{
    name:'FilterPage',
    data(){
        return{
            student:{
                surname:'',
                name:'',
                faculty:'',
                group:''
            }
        }
    },
    components:{
        HomeHeader
    },
    async mounted(){
        this.loadData();
    },
    computed:{
        filteredStudents(){
            return this.students
        },
        studentList(){
        
            return this.students;

        }
            
         
    },
    methods:{
        async filterStudents(){
            console.warn(this.searchFaculty)
            console.warn(this.searchGroup)
            console.warn(this.students)
        },
        async loadData(){

            let result = await getDocs(collection(db, "students"));
            //console.warn(result.data);
            this.student = result.data;
            // let result = await getDocs(collection(db, "students"));
            // console.warn(result);
            // this.student = result.data;
        }
    }
}
</script>
