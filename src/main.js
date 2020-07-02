import Vue from 'vue'
import App from './App.vue'

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

new Vue({
  render: h => h(App),
}).$mount('#app')
