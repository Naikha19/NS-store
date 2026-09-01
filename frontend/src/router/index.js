import {createRouter, createWebHistory} from "vue-router"
import Login from "../components/Login.vue"
import Signup from "../components/Signup.vue"
import Dashboard from "../components/Dashboard.vue"

export const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path:"/",
            redirect: "/login"
        },
        {
            path: "/login",
            component: Login
        },
        {
            path:"/signup",
            component:Signup
        },
        {
            path: "/dashboard",
            component:Dashboard
        }
    ]
})