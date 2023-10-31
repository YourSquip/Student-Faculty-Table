import HomePage from './components/HomePage.vue'
import {createRouter, createWebHistory} from 'vue-router'
import AddPage from './components/AddPage.vue'
import UpdatePage from './components/UpdatePage.vue'
import FilterPage from './components/FilterPage.vue'

const routes=[
    {
        name:"Home",
        component: HomePage,
        path:"/"
    },
    {
        name:"Add",
        component: AddPage,
        path:"/add"
    },
    {
        name:"Update",
        component: UpdatePage,
        path:"/update/:id"
    },
    {
        name:"Filter",
        component: FilterPage,
        path: "/filter"

    }
];

const router  = createRouter({
    history:createWebHistory(),
    routes
});

export default router;