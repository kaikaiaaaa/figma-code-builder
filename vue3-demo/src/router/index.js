import {createRouter, createWebHistory} from "vue-router";
import routes from './routes.js'

const router = createRouter({
    history: createWebHistory(),  //mode:"history"
    routes,
})
export default router
