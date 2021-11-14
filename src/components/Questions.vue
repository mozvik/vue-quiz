<template>
  <div class="wrapper">
    <div class="questions-infobar info-box">
      <h2>{{currentQuestion + 1}}/{{$store.getters.questionsCount}}</h2>
      <h2 v-if="timeRemaining > 15000" class="cd-default">{{countdown}}</h2>
      <h2 v-if="timeRemaining <= 15000 && timeRemaining > 5000" class="cd-warning">{{countdown}}</h2>
      <h2 v-if="timeRemaining <= 5000" class="cd-danger">{{countdown}}</h2>
      <h2>{{$store.state.currentScore}}pts</h2>
    </div>
   
    <div  class="questions-question info-box" >
      <h2 v-html="$store.getters.getQuestion(currentQuestion)"></h2>
    </div>

     <div  class="questions-options info-box" >
      <button v-for="item in answers" 
          class="btn-answer"
          v-bind:key="item.id" v-bind:disabled="showEvaluation" 
          @click="evaluation" 
          v-bind:value="item" 
          v-html="item" 
          v-bind:class="[showEvaluation && item === $store.getters.getCorrectAnswer(currentQuestion) ? 'correct-bg':'', 
          showEvaluation && item != $store.getters.getCorrectAnswer(currentQuestion) && selectedAnswer === item ? 'wrong-bg':'' ,
          showEvaluation && item != $store.getters.getCorrectAnswer(currentQuestion) && selectedAnswer != item ? 'fade-out':''         
          ]"         
          >
      </button>
    </div>
   
  </div>
</template>

<script>

export default {
  name: "Questions",
  components: {
  },
  data() {
    return {
       startingTime: 0,
       timeLimit: 30000, //milliseconds
       timeRemaining: 0,
       answers: [],
       currentQuestion: 0,
       showEvaluation: false,
       pauseQuiz: false,
       isCorrect: null,
       countdownClass: 'cd-default',
       selectedAnswer: ''
    }
  },
  mounted() {
      this.resetStartingTime()
      this.ticToc()
      this.shuffleAnswers()
  },
  watch: {
    timeRemaining: function() {
      if(this.timeRemaining <= 0) this.evaluation(null)
    }
  },
  computed: {
    countdown() {
      var seconds = (this.timeRemaining  / 1000).toFixed(0)
      return `${(seconds < 10 ? "0" : "")}${seconds}`
    },
    
  },
  methods: {
    resetStartingTime(){
      this.startingTime = Date.now()
      this.timeRemaining = this.timeLimit
    },
    ticToc() {
        if( Date.now() - this.startingTime <= this.timeLimit > 0 && !this.pauseQuiz) {
                    setTimeout(() => {
                        this.timeRemaining = this.timeLimit - (Date.now() - this.startingTime)
                        if (this.timeRemaining < 0) {
                          this.timeRemaining = 0
                        }
                        this.ticToc()
                    }, 100)
                }
    },
    shuffleAnswers() {
      this.answers = this.$store.getters.getIncorrectAnswers(this.currentQuestion).concat(this.$store.getters.getCorrectAnswer(this.currentQuestion))
      this.answers.sort(() => Math.random() - 0.5)
    },
    evaluation(e){
      if(e!=null) this.selectedAnswer = e.target.value
      else this.selectedAnswer = null
      if (e!=null && e.target.value === this.$store.getters.getCorrectAnswer(this.currentQuestion)) {
        this.$store.commit('UPDATE_CURRENT_SCORE',this.$store.state.currentScore + 1 * this.timeRemaining)
        this.$store.commit('INCREASE_CORRECT_ANSWERS')
        this.isCorrect = 1
      } else if (e === null){
        this.isCorrect = -1
        }
      else{
        this.isCorrect = 0
      }
      this.pauseQuiz = true
      this.$store.commit('UPDATE_TOTAL_TIME', this.$store.state.totalTime + this.timeLimit - this.timeRemaining)
      this.showEvaluation = true
      setTimeout(() => {
        this.showNextQuestion()
      }, 2000)    
    },
    showNextQuestion() {
      this.currentQuestion++
      if (this.currentQuestion === this.$store.getters.questionsCount) {
        this.$store.commit('SET_CURRENT_COMPONENT', 'Results')
      } else {
        this.isCorrect = null;
        this.showEvaluation = false
        this.pauseQuiz = false
        this.resetStartingTime()
        this.shuffleAnswers()
        this.ticToc()
      }
    }
  }
};
</script>

<style scoped>
.wrapper{
    height: 100vh;
    grid-template-rows: 1fr 1fr 1fr;
  }
.questions-options{
  height: 208px;
}
:focus:not(:focus-visible) {
  outline: 0;
  box-shadow: none;
}
</style>
