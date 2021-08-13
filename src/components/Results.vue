<template>
  <div class="wrapper">
    <transition name="fade-in-out" appear>
    <div class="results-title info-box" style="--delay: .3s">
      <h1>{{$store.getters.selectedCategoryName}}</h1>
      <h2>{{$store.getters.selectedDifficulty}} difficulty</h2>
    </div>
    </transition>
    <transition name="fade-in-out" appear>
    <div class="results-score info-box" style="--delay: .5s">
      <transition name="tada">
        <h2 v-if="isBestScore && $store.state.userName" class="wrong">New personal record!</h2>
      </transition>
      <hr v-if="isBestScore && $store.state.userName">
      <h3>Correct answers: {{$store.state.correctAnswers}}/{{$store.getters.questionsCount}}</h3>
      <hr>
      <h3>Score: {{$store.state.currentScore}}</h3> 
      <h3>Time: {{getTime()}}</h3>
      <hr v-if="localStorageData">
      <h4 v-if="localStorageData">Your old score: {{localStorageData.score}}</h4>
      <h4 v-if="localStorageData">Your old time: {{getTime(localStorageData.time)}}</h4>
    </div>
   </transition>
    <transition name="fade-in-out" appear>
    <div class="results-options info-box" style="--delay: .7s">
      <button @click="replay">Replay quiz</button>
      <button @click="another">Another quiz</button>
      
    </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: "Results",
  data() {
    return {
      isBestScore: false,
      localStorageData: {
        score: 0,
        time: 0
      },
    }
  },
  mounted(){
    const result = {
       score: this.$store.state.currentScore,
       time: this.$store.state.totalTime
     }
     
    if(this.$store.state.userName){
      this.localStorageData = this.getLocalStorage
      if (this.localStorageData) {
        if (this.$store.state.currentScore > this.localStorageData.score || this.$store.state.currentScore === this.localStorageData.score && this.$store.state.totalTime < this.localStorageData.time) {
          this.isBestScore = true
          window.localStorage.setItem(this.$store.getters.selectedCategoryName + ':' + this.$store.getters.selectedDifficulty, JSON.stringify(result))
        }
        
      } else if( this.$store.state.currentScore > 0){
        window.localStorage.setItem(this.$store.getters.selectedCategoryName + ':' + this.$store.getters.selectedDifficulty, JSON.stringify(result))
        this.isBestScore = true
        }
    }
  },
  computed:{
    getLocalStorage(){
      return JSON.parse(window.localStorage.getItem(this.$store.getters.selectedCategoryName + ':' + this.$store.getters.selectedDifficulty))
    },
    
    
  },
  methods: {
    replay(){
      this.$store.commit('SET_CURRENT_COMPONENT', 'LetsStart')
      this.resetScore()
    },
    another(){
      this.$store.commit('SET_CURRENT_COMPONENT', 'Welcome')
      this.resetScore()
    },
    resetScore(){
      this.$store.commit('UPDATE_CURRENT_SCORE', 0)
      this.$store.commit('RESET_CORRECT_ANSWERS')
      this.$store.commit('UPDATE_TOTAL_TIME', 0)
    },
    getTime(time){
      let millis = time;
      if(!time) millis = this.$store.state.totalTime
      if (!millis) {
        return undefined
      }
      let minutes = 0;
      if(millis > 60000){
        minutes = Math.floor(millis / 60000).toFixed(0)
      } 
      let seconds =  Math.floor((millis - minutes * 60000)/1000).toFixed(0)
      let tenth = ((millis - minutes * 60000 - seconds * 1000) /10).toFixed(0)
       return `${(minutes < 10 ? "0" : "")}${minutes}`+ ":" + `${(seconds < 10 ? "0" : "")}${seconds}`+ ":" + `${tenth}${(tenth < 10 ? "0" : "")}`
      
    }
  }
};
</script>

<style scoped>

</style>
