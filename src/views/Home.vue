<template>
  <PopUpModal ref="dialog" v-show="showDialog">
    
  </PopUpModal>
  
  <div class="navbar" :style="[showMenu ? 'background: var(--ash);':'background: linear-gradient(var(--ashTransparent), var(--ashTransparent));']">
    <div><img src="favicon.ico" alt=""></div>
    <div v-if="!showMenu" @click="showMenu = !showMenu"><i class="fas fa-bars"></i></div>
    <div v-else @click="showMenu = !showMenu"><i class="fas fa-times"></i></div>
  </div>
  <transition name="slide-from-left">
  <div v-if="showMenu" class="sidebar" >
      <div @click="confirmNameDialog">Reset name and score</div>
      <div @click="confirmScoreDialog">Reset score</div>
    </div>
  </transition>

  <div class="home">
  
    <component :is="$store.state.currentComponent"></component>
  </div>
  <LoaderCircle v-if="$store.state.loading"></LoaderCircle>
</template>

<script>
import Welcome from "@/components/Welcome.vue";
import LetsStart from "@/components/LetsStart.vue";
import Questions from "@/components/Questions.vue";
import Results from "@/components/Results.vue";
import PopUpModal from '@/components/PopUpModal.vue';
import LoaderCircle from "@/components/LoaderCircle.vue";
import ModalErrorWindow from "@/components/ModalErrorWindow.vue";

export default {
  name: "Home",
  components: {
    LoaderCircle,
    ModalErrorWindow,
    Welcome,
    LetsStart,
    Questions,
    Results,
    PopUpModal,
   },
   data() {
     return {
       showDialog: false,
       showMenu: false,
       sidebar: "sidebar-hide"
     }
   },
  created(){
    if (this.$store.getters.categoriesCount === 0) this.$store.dispatch("getCategories")
  },
  methods: {
    async confirmScoreDialog() {
      this.showDialog = true
        const response = await this.$refs.dialog.show({
          title: "Reset data",
          message: "Are you sure to reset your high scores?",
          succesfulMessage: "Your scores has been purged!",
          okBtn: "Yes, please",
          cancelBtn: "No, keep them",
        })
        if (response) {
          for(let key of Object.keys(localStorage)) {
            if(key != 'userName'){
               localStorage.removeItem(key)
            }
          }
          this.$store.commit('SET_CURRENT_COMPONENT','Welcome')
        } 
        },
    async confirmNameDialog() {
      this.showDialog = true
      const response = await this.$refs.dialog.show({
        title: "Reset name and scores",
        message: "Are you sure to reset all stored data?",
        succesfulMessage: "Your name has been reset!",
        okBtn: "Purge them all",
        cancelBtn: "No, keep it",
      })
      if (response) {
        window.localStorage.clear()
        this.$store.commit('SET_USERNAME',null)
        this.$store.commit('SET_CURRENT_COMPONENT','Welcome')
      } 
      },
  },
};
</script>

<style>
.wrapper {
    height: calc(90vh - 3rem) ;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center ;
    width: 100%;
    color: var(--dark);
    user-select: none;
  }

.home {
    overflow-y: scroll;
  }
  .navbar {
    color: var(--antique);
    background: linear-gradient(var(--ashTransparent), var(--ashTransparent));
    user-select: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: .75rem 2rem; 
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.5);
  }
  .navbar i ,.sidebar>div{
    font-size: 2.5rem;
    color: var(--antique);
    transition: color 0.2s ease-in;
  }
  .navbar i:hover,.sidebar>div:hover {
    cursor: pointer;
    color: var(--pumpkin);;
    transition: color 0.35s ease-out;
  }
  
  .sidebar{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    top: 4.0rem;
    left: 0;
    height: 100%;
    width: 100%;
    background: var(--ash);
    color: var(--antique);
    z-index: 1;
  }
  .slide-from-left-enter-active,
  .slide-from-left-leave-active  {
    transition: left 0.35s ease, opacity .3s ease;
   }
  .slide-from-left-enter-from,
  .slide-from-left-leave-to{
    left: -100%;
    opacity: 0;
  }
  .fade-in-out-enter-active,
  .fade-in-out-leave-active  {
    transition: opacity .7s ease;
    transition-delay: var(--delay);
   }
  .fade-in-out-enter-from,
  .fade-in-out-leave-to{
    opacity: 0;
  }
  .tada-enter-active{
    transform-origin: center;
    transition: opacity 0.1s ease;
    animation: tadaanim 1.1s ease-in-out 1 forwards;  
    animation-delay: 1s;
  }
  .tada-enter-from{
    opacity: 1;
    transform: scale(1) rotateZ(-5deg);
  }
  @keyframes tadaanim {
            15%,35%,55%,65%{
                transform: scale(1.1) rotateZ(-5deg);
            }
            25%,45%,65%,75%{
                transform: scale(1.1) rotateZ(0deg);
            }
            100%{
              transform: scale(1) rotateZ(0deg);
            }
  }
  .fade-out{
    animation: fadeout 1.4s ease-in-out 1 forwards; 
  }
  @keyframes fadeout{
    100%{
      opacity: 0;
    }
  }
  .fade-in{
    animation: fadein 1.4s ease-in-out 1 forwards; 
  }
  @keyframes fadein{
    100%{
      opacity: 1;
    }
  }
  .sidebar>div{
    text-align: left;
    width: 100%;
    padding: .75rem 2rem;
    font-size: 1.5rem;
    border-bottom: 1px solid var(--pumpkin);
  }
  .sidebar>div:first-child{
    border-top: 1px solid var(--pumpkin);
  }
  button{
    width: 90%;
    padding: .5rem;
    font-size: 18px;
    margin: .25rem auto;
    border: 2px solid var(--dark);
    background: var(--linen);
    color: var(--dark);
    border-radius: 3rem;
    transition: background 0.25s ease-in;
  }
  
  .content button{
    padding: .5rem;
    font-size: 18px;
    margin: .5rem;
    border: 2px solid var(--dark);
    background: var(--linen);
    color: var(--dark);
    border-radius: 3rem;
  }
  .btn-answer{
    width: 90%;
    padding: .5rem;
    font-size: 18px;
    margin: 0.10rem auto; 
    border: 2px solid var(--dark);
    background: var(--linen);
    color: var(--dark);
    border-radius: 3rem;
   }
  button:hover{
    cursor: pointer;
    background: var(--pumpkin);
    transition: background 0.35s ease-out;
  }
  button:disabled{
    cursor: default;
    background: var(--antique);
  }
  p{
    font-size: 18px;
    margin: .5rem auto;
  }
  table{
    border-collapse: collapse;
    width: 90%;
    }
  table, th, td {
  border: 1px solid black;
  padding: 0 .25rem;
  margin: .5rem auto;
  border-radius: 3rem;
  
}
.questions-infobar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.evaluation{
  background-color: rgba(0,0,0,0.5);
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  
}
.evaluation>div{
  margin-top: 70px;
}

.correct {
  color: green;
}
.correct-bg {
  background: green;
}
.correct-bg:disabled {
  color: var(--linen);
  background: green;
}
.wrong-bg{
  background: red;
}
.wrong-bg:disabled{
  color: var(--linen);
  background: red;
}
.hide-element{
  display: none;
}
.wrong, .cd-danger {
  color: red;
}
.cd-default { 
  color: blue;
}
.cd-warning { 
  color: orange;
}
.info-box{
  min-width: 90%; 
  margin: 0.75rem 1.5rem;
  padding: .5rem;
  border: 2px solid var(--dark);
  border-radius: 2rem;
  background: var(--antique);
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.5);
}
@media screen and (min-width: 768px) {
  .home {
    overflow-y:initial;
    width: 700px;
    margin: 0 auto;
  }
  .navbar {
    position:sticky;
    top: 0;
    left: 0;
  }
  .wrapper{
    height: auto;
    grid-template-rows: 1fr 2fr 2fr;
  }
   .evaluation>div{
    min-width: 650px;
  }
}

</style>
