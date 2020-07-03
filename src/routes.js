import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home'
import Player from './views/Player'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '', component: Home },
        { path: '/player', component: Player }
    ]
})