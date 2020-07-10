<template>
  <div id="mus">
    <!-- Это стилистическая часть, эти пустые блоки мне нужны для красивого отображения заднего движущегося заднего фона в стиле RetroWave -->
    <div class="backgr">
      <div class="container">
        <div class="sky"></div>
        <div class="container">
          <div class="grid"></div>
        </div>
      </div>
    </div>
    <header>
      <h1>Music App v1.0</h1>
    </header>
    <main>
      <!-- В текущем блоке будет находится 2 основных блока - плеер (отображение пластинки, трека, автора, панели управления) -->
      <div class="player">
        <!-- Здесь я отображаю крутящуюся пластинку. Ее вращение зависит от булевого значения, если false, то она стоит на месте (класс circle_stop), иначе  крутится (класс circle) -->
        <div :class="(isPlaying) ? 'circle' : 'circle_stop'">
          <!-- Также я подгружаю изображение (обложку) трека который сейчас играет) -->
          <img :src="current.img" />
          <!-- Дырка в пластинке -->
          <div class="second_circle"></div>
        </div>

        <!-- В этом блоке я отображаю текущий трек (название и исполнитель), а также здесь можно работать с порядком проигрывания треков (цикл и случайный следующий трек) -->
        <div class="title_and_function">
          <!-- Здесь идет отображение состояния случайности треков, при клике я меняю состояние (случайно или нет), а также отображаю класс в зависимости от значения rand -->
          <!-- По существу здесь появляются рамки, которые показывают, выбрана ли данная опция или нет (класс loop и notloop одинаков для этих двух кнопок - создание и удаление рамки)-->
          <img
            src="../assets/Vector2.png"
            @click="makerand=>{this.rand = !this.rand;}"
            :class="(this.rand) ? 'loop' : 'notloop'"
          />
          <!-- Здесь я отображаю название трека и исполнителя, который проигрывается в данный момент -->
          <h2 class="song-title">
            {{ current.title }}
            <p>{{ current.artist }}</p>
          </h2>
          <!-- Здесь идет отображение состояния повтора трека, при клике я меняю состояние (повторять или нет), а также отображаю класс в зависимости от значения loop -->
          <img
            src="../assets/Vector1.png"
            @click="makeloop=>{this.loop = !this.loop;}"
            :class="(this.loop) ? 'loop' : 'notloop'"
          />

        </div>
        <!-- В этом блоке я отображаю полосу времени проигрывания трека -->
        <div class="bar">
          <div class="loading-bar">
            <!-- Я увеличиваю каждую секунду процент от продолжительности трека и отображаю это в стиле -->
            <div class="percentage" :style="{'width' : this.percentage + '%'}"></div>
          </div>
        </div>

        <!-- Здесь я отображаю таймер времени трека и применяю небольшой фильтр, чтобы время показывалось в формате мм:сс -->
        <div class="time">{{this.showtime.toTimeString().split('').splice(3,5).join('')}}</div>

        <!-- Здесь располагаются кнопки контроля, которые запускают фукнции переключения треков, паузы и остановки -->
        <div class="controls">
          <img src="../assets/Prev.png" @click="prev" />
          <img src="../assets/Play.png" v-if="!isPlaying" @click="play" />
          <!-- Если трек играет, то оборжается кнопка паузы, иначе кнопка проигрывания -->
          <img src="../assets/Stop.png" v-else @click="pause" />
          <img src="../assets/Next.png" @click="next" />
        </div>
      </div>

      <!-- Здесь находится блок со всеми треками -->
      <div class="playlist">
        <p>
          <!-- Поле для поиска трека по названию -->
          <input type="text" v-model="search" placeholder="Type the song's title..." />
        </p>
        <!-- Здесь циклом отображаются все доступные треки (их название и исполнитель) в виде кнопок. При нажатии на трек начинается его проигрывание -->
        <!-- Также здесь заданы стили для проигрывающего трека и для непроигрывающих, чтобы было видно какой трек выбран -->
        <button
          v-for="song in todosByTitle"
          :key="song.src"
          @click="reset(song)"
          :class="(song.src == current.src) ? 'song playing' : 'song'"
        >{{ song.title }} - {{ song.artist }}</button>
      </div>
    </main>
  </div>
</template>


<script>
// import { db } from '../src/main'
export default {
  // Название моего блока в котором я работаю
  name: "mus",
  data() {
    return {
      // Текущий трек (объект со свойствами)
      current: {},
      // Индекс для навигации по трекам
      index: 0,
      // Переменная для отображения состояния проигрывания (играет или нет)
      isPlaying: false,
      // Переменная для отображения состояния проигрывания (следующий трек случайный или по порядку)
      rand: false,
      // Переменная для отображения состояния проигрывания (по завершению потворять этот же трек)
      loop: false,
      // Переменная для увелчиения полосы времени трека
      percentage: 0,
      // Переменные для показа секунд и минут трека
      sec: 0,
      min: 0,
      // Переменная для отображения времени в формате дд:чч:мм::сс (в выводе я обрезаю ее до мм:сс)
      showtime: new Date(0, 0, 0, 0),
      // Объект класса аудио для проигрывания
      player: new Audio(),
      // Объект класса изображения для отображения
      picture: new Image(),
      // Переменная поиска трека (использование вычисляемых свойств)
      search: "",
      // Объект со всеми доступными треками
      songs: [
        // У трека есть несколько свойств, все они обязательны, кроме последнего. Если у трека нет изображения, это поле можно не указывать
        {
          id: 1,
          title: "Hammer To Fall",
          artist: "Queen",
          src: require("@/assets/Queen - Hammer To Fall/Queen - Hammer To Fall.mp3"),
          img: require("@/assets/Queen - Hammer To Fall/hammer-to-fall.jpg")
        },
        {
          id: 2,
          title: "Bicyle Race",
          artist: "Queen",
          src: require("@/assets/Queen - Bicyle Race/Queen - Bicyle Race.mp3"),
          img: require("@/assets/Queen - Bicyle Race/bicycle-race.jpg")
        },
        {
          id: 3,
          title: "In The Lap Of The Gods",
          artist: "Queen",
          src: require("@/assets/Queen - In The Lap Of The Gods/Queen - In The Lap Of The Gods.mp3"),
          img: require("@/assets/Queen - In The Lap Of The Gods/in-the-lap-of-the-gods.jpg")
        },
        {
          id: 4,
          title: "Its A Hard Life",
          artist: "Queen",
          src: require("@/assets/Queen - Its A Hard Life/Queen - Its A Hard Life.mp3"),
          img: require("@/assets/Queen - Its A Hard Life/hard-life.jpg")
        },
        {
          id: 5,
          title: "Let Me Live",
          artist: "Queen",
          src: require("@/assets/Queen - Let Me Live/Queen - Let Me Live.mp3"),
          img: require("@/assets/Queen - Let Me Live/let-me-live.jpg")
        },
        {
          id: 6,
          title: "Nevermore",
          artist: "Queen",
          src: require("@/assets/Queen - Nevermore/Queen - Nevermore.mp3")
        },
        {
          id: 7,
          title: "One Vision",
          artist: "Queen",
          src: require("@/assets/Queen - One Vision/Queen - One Vision.mp3"),
          img: require("@/assets/Queen - One Vision/one-vision.jpg")
        },
        {
          id: 8,
          title: "Play The Game",
          artist: "Queen",
          src: require("@/assets/Queen - Play The Game/Queen - Play The Game.mp3"),
          img: require("@/assets/Queen - Play The Game/queen-play_the_game.jpg")
        },
        {
          id: 9,
          title: "Somebody To Love",
          artist: "Queen",
          src: require("@/assets/Queen - Somebody To Love/Queen - Somebody To Love.mp3"),
          img: require("@/assets/Queen - Somebody To Love/somebody-to-love.jpg")
        },
        {
          id: 10,
          title: "Seven Seas Of Rhye",
          artist: "Queen",
          src: require("@/assets/Queen - Seven Seas Of Rhye/Queen - Seven Seas Of Rhye.mp3"),
          img: require("@/assets/Queen - Seven Seas Of Rhye/queen-seven-seas-of-rhye.jpg")
        },
        {
          id: 11,
          title: "Stone Cold Crazy",
          artist: "Queen",
          src: require("@/assets/Queen - Stone Cold Crazy/Queen - Stone Cold Crazy.mp3")
        },
        {
          id: 12,
          title: "Tie Your Mother Down",
          artist: "Queen",
          src: require("@/assets/Queen - Tie Your Mother Down/Queen - Tie Your Mother Down.mp3"),
          img: require("@/assets/Queen - Tie Your Mother Down/queen-tie_your_mother_down.jpg")
        }
      ]
    };
  },

  //  firestore () {
  //   return {
  //     locations: db.collection('locations')
  //   }
  // },

  // Здесь я использую вызываемые методы и функции
  methods: {
    // Эта функция вызывается когда я кликаю на трек в блоке плей листах. 
    //По факту это функция нужна только для блока плей листа и очистки времени.
    reset(song) {
      // Обнуляем все что связано с отображением времени
      this.sec = this.min = this.percentage = 0;
      this.showtime.setMinutes(0, 0);
      this.play(song);
      this.index = this.current.id - 1;
    },

    // Эта функция выставляет на проигрывание трек
    play(song) {
      // Проверяем существование трека
      if (typeof song.src != "undefined") {
        this.current = song;
        // Добавляем его в переменную для проигрывания
        this.player.src = this.current.src;
        // Если у трека нет изображения то выводим особое изображение
        if (this.current.img == undefined) {
          this.current.img = require("@/assets/no_image.png");
        }
      }

      // Очищаем таймеры музыки и полосы
      clearInterval(this.timer);
      clearInterval(this.music_play);

      // Проигрываем трек
      this.player.play();

      // Здесь я достаю продолжительность текущего трека, чтобы можно было вработать с таймерами музыки и полосы
      var audio = document.createElement("audio");
      audio.src = this.current.src;
      audio.addEventListener("loadedmetadata", function() {
        audio = audio.duration;
      });

      // Здесь я дожидаюсь окончания проигрывания трека
      this.player.addEventListener(
        "ended",
        function() {
          // Проверяю на цикличность, если цикл, то повтор этого же трека, иначе проигрываю следующий
          if (this.loop) {
            this.next().prev();
          } else this.next();
        }.bind(this) // Этот бинд я использую, чтобы производилось прослушивание окончания каждого трека
      );

      // Состояние трека: проигрывается
      this.isPlaying = true;

      // Здесь я показываю таймер трека, где увеличваю значение на 1 каждую секунду, как только кол-во секунд равно 60, то я обнуляю их и инкреминтирую минуту
      this.timer = setInterval(() => {
        this.sec += 1;
        if (this.sec % 60 == 0) {
          this.min++;
          this.sec = 0;
        }
        this.showtime.setMinutes(this.min, this.sec);
      }, 1000);

      // В этом таймере я каждую секунду увеличваю полосу проигрывания трека на процент от его продолжительности
      this.music_play = setInterval(() => {
        if (this.percentage < 100) {
          this.percentage += 100 / audio;
        } else clearInterval(this.music_play);
      }, 1000);
    },

    // Здесь вызывается метод паузы, где я останавливаю трек, меняю состояние проигрывани и остананвливаю таймеры
    pause() {
      this.player.pause();
      this.isPlaying = false;
      clearInterval(this.timer);
      clearInterval(this.music_play);
    },

    // Здесь начинается следующий трек. Я обновляю время, таймеры а также запоминаю текущий индекс, чтобы при случайном переключении треков не попасть на этот же, а также циклю трек
    next() {
      this.sec = this.min = this.percentage = 0;
      this.showtime.setMinutes(0, 0);
      clearInterval(this.timer);
      clearInterval(this.music_play);
      // Запоминаю переменную для случайного переключения
      var timesong = this.index;

      // Если ничего не выбрано, то следующий трек
      if (!this.loop && !this.rand) this.index++;

      // Если цикл включен, то не трогаю индекс
      if ((this.loop && !this.rand) || (this.loop && this.rand)) this.index;

      // Если выбрано случайное переключение, то случайно рандомлю следующий трек и при это не попадаю на текущий
      if (this.rand && !this.loop) {
        while (timesong == this.index) {
          this.index =
            Math.floor(
              Math.random() *
                (Math.floor(this.songs.length - 1) - Math.ceil(0) + 1)
            ) + Math.ceil(0);
        }
      }

      // Здесь указывается условие попадания на первый трек, если следующего трека нет
      if (this.index > this.songs.length - 1) {
        this.index = 0;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
    },

    // Метод для проигрывания предыдущего трека
    prev() {
      this.showtime.setMinutes(0, 0);
      this.sec = this.min = this.percentage = 0;
      clearInterval(this.timer);
      clearInterval(this.music_play);
      // Здесь указывается условие попадания на последний трек, если предыдущего трека нет
      this.index--;
      if (this.index < 0) {
        this.index = this.songs.length - 1;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
    }
  },

  // Здесь я добавляю хук жизненного цикла экземпляра player. При его инициализации в экземпляр записывается первый трек и все его параметры (изображение, id и т.д.)
  created() {
    this.current = this.songs[this.index];
    this.player.src = this.current.src;
    // Если у трека нет изображения то выводим особое изображение
    if (this.current.img == undefined) {
      this.current.img = require("@/assets/no_image.png");
    }
  },
  //Здесь я подключаю вычисляемое свойство, которое сразу же показывает изменения при вводе в мой input (Поиск треков)
  computed: {
    todosByTitle() {
      //По массиву songs я ищу я возвращаю значения, которые ввожу в input. Обязательное условие - результат показывается только при указывании треков с маленькой буквы
      return this.songs.filter(
        item => item.title.toLowerCase().indexOf(this.search) !== -1
      );
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto";
  position: relative;
  /* text-align: center; */
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
  color: #fff;
}
header > h1 {
  margin-top: 130px;
}
main {
  width: 100%;
  margin: 0 auto;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
}

.player {
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
  height: 650px;
}

.circle {
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

.circle_stop {
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

.circle > img,
.circle_stop > img {
  border-radius: 50%;
  width: 250px;
  height: 250px;
  border: 4px solid black;
}

@keyframes rotation {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes not_rotation {
  100% {
    transform: rotate(0deg);
  }
}

.second_circle {
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
  text-align: center;
}

.title_and_function {
  display: flex;
  justify-content: center;
}

.title_and_function > img {
  margin-top: 6%;
  width: 50px;
  height: 50px;
  margin: 6% 8% 0 8%;
}

.time {
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

.bar {
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

.title_and_function > img:hover {
  border: 2px solid black;
  cursor: pointer;
}

.loop {
  border: 2px solid black;
}

.notloop {
  border: none;
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 15px;
}

.controls > img {
  height: 70px;
  width: 70px;
  margin: 0 7%;
}

.controls > img:hover {
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

.next,
.prev {
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  margin: 0px 15px;
  border-radius: 6px;
  color: #fff;
  background-color: #ff5858;
}

.playlist {
  padding: 0px 20px;
  background-image: linear-gradient(
    to top,
    #fdcbf1 0%,
    #fdcbf1 1%,
    #e6dee9 100%
  );
  overflow: hidden;
  height: 650px;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
::-webkit-scrollbar-track-piece {
  background-color: #ffffff;
}
::-webkit-scrollbar-thumb {
  height: 50px;
  background-color: #c9c2c2;
  border-radius: 3px;
}

.playlist .song {
  display: block;
  width: 100%;
  padding: 15px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  background-color: #e8a7a7;
}

.song:nth-child(1) {
  margin-top: 30px;
}

.song:nth-last-child(1) {
  margin-bottom: 30px;
}

.song:hover {
  opacity: 0.8;
  color: #fff;
}

.playlist .song.playing {
  color: #fff;
}

.playlist > p {
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
}

.playlist > p > input {
  margin-top: 10px;
  font-size: 20px;
  width: 100%;
  padding: 6px 0 4px 10px;
  border: 1px solid #cecece;
  background: #f6f6f6;
  border-radius: 8px;
}

@media screen and (max-width: 975px) {
  .player,
  .playlist {
    width: 50%;
  }
}
/* Для добавления адаптивности (отображения интерфейса на разных устройствах) я делаю дополнительные стили при определенном размере экрана */
@media screen and (max-width: 700px) {
  main {
    flex-direction: column;
    padding: 0;
  }

  .player {
    height: auto;
  }
  .player,
  .playlist {
    width: 100%;
  }

  .playlist {
    height: 250px;
  }

  .song-title {
    font-size: 14pt;
  }

  .controls > img {
    width: 45px;
    height: 45px;
  }

  .circle > img,
  .circle_stop > img {
    width: 200px;
    height: 200px;
    margin-top: 4px;
  }

  .second_circle {
    width: 25px;
    height: 25px;
  }
  .title_and_function > img {
    width: 35px;
    height: 35px;
  }
  header > h1 {
    font-size: 18pt;
    margin-top: 50px;
  }
  .playlist .song {
    font-size: 12pt;
  }
}
</style>
