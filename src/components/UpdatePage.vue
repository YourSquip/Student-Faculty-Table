<template>
    <HomeHeader />
    <h1>Update Student Info</h1>
    <form class = "add">
        <input type="text" surname="surname" placeholder="Enter Surname" v-model="student.surname"/>
        <input type="text" name="name" placeholder="Enter Name" v-model="student.name"/>
        <select  v-model="student.faculty">Enter faculty
            <option v-for="item in students" :key="item.id">{{item.faculty}}</option>
        </select>
        <input type="number" group="group" placeholder="Enter Group Number" v-model="student.group"/>
   <button type="button" v-on:click="updateStudent">Update Student Info</button>
   </form>
</template>
<script setup>
    //import {ref, onMounted} from 'vue'
    import {ref, onMounted} from 'vue'
    import { collection, getDocs } from 'firebase/firestore';
    //import { addDoc} from 'firebase/firestore';
    //import {db} from '@/firebase'
    const students = ref([

    ])
    onMounted(async () => {

    const querySnapshot = await getDocs(collection(db, "students"));
    let fbStudents = []
    let uniqFacs = []
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
    if(!uniqFacs.includes(student.faculty)){
        uniqFacs.push(student.faculty)
        fbStudents.push(student)
    }
    })
    students.value = fbStudents

    });
</script>
<script>
//import { assertExportDefaultSpecifier } from '@babel/types'
//import {ref, onMounted} from 'vue'
import {  getDoc, setDoc,doc} from 'firebase/firestore';
import { db } from '@/firebase'
import HomeHeader from './HomeHeader.vue'
//import axios from 'axios'
export default{
    name:'UpdatePage',
    components:{
        HomeHeader
    },
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
    methods:{
        async updateStudent(){
            console.warn(this.student)
            //const result = await setDoc(collection(db,'students'),{
            const result = await setDoc(doc(db,'students',this.$route.params.id),{
                surname:this.student.surname,
                name:this.student.name,
                faculty:this.student.faculty,
                group:this.student.group
            });
            // const result = await axios.put("http://localhost:3000/student/"+this.$route.params.id,{
            //     surname:this.student.surname,
            //     name:this.student.name,
            //     faculty:this.student.faculty,
            //     group:this.student.group
            // });
            // if(result.status==200){
            //     this.$router.push({name:'Home'});
            // }
            this.$router.push({name:'Home'});
            console.warn("result",result)
        }
    },
    async mounted(){
        console.warn(this.$route.params.id)
        const docRef = await doc(db,'students',this.$route.params.id)
        const result = await getDoc(docRef)
        //const result = await getDocs(collection(db, "students"),this.$route.params.id);
        //const result = await axios.get("http://localhost:3000/student/"+this.$route.params.id)
        console.log(result)
        console.warn(result.data())
        this.student = result.data()
    }
}
</script>
