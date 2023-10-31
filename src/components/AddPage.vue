<template>
    <HomeHeader />
    <h1>Add new Student</h1>
    <form class = "add">
        <input type="text" surname="surname" placeholder="Enter Surname" v-model="student.surname"/>
        <input type="text" name="name" placeholder="Enter Name" v-model="student.name"/>
        <select v-model="student.faculty">Enter faculty
            <option v-for="item in students" :key="item.id">{{item.faculty}}</option>
        </select>
        <!-- <input type="text" name="faculty" placeholder="Enter Faculty" v-model="student.faculty"/> -->
        <input type="number" name="group" placeholder="Enter Group Number" v-model="student.group"/>
   <button type="button" v-on:click="addStudent">Add new Student</button>
   </form>
</template>

<script setup>
    //import {ref, onMounted} from 'vue'
    import {ref, onMounted} from 'vue'
    import { collection, getDocs } from 'firebase/firestore';
    import { addDoc} from 'firebase/firestore';
    import {db} from '@/firebase'
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
    //students.value = uniqFacs
    });
</script>

<script>
import HomeHeader from './HomeHeader.vue'

export default{
    name:'AddPage',
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
        async addStudent()
        {
            const result = addDoc(collection(db,'students'),{
                surname:this.student.surname,
                name:this.student.name,
                faculty:this.student.faculty,
                group:this.student.group
            });
            this.$router.push({name:'Home'});
            // if(result.status==201){
                
            // }
            // console.warn(this.student)
            // const result = ()=>{
            //     await addDoc(collection(db,''))
            // }
            // const result = await axios.post("http://localhost:3000/student",{
            //     surname:this.student.surname,
            //     name:this.student.name,
            //     faculty:this.student.faculty,
            //     group:this.student.group
            // });
            // if(result.status==201){
            //     this.$router.push({name:'Home'});
            // }
            console.warn("result",result)
        }
    }
}
</script>

