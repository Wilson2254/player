<template>
  <div id="app">
    <div class="nav">
      <div class="point">
        <a>
          <router-link to="/">Home</router-link>
        </a>
        <br />
        <a>
          <router-link to="/player">Application</router-link>
        </a>
      </div>
    </div>

    <router-view />
  </div>
</template>


<script>
export default {
  
};
</script>

<style>
.nav {
  position: absolute;
  width: 100%;
  z-index: 1;
  text-align: center;
  margin-top: 20px;
}

a {
  color: white;
  text-align: center;
  font-size: 32pt;
  position: relative;
  font-weight: 600;
  display: inline-block;
  text-decoration: none;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
  transition: all 0.3s linear;
}

a:hover {
  color: #e768ab;
}

a:before,
a:after {
  content: "";
  background: #b939d3;
  position: absolute;
  width: 0;
  height: 2px;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
  transition: all 0.3s linear;
}

a:before {
  top: 0;
  left: 0;
}

a:after {
  top: 100%;
  right: 0;
}

a:hover:before,
a:hover:after {
  width: 100%;
}

@media screen and (max-width: 700px) {
  a {
    font-size: 24pt;
    padding: 0 5px 0 5px;
  }
  br {
    display: none;
  }
}
</style>
