import Vue from 'vue'
import App from './App.vue'
import { router } from './routes'

//Здесь я подключаю плагин работы с БД для, возможно, дальнейшей взаимодействия с бэкэндом
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(firestorePlugin)
firebase.initializeApp({
  databaseURL: "https://musics-ee148.firebaseio.com",
  projectId: "musics-ee148",
})
export const db = firebase.firestore()
// console.log(db);

//Здесь я инициализирую свое приложение
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
