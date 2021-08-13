<template>
  <div class="wrapper">
    <transition name="fade-in-out" appear>
      <div class="welcome-title info-box" style="--delay: .3s">
        <h1>Welcome{{isNewUser ? "!" : " back,"}}</h1>
        <h1 v-if="!isNewUser" class="cd-danger"><i>{{$store.state.userName}}</i></h1>
        <h2>Test your knowledge with this quiz</h2>
      </div>
    </transition>
    <transition name="fade-in-out">
    <div class="welcome-form info-box" v-if="$store.getters.categoriesCount > 0" style="--delay: .5s">
      <form action="">
          <label v-if="isNewUser" for="user"><span>Name <i>(optional)</i></span>
            <input type="text" id="user" @blur="setUser" name="user" placeholder="Enter your name">
          </label>
          <label for="categories"><span>Select a category</span>
            <select  name="categories" id="categories" @change="setSelected">
              <option value="-1">Random Category</option>
              <option v-for="item in $store.getters.categoriesArray" :key="item.id" v-bind:value="item.id">{{item.name}}</option>
            </select>
          </label>
          <label for="difficulty"><span>Select difficulty</span>
            <select name="difficulty" id="difficulty" @change="setSelected">
              <option value="any">Any</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>

          
          <button @click="getQuestions" @submit.prevent >Next</button>
          
      </form>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      isNewUser: true
    }
  },
  computed: {
   
  },
  created(){
    this.$store.commit('SET_USERNAME', window.localStorage.getItem("userName"))
    if(this.$store.state.userName) this.isNewUser = false
    
  },
  methods: {
    setUser(e){
      if(e.target.value){
        this.$store.commit('SET_USERNAME', e.target.value)
        window.localStorage.setItem("userName", e.target.value)
      }
    },
    setSelected(e){
      if (e.target.name === "categories") {
        this.$store.commit('UPDATE_SELECTED_CATEGORY', e.target.value)
      } else if (e.target.name === "difficulty") {
        this.$store.commit('UPDATE_SELECTED_DIFFICULTY', e.target.value)
      }
    },
    getQuestions(e){ 
      e.preventDefault()
      if (this.$store.state.selectedDifficulty === "any"){
        switch (Math.floor(Math.random() * 3)) {
          case 0:
            this.$store.commit('UPDATE_SELECTED_DIFFICULTY', "easy")
            break;
          case 1:
            this.$store.commit('UPDATE_SELECTED_DIFFICULTY', "medium")
            break;
          default:
            this.$store.commit('UPDATE_SELECTED_DIFFICULTY', "hard") 
            break;
        }
      } 

      if (this.$store.state.selectedCategory === -1) {
        this.$store.dispatch("getQuestions","?amount=10&category=" + this.$store.getters.categoriesArray[Math.floor(Math.random() * this.$store.getters.categoriesArray.length)].id + "&difficulty=" + this.$store.state.selectedDifficulty)
      } else this.$store.dispatch("getQuestions","?amount=10&category=" + this.$store.state.selectedCategory + "&difficulty=" + this.$store.state.selectedDifficulty)
    }
  }
};
</script>

<style scoped>
  
  .welcome-form form{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .welcome-form label{
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: .5rem auto;
    
  
  }
  ::placeholder{
    font-size: 18px;
    opacity: .75;
    font-style: italic;
  }
  .welcome-form input, .welcome-form select{
    width: 100%;
    font-size: 18px;
    padding: .5rem;
    border: 2px solid var(--dark);
    border-radius: 3rem;
  }
   .welcome-form input:focus, .welcome-form select:focus{
    border: 2px solid var(--pumpkin);
    outline: none;
    background: var(--linen);
  }

</style>
