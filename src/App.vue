<template>
  <div id="app">
    <header>
      <h1>Music App v1.0</h1>
    </header>
    <main>

      <div class="player">
        <div :class="(isPlaying) ? 'circle' : 'circle_stop'" >
          <img :src="current.img" />
          <div class="second_circle">
          </div>
        </div>

        <div class="title_and_function">
          <img src="./assets/Vector2.png" @click="makerand=>{this.rand = !this.rand;}" :class="(this.rand) ? 'loop' : 'notloop'">
          <h2 class="song-title">{{ current.title }} <p>{{ current.artist }}</p></h2>
          <img src="./assets/Vector1.png" @click="makeloop=>{this.loop = !this.loop;}" :class="(this.loop) ? 'loop' : 'notloop'">
        </div>

        <div class="bar">
          <div class="loading-bar">
            <div class="percentage" :style="{'width' : this.percentage + '%'}"></div>
          </div>
        </div>

        <div class="time">
          {{this.showtime.toTimeString().split('').splice(3,5).join('')}}
        </div>

        <div class="controls">
          <img src="./assets/Prev.png" @click="prev">
          <img src="./assets/Play.png" v-if="!isPlaying" @click="play">
          <img src="./assets/Stop.png" v-else @click="pause">
          <img src="./assets/Next.png" @click="next">
        </div>

      </div>
      <div class="playlist">
        <button v-for="song in songs" :key="song.src" @click="reset(song)" :class="(song.src == current.src) ? 'song playing' : 'song'">
          {{ song.title }} - {{ song.artist }}
        </button>
      </div>
    </main>
  </div>
</template>


<script>
// import { db } from '../src/main'
export default {
  name: 'app',
  data () {
    return {
      current: {},
      index: 0,
      isPlaying: false,
      rand: false,
      loop: false,
      percentage: 0,
      sec: 0,
      min: 0,
      showtime: new Date(0,0,0,0),
      player: new Audio(),
      picture: new Image(),
      songs: [
        {
          id: 1,
          title: 'Bicyle Race',
          artist: 'Queen',
          src: require('./assets/Queen - Bicyle Race.mp3'),
          img: require('./assets/first.jpg')
        },
        {
          id: 2,
          title: 'Hammer To Fall',
          artist: 'Queen',
          src: require('./assets/Queen - Hammer To Fall.mp3'),
          img: require('./assets/second.jpg')
        },
        {
          id: 3,
          title: 'In The Lap Of The Gods',
          artist: 'Queen',
          src: require('./assets/Queen - In The Lap Of The Gods.mp3'),
          img: require('./assets/second.jpg')
        },
        {
          id: 4,
          title: 'Its A Hard Life',
          artist: 'Queen',
          src: require('./assets/Queen - Its A Hard Life.mp3'),
          img: require('./assets/first.jpg')
        },
        {
          id: 5,
          title: 'Let Me Live',
          artist: 'Queen',
          src: require('./assets/Queen - Let Me Live.mp3'),
          img: require('./assets/second.jpg')
        },
        {
          id: 6,
          title: 'Nevermore',
          artist: 'Queen',
          src: require('./assets/Queen - Nevermore.mp3'),
          img: require('./assets/second.jpg')
        },
        {
          id: 7,
          title: 'One Vision',
          artist: 'Queen',
          src: require('./assets/Queen - One Vision.mp3'),
          img: require('./assets/first.jpg')
        },
        {
          id: 8,
          title: 'Play The Game',
          artist: 'Queen',
          src: require('./assets/Queen - Play The Game.mp3'),
          img: require('./assets/second.jpg')
        },
        {
          id: 9,
          title: 'Somebody To Love',
          artist: 'Queen',
          src: require('./assets/Queen - Somebody To Love.mp3'),
          img: require('./assets/second.jpg')
        },
        {
          id: 10,
          title: 'Seven Seas Of Rhye',
          artist: 'Queen',
          src: require('./assets/Queen - Seven Seas Of Rhye.mp3'),
          img: require('./assets/first.jpg')
        },
        {
          id: 11,
          title: 'Stone Cold Crazy',
          artist: 'Queen',
          src: require('./assets/Queen - Stone Cold Crazy.mp3'),
          img: require('./assets/second.jpg')
        },
        {
          id: 12,
          title: 'Tie Your Mother Down',
          artist: 'Queen',
          src: require('./assets/Queen - Tie Your Mother Down.mp3'),
          img: require('./assets/second.jpg')
        }
      ]
    }
  },

 //  firestore () {
 //   return {
 //     locations: db.collection('locations')
 //   }
 // },
  components: {

 },
  methods: {
    reset(song){
      this.sec = this.min = this.percentage = 0;
      this.showtime.setMinutes(0, 0)
      this.play(song)
      this.index = this.current.id-1;
    },

    play (song) {
      if (typeof song.src != "undefined") {
        this.current = song;
        this.player.src = this.current.src;
        if (this.current.img == undefined) {
          this.current.img = require('./assets/no_image.png')
        }
      }

        clearInterval(this.timer);
        clearInterval(this.music_play);

        this.player.play();

        var audio = document.createElement('audio');
        audio.src = this.current.src;
        audio.addEventListener('loadedmetadata', function() {
        audio = audio.duration;
      });

        this.player.addEventListener('ended', function () {
        if (this.loop) {
          this.next();
          this.prev();
        }
        this.next();
      }.bind(this));

      this.isPlaying = true;

      this.timer = setInterval(() => {
        this.sec += 1
        if(this.sec%60 == 0)
        {
          this.min++
          this.sec = 0;
        }
        this.showtime.setMinutes(this.min, this.sec);
      }, 1000)

      this.music_play = setInterval(() => {
        if(this.percentage < 100){
          this.percentage += 100/audio;
        }
          else
          clearInterval(this.music_play);
      }, 1000);
    },

    pause () {
      this.player.pause();
      this.isPlaying = false;
      clearInterval(this.timer);
      clearInterval(this.music_play);
    },

    next () {
      this.sec = this.min = this.percentage = 0;
      this.showtime.setMinutes(0, 0)
      clearInterval(this.timer);
      clearInterval(this.music_play);
      var timesong = this.index;

      if (!this.loop && !this.rand)
        this.index++;

      if ((this.loop && !this.rand) || (this.loop && this.rand))
        this.index

      if(this.rand && !this.loop){
        while (timesong == this.index) {
          this.index = Math.floor(Math.random() * (Math.floor(this.songs.length-1) - Math.ceil(0) + 1)) + Math.ceil(0)
        }
      }

      if (this.index > this.songs.length - 1) {
        this.index = 0;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
    },

    prev () {
      this.showtime.setMinutes(0, 0)
      this.sec = this.min = this.percentage = 0;
      clearInterval(this.timer);
      clearInterval(this.music_play);
      this.index--;
      if (this.index < 0) {
        this.index = this.songs.length - 1;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
    }
  },

  created () {
    this.current = this.songs[this.index];
    this.player.src = this.current.src;
    if (this.current.img == undefined) {
      this.current.img = require('./assets/no_image.png')
    }
  },
}
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
  font-family: 'Roboto';
}
body {
	font-family: sans-serif;
  background-color: gray;
}
header {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px;
	color: #FFF;
}
main {
  width: 100%;
  max-width: 50%;
  margin: 0 auto;
  padding: 25px;
  display: flex;
  flex-direction: row-reverse;
}

.player{
  background-color: #FFF3F3;
  height: auto;
}

.circle{
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  animation-name: rotation;
  animation-duration: 15s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.circle_stop{
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  animation-name: not_rotation;
  animation-duration: 15s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.circle>img, .circle_stop>img{
  border-radius: 50%;
  width: 250px;
  height: 250px;
  border: 4px solid black;
}

@keyframes rotation {
    100% {
        transform:rotate(360deg);
    }
}

@keyframes not_rotation {
    100% {
        transform:rotate(0deg);
    }
}

.second_circle{
  position: absolute;
  width: 35px;
  height: 35px;
  background-color: black;
  border: 1px solid white;
  border-radius: 50%;
}

.song-title {
  color: black;
  font-size: 32px;
  font-weight: 700;
  margin-top: 30px;
  text-transform: uppercase;
  text-align: center;
}

.title_and_function{
  display: flex;
  justify-content:center;
}

.title_and_function>img{
  margin-top: 6%;
  width: 50px;
  height: 50px;
  margin: 6% 8% 0 8%;
}

.time{
  display: flex;
  justify-content: center;
  color: black;
  font-size: 16pt;
  margin-top: 10px;
}

.container {
  text-align: right;
  font-size: 8rem;
  color: #555;
}

.bar{
  display: flex;
  justify-content: center;
}

.loading-bar {
  position: relative;
  width: 500px;
  margin: 20px 20px 0 20px;
  height: 15px;
  background-color: black;
}

.percentage {
  height: 100%;
  background-color: orange;
}

.title_and_function>img:hover{
  border: 2px solid black;
  cursor: pointer;
}

.loop{
  border: 2px solid black;
}

.notloop{
  border:none;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 15px;
}

.controls>img{
  height: 70px;
  width: 70px;
  margin: 0 7%;
}

.controls>img:hover{
  cursor: pointer;
  background-color: orange;
  border-radius: 50%;
}

button {
  appearance: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
}

.next, .prev {
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  margin: 0px 15px;
  border-radius: 6px;
  color: #FFF;
  background-color: #FF5858;
}

.playlist {
  padding: 0px 20px;
  background-color: #FFFFFF;
  overflow: hidden;
  height: 650px;
}

.playlist:hover {
  overflow: auto;
}

::-webkit-scrollbar { width: 3px; height: 3px;}
::-webkit-scrollbar-track-piece { background-color: #ffffff;}
::-webkit-scrollbar-thumb { height: 50px; background-color: #C9C2C2; border-radius: 3px;}

.playlist .song {
  display: block;
  width: 100%;
  padding: 15px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  background-color: #E8A7A7;
}

.song:nth-child(1){
  margin-top: 30px;
}

.song:nth-last-child(1){
  margin-bottom: 30px;
}

.song:hover{
  opacity: 0.8;
  color: #FFF;
}

.playlist .song.playing {
  color: #FFF;
}
</style>
