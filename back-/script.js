const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express(); 
const PORT = process.env.PORT || 4040;

app.use(bodyParser.json());
app.use(cors()); 

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bem_promotora',
  password: '1909',
  port: 5432, 
});

pool.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  }
});

app.get('/questions', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT perguntas.id as pergunta_id, perguntas.pergunta, opcoes_resposta.id as opcao_id, opcoes_resposta.opcao
      FROM perguntas
      LEFT JOIN opcoes_resposta ON perguntas.id = opcoes_resposta.pergunta_id
    `);

    const formattedQuestions = result.rows.reduce((acc, row) => {
      const questionIndex = acc.findIndex(q => q.id === row.pergunta_id);
      if (questionIndex === -1) {
        acc.push({
          id: row.pergunta_id,
          pergunta: row.pergunta,
          opcoes: row.opcao_id ? [{ id: row.opcao_id, opcao: row.opcao }] : []
        });
      } else {
        acc[questionIndex].opcoes.push({ id: row.opcao_id, opcao: row.opcao });
      }
      return acc;
    }, []);

    res.json({ success: true, questions: formattedQuestions });
  } catch (error) {
    console.error('Erro ao buscar perguntas do banco de dados:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});


app.post('/submit', async (req, res) => {
  const { answers } = req.body;

  try {
    console.log('Respostas recebidas:', answers); 

    for (const perguntaId in answers) {
      const resposta = answers[perguntaId];
      console.log(`Enviando resposta para a pergunta ${perguntaId}: ${resposta}`);
      await pool.query('INSERT INTO respostas (pergunta_id, resposta) VALUES ($1, $2)', [perguntaId, resposta]);
    }

    res.status(200).json({ success: true, message: 'Respostas gravadas com sucesso' });
  } catch (error) {
    console.error('Erro ao gravar respostas no banco de dados:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor ao gravar respostas' });
  }
});




app.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`);
});
