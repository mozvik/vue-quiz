<template>
  <router-view />
</template>

<style>
:root{
  --dark: #2c3e50;
  --antique: #F6EAD6;
  --yellow: #BF4D28;
  --ash: #655643;
  --ashTransparent:  rgba(101,86,67, .8);
  --linen: #F9D9A2;
  --pumpkin: #E6AC27;
}
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: Nunito, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  position: relative;
}
body::before{
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image: url('/img/mobile-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  filter: opacity(.25);
}
#app {
  position: relative;
  text-align: center;
  color: var(--dark);
  width: 100%;
  height: 100vh;
}
@media screen and (min-width: 768px) {
  body::before{
    background-image: url('/img/desktop-bg.jpg');
  }
}

</style>
