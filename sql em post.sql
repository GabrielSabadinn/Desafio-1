-- Database: bem_promotora

-- DROP DATABASE IF EXISTS bem_promotora;

CREATE DATABASE bem_promotora
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
	
CREATE TABLE perguntas (
    id SERIAL PRIMARY KEY,
    pergunta VARCHAR(255) NOT NULL
);

-- Inserir perguntas na tabela perguntas
INSERT INTO perguntas (pergunta) VALUES
('Qual sua faixa de Idade:'),
('Qual seu convênio:'),
('Qual sua faixa salarial:'),
('Por que você realizou o empréstimo:');

-- Criar a tabela opcoes_resposta
CREATE TABLE opcoes_resposta (
    id SERIAL PRIMARY KEY,
    pergunta_id INT,
    opcao VARCHAR(255) NOT NULL,
    FOREIGN KEY (pergunta_id) REFERENCES perguntas(id)
);

-- Inserir opções de resposta na tabela opcoes_resposta
INSERT INTO opcoes_resposta (pergunta_id, opcao) VALUES
(1, 'a. Até 30 Anos'),
(1, 'b. De 30 a 50 anos'),
(1, 'c. De 50 a 65 anos'),
(1, 'd. Acima de 65 anos'),
(2, 'a. INSS'),
(2, 'b. SIAPE'),
(2, 'c. Forças Armadas'),
(2, 'd. Outros'),
(3, 'a. Até 2 SM'),
(3, 'b. De 2 a 4 SM'),
(3, 'c. De 4 a 6 SM'),
(3, 'd. Acima de 6 SM'),
(4, 'a. Pagar contas'),
(4, 'b. Reforma da Casa'),
(4, 'c. Compra de Carro'),
(4, 'd. Outras');

-- Criar a tabela respostas
CREATE TABLE respostas (
    id SERIAL PRIMARY KEY,
    pergunta_id INT,
    resposta VARCHAR(255),
    FOREIGN KEY (pergunta_id) REFERENCES perguntas(id)
);

-- Verificar se os dados foram inseridos corretamente
SELECT * FROM perguntas;

SELECT * FROM respostas;