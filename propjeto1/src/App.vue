<template>
  <div id="app">
    <QuestionForm />
  </div>
</template>

<script>
import QuestionForm from './components/QuestionForm.vue';

export default {
  components: {
    QuestionForm
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
