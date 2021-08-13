import { createStore } from "vuex";
import axios from "axios"

export default createStore({
  state: {
    currentComponent: "Welcome",
    userName: "",
    currentScore: 0,
    totalTime: 0,
    selectedCategory: -1,
    selectedDifficulty: "any",
    categories: [],
    questions: [],
    errors: [],
    correctAnswers: 0,
    loading: false,
  },
  getters: {
    categoriesCount: state => state.categories.length,
    categoriesArray: state => state.categories[0].trivia_categories,
    questionsArray: state => state.questions[0].results,
    questionsCount: state => state.questions[0].results.length,
    selectedCategoryName: state => state.questions[0].results[0].category,
    selectedDifficulty: state => state.selectedDifficulty[0].toUpperCase() + state.selectedDifficulty.slice(1),
    getQuestion: state => id => state.questions[0].results[id].question,
    getCorrectAnswer: state => id => state.questions[0].results[id].correct_answer,
    getIncorrectAnswers: state => id => state.questions[0].results[id].incorrect_answers,
  },
  mutations: {
    SET_CATEGORIES(state, data) {
      state.categories = []
      state.categories.push(data)
    },
    SET_QUESTIONS(state, data) {
      state.questions = []
      state.questions.push(data)
    },
    SET_USERNAME(state, data) {
      state.userName = data
    },
    SET_ERRORS(state, data) {
      state.errors.push(data)
    },
    UPDATE_SELECTED_CATEGORY(state, data) {
      state.selectedCategory = data
    },UPDATE_SELECTED_DIFFICULTY(state, data) {
      state.selectedDifficulty = data
    },
    SET_CURRENT_COMPONENT(state, data) {
      state.currentComponent = data
    },
    UPDATE_CURRENT_SCORE(state, data) {
      state.currentScore = data
    },
    UPDATE_TOTAL_TIME(state, data) {
      state.totalTime = data
    },
    INCREASE_CORRECT_ANSWERS(state) {
      state.correctAnswers += 1
    },
    RESET_CORRECT_ANSWERS(state) {
      state.correctAnswers = 0
    },
  },
  actions: {
    getCategories({ commit }) {
      this.state.loading = true
      axios.get("https://opentdb.com/api_category.php")
        .then(response => {
          this.state.loading = false
          commit("SET_CATEGORIES", response.data)
        })
        .catch(error => {
          commit("SET_ERRORS", error)
          commit('SET_CURRENT_COMPONENT', 'ModalErrorWindow')
        })
    },
    getQuestions({ commit }, categoryId) {
      this.state.loading = true
      axios.get("https://opentdb.com/api.php?amount=10&category=" + categoryId)
        .then(response => {
          this.state.loading = false
          commit("SET_QUESTIONS", response.data)
          commit('SET_CURRENT_COMPONENT', 'LetsStart')
        })
        .catch(error => {
          commit("SET_ERRORS", error)
          commit('SET_CURRENT_COMPONENT', 'ModalErrorWindow')
        })
    }
  },
  modules: {},
});
