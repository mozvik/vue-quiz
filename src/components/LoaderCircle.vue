<template>
    <div v-if="loading" class="loaderWrapper">
      <div class="loaderCircle"></div>
    </div>
</template>


<script>

export default {
  name: "LoaderCircle",
  // emits: ["windowClosed"],
  props: {
     show: { type: Boolean, default: true },
     hide: { type: Boolean, default: false}
      },
  data: function () {
  return {
        loading: true,
        display: 'block',
     }
  },
  watch: {
    hide: function() {
        if (this.hide) {
            this.loading = false;
        }
    }
  },
};
</script>

<style scoped>
.loaderWrapper{
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: .5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
}
.loaderCircle {
    --d:110deg; /* distance between dashes */
    --n:2;   /* number of dashes */
    --c:#f00; /* color of dashes */
    --b:7px;   /* control the thickness of border*/
   
    width: 3.0rem;
    border-radius:50%;
    opacity: 1;
    display: block;
    background:
      repeating-conic-gradient(
          
          transparent 0 calc(360deg/var(--n) - var(--d)),
          var(--c)    100% calc(360deg/var(--n)));
    -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - var(--b)),#fff calc(100% - var(--b) + 1px));
            mask:radial-gradient(farthest-side,transparent calc(100% - var(--b)),#fff calc(100% - var(--b) + 1px));
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-fill-mode: repeat;
    animation-timing-function: linear;
    animation-name: loadercircle-anim;
    
  }
  .loaderCircle:before {
    content:"";
    display:block;
    padding-top:100%;
  }
  
  @keyframes loadercircle-anim {
   to { transform: scale(1) rotate(360deg);}
  }
</style>