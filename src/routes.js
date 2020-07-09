import Vue from 'vue'
import VueRouter from 'vue-router'

//Подключаю мои маршруты (домашняя страница и страница плеера)
import Home from './views/Home'
import Player from './views/Player'

Vue.use(VueRouter)

//Здесь я указываю компоненты маршрутов и их отображение в браузерной строке (mode: 'history')
export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '', component: Home },
        { path: '/player', component: Player }
    ]
})

//Создаю хук для перемещения из раздела плеера на домашнюю страницу
router.afterEach((to, from) => {
    if (from.path == '/player') {
        //При переходе с играющего плеера на домашнюю страницу музыка продолжает играть, поэтому я обновляю страницу только (!) 1 раз, когда попадаю на домашнюю страницую.
        (function () {
            if (window.localStorage) {
                if (!localStorage.getItem('firstLoad')) {
                    localStorage['firstLoad'] = true;
                    window.location.reload();
                }
                //Чтобы обновить текущую страницу (домашнюю) только (!) 1 раз, я использую технологию LocalStorage, чтобы не было зацикливания обновлений текущей страницы (костыль)
                else
                    localStorage.removeItem('firstLoad');
                    window.location.reload();
            }
        })();
    } 
});
