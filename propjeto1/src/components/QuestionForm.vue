<template>
  <div id="app" class="container">
    <h1 class="mt-5 text-center">Pesquisa da Bem Promotora</h1>
    <form @submit.prevent="submitForm" class="mt-4">
      <div v-for="question in questions" :key="question.id" class="mb-4">
        <label class="form-label">{{ question.pergunta }}</label>
        <select v-model="answers[question.id]" class="form-select">
          <option disabled value="">Selecione uma opção</option>
          <option v-for="option in question.opcoes" :key="option.id" :value="option.opcao">{{ option.opcao }}</option>
        </select>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Enviar</button>
        <button type="button" class="btn btn-secondary ms-3" @click="resetForm">Limpar</button>
      </div>
    </form>
    <div v-if="submitted" class="mt-4 alert alert-success" role="alert">
      Obrigado por participar da pesquisa!
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      questions: [],
      answers: {},
      submitted: false
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:4040/questions');
      const data = await response.json();
      this.questions = data.questions;

      // Inicializa o objeto de respostas com valores vazios para cada pergunta
      this.questions.forEach(question => {
        this.answers[question.id] = '';
      });
    } catch (error) {
      console.error('Erro ao buscar perguntas:', error);
    }
  },
  methods: {
    async submitForm() {
  // Verifica se todas as perguntas têm uma resposta selecionada
  const hasEmptyAnswer = Object.values(this.answers).some(answer => !answer);

  if (hasEmptyAnswer) {
    alert('Por favor, selecione uma opção para cada pergunta antes de enviar.');
    return;
  }

  try {
    const response = await fetch('http://localhost:4040/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answers: this.answers }) // Envia 'answers' como uma propriedade de um objeto
    });

    const responseData = await response.json();

    if (responseData.success) {
      // Limpa as respostas e exibe a mensagem de sucesso
      this.answers = {};
      this.submitted = true;
      console.log('Respostas gravadas com sucesso no banco de dados!');
    } else {
      console.error('Erro ao enviar respostas:', responseData.error);
    }
  } catch (error) {
    console.error('Erro ao enviar respostas:', error);
  }
},



    resetForm() {
      // Limpa todas as respostas
      this.answers = {};
      // Remove a mensagem de sucesso
      this.submitted = false;
    }
  }
};
</script>



<style>
#app {
  background-color: #ffffff;
  color: #213547;
}

.form-select {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ced4da;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  background-color: #28a745;
  border-color: #28a745;
  margin-right: 20px;
}

.btn-primary:hover {
  background-color: #218838;
  border-color: #1e7e34;
 
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

</style>
