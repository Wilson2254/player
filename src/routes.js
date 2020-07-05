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
    ],
    props: true
})

router.afterEach((to, from) => {
    if (from.path == "/player") {
        (function () {
            if (window.localStorage) {
                if (!localStorage.getItem('firstLoad')) {
                    localStorage['firstLoad'] = true;
                    window.location.reload();
                }
                else
                    localStorage.removeItem('firstLoad');
                    window.location.reload();
            }
        })();
    } 
});
