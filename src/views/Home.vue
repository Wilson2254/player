<template>
  <div>
    <!-- Это стилистическая часть, эти пустые блоки мне нужны для красивого отображения заднего движущегося заднего фона в стиле RetroWave -->
    <div class="backgr">
      <div class="container">
        <div class="sky"></div>
        <div class="container">
          <div class="grid"></div>
        </div>
      </div>
    </div>
    <div class="desc">
      <!-- Приветственное сообщение -->
      <h1>Music player. The project was implemented by Alexander Poteryaiko</h1>
    </div>
  </div>
</template>

<script>
export default {};
</script>

 <!-- Здесь  стиль я использую только на домашнюю страницу -->
<style scoped>
* {
  color: white;
  font-family: "Audiowide", cursive;
}

.desc {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.desc > h1 {
  margin-top: 250px;
  position: relative;
}

@media screen and (max-width: 700px) {
  .desc > h1 {
    margin-top: 150px;
    position: relative;
  }
}

@media screen and (max-width: 400px) {
  .desc > h1 {
    margin-top: 120px;
    position: relative;
  }
}
</style>

 <!-- А здесь я ииспользую стиль на все страницы (отображаю задний фон), так как он одинаковый везде -->
<style>
.container {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: relative;
}

.sky {
  position: absolute;
  height: 100vh;
  width: 100vw;
  margin: 0px;
  top: 0;
  left: 0;
  background: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 2px),
    radial-gradient(rgba(255, 255, 255, 0.7) 2px, transparent 1px),
    radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 3px),
    radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 2px),
    linear-gradient(to top, rgb(61, 3, 29), rgb(2, 2, 48));
  background-size: 4em 4em, 7em 7em, 30em 38em, 13em 13em, 5em 5em, 50% 50%;
  display: flex;
  justify-content: center;
  z-index: -2;
}
.grid {
  height: 150vh;
  width: 300%;
  margin-left: -100%;
  border-top: rgb(252, 189, 244) 9px solid;
  background-size: 1% 5%;
  background-image: linear-gradient(to right, #fd00e1, white 2%, transparent 1%),
    linear-gradient(to top, #fd00e1, white 2%, rgb(21, 11, 65) 1%);
  transform: perspective(50vh) rotateX(55deg) translateZ(22vh);
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 15s;
  animation-name: run;
}

@keyframes run {
  from {
    background-position-y: 0%;
  }
  to {
    background-position-y: 100%;
  }
}

.black-square {
  height: 30em;
  width: 30em;
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  background-color: black;
}

.backgr {
  position: absolute;
}
</style>