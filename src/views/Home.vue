<template >
  <div>
    <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet" />
      <img :src="img" />
    <div class="desc">
      <h1>Music player. The project was implemented by Alexander Poteryaiko</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: require("@/assets/thumb-1920-992294.jpg")
    };
  }
};
</script>

<style scoped>
* {
  color: #b939d3;
  font-family: "Audiowide", cursive;
}

img {
  position: absolute;
  z-index: 0;
  width: 100%;
}

.desc {
  text-align: center;
  margin: 0 40% 0 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.desc>h1{
  margin-top: 250px;
  position: relative;
}
</style>