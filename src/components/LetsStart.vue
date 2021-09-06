<template>
  <div class="wrapper">
    <transition name="fade-in-out" appear>
      <div class="letsstart-title info-box" style="--delay: .3s">
        <h1>{{$store.getters.selectedCategoryName}}</h1>
        <h2>{{$store.getters.selectedDifficulty}} difficulty</h2>
      </div>
    </transition>

    <transition name="fade-in-out" appear>
      <div class="letsstart-brief info-box" style="--delay: .5s">
        <p>You have 30 seconds to answer each question. The faster you answer, the higher your score.</p>
        <button @click="$store.commit('SET_CURRENT_COMPONENT','Questions')">Start Quiz</button>
      </div>
    </transition>

    <transition name="fade-in-out" appear>
      <div v-if="$store.state.userName" class="letsstart-bestscore info-box" style="--delay: .7s">
        <h3>Your best scores in the category</h3>
        <table>
          <tr>
            <th>Difficulty</th>
            <th>Best Score</th>
            <th>Time</th>
          </tr>
          <tr>
            <td>Easy</td>
            <td>{{getScores('Easy') !== null ? getScores('Easy').score: '---'}}</td>
            <td>{{getScores('Easy') !== null ? getTimes('Easy') : '---'}} </td>
          </tr>
          <tr>
            <td>Medium</td>
            <td>{{getScores('Medium') !== null ? getScores('Medium').score : '---'}} </td>
            <td>{{getScores('Medium') !== null ? getTimes('Medium') : '---'}}</td>
          </tr>
          <tr>
            <td>Hard</td>
            <td>{{getScores('Hard') !== null ? getScores('Hard').score : '---' }}</td>
            <td>{{getScores('Hard') !== null ? getTimes('Hard') : '---'}}</td>
          </tr>
        </table>
      </div>
     </transition>
   
  </div>
</template>

<script>
export default {
  name: "LetsStart",
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    getScores(diff) {
      return JSON.parse(window.localStorage.getItem(this.$store.getters.selectedCategoryName + ':' + diff))
    },
    getTimes(diff) {
      let millis = JSON.parse(window.localStorage.getItem(this.$store.getters.selectedCategoryName + ':' + diff))
      if (!millis) {
        return undefined
      }
      let minutes = 0;
      if(millis.time > 60000){
        minutes = Math.floor(millis.time / 60000).toFixed(0)
      } 
      let seconds = Math.floor((millis.time - minutes * 60000)/1000).toFixed(0)
      let tenth = ((millis.time - minutes * 60000 - seconds * 1000) /10).toFixed(0)
       return `${(minutes < 10 ? "0" : "")}${minutes}`+ ":" + `${(seconds < 10 ? "0" : "")}${seconds}`+ ":" + `${tenth}${(tenth < 10 ? "0" : "")}`
    }
  }
};
</script>

<style scoped>
.wrapper{
    height: 100vh;
    grid-template-rows: 1fr 1fr 1fr;
   
  }
</style>
