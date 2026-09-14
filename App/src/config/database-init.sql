-- ==========================================
-- TABELA TIPO_PESSOA
-- ==========================================

CREATE TABLE IF NOT EXISTS tipo_pessoa (
    id_tipo_pessoa INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo_tipo_pessoa CHAR(1) NOT NULL,
    descricao_tipo_pessoa VARCHAR(50) NOT NULL,
    CONSTRAINT uk_codigo_tipo_pessoa UNIQUE(codigo_tipo_pessoa)
);

-- ==========================================
-- CARGA INICIAL TIPO_PESSOA
-- ==========================================

INSERT INTO tipo_pessoa (codigo_tipo_pessoa, descricao_tipo_pessoa)
VALUES
('P','Professor'),
('A','Aluno'),
('D','Administrador')
ON CONFLICT (codigo_tipo_pessoa) DO NOTHING;

-- ==========================================
-- TABELA PESSOA
-- ==========================================

CREATE TABLE IF NOT EXISTS pessoa (
    id_pessoa INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome_pessoa VARCHAR(100) NOT NULL,
    data_nascimento TIMESTAMP NOT NULL,
    id_tipo_pessoa INTEGER NOT NULL,
    usuario_ativo BOOLEAN NOT NULL DEFAULT TRUE,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_ultima_alteracao TIMESTAMP NULL,
    CONSTRAINT fk_pessoa_tipo_pessoa FOREIGN KEY (id_tipo_pessoa) REFERENCES tipo_pessoa(id_tipo_pessoa)
);

-- ==========================================
-- CARGA INICIAL PESSOAS
-- ==========================================

INSERT INTO pessoa (nome_pessoa, data_nascimento, id_tipo_pessoa)
SELECT 'Professor-Teste','1980-01-01',id_tipo_pessoa
FROM tipo_pessoa WHERE codigo_tipo_pessoa = 'P'
AND NOT EXISTS (SELECT 1 FROM pessoa WHERE nome_pessoa = 'Professor-Teste');

INSERT INTO pessoa (nome_pessoa, data_nascimento, id_tipo_pessoa)
SELECT 'Aluno-Teste','2005-01-01',id_tipo_pessoa
FROM tipo_pessoa WHERE codigo_tipo_pessoa = 'A'
AND NOT EXISTS (SELECT 1 FROM pessoa WHERE nome_pessoa = 'Aluno-Teste');

INSERT INTO pessoa (nome_pessoa, data_nascimento, id_tipo_pessoa)
SELECT 'Administrador-Teste','1980-01-01',id_tipo_pessoa
FROM tipo_pessoa WHERE codigo_tipo_pessoa = 'D'
AND NOT EXISTS (SELECT 1 FROM pessoa WHERE nome_pessoa = 'Administrador-Teste');

-- Novos registros
INSERT INTO pessoa (nome_pessoa, data_nascimento, id_tipo_pessoa)
SELECT 'Professor-Teste-2','1985-01-01',id_tipo_pessoa
FROM tipo_pessoa WHERE codigo_tipo_pessoa = 'P'
AND NOT EXISTS (SELECT 1 FROM pessoa WHERE nome_pessoa = 'Professor-Teste-2');

INSERT INTO pessoa (nome_pessoa, data_nascimento, id_tipo_pessoa)
SELECT 'Aluno-Teste-2','2006-01-01',id_tipo_pessoa
FROM tipo_pessoa WHERE codigo_tipo_pessoa = 'A'
AND NOT EXISTS (SELECT 1 FROM pessoa WHERE nome_pessoa = 'Aluno-Teste-2');

-- ==========================================
-- TABELA USUARIO
-- ==========================================

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_pessoa INTEGER NOT NULL,
    CONSTRAINT uk_usuario_user_name UNIQUE(user_name),
    CONSTRAINT fk_usuario_pessoa FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa)
);

-- ==========================================
-- CARGA INICIAL USUARIOS
-- ==========================================

INSERT INTO usuario (user_name,password,id_pessoa)
SELECT 'professor.teste','$2b$10$vXGpoyHcKeWRtOntQN8whunR8tTkg3/4vTaXUlZDPvRjJ/nSAJs82',id_pessoa
FROM pessoa WHERE nome_pessoa = 'Professor-Teste'
AND NOT EXISTS (SELECT 1 FROM usuario WHERE user_name = 'professor.teste');

INSERT INTO usuario (user_name,password,id_pessoa)
SELECT 'aluno.teste','$2b$10$vXGpoyHcKeWRtOntQN8whunR8tTkg3/4vTaXUlZDPvRjJ/nSAJs82',id_pessoa
FROM pessoa WHERE nome_pessoa = 'Aluno-Teste'
AND NOT EXISTS (SELECT 1 FROM usuario WHERE user_name = 'aluno.teste');

INSERT INTO usuario (user_name,password,id_pessoa)
SELECT 'admin.teste','$2b$10$vXGpoyHcKeWRtOntQN8whunR8tTkg3/4vTaXUlZDPvRjJ/nSAJs82',id_pessoa
FROM pessoa WHERE nome_pessoa = 'Administrador-Teste'
AND NOT EXISTS (SELECT 1 FROM usuario WHERE user_name = 'admin.teste');

-- Novos usuários
INSERT INTO usuario (user_name,password,id_pessoa)
SELECT 'professor.teste2','$2b$10$vXGpoyHcKeWRtOntQN8whunR8tTkg3/4vTaXUlZDPvRjJ/nSAJs82',id_pessoa
FROM pessoa WHERE nome_pessoa = 'Professor-Teste-2'
AND NOT EXISTS (SELECT 1 FROM usuario WHERE user_name = 'professor.teste2');

INSERT INTO usuario (user_name,password,id_pessoa)
SELECT 'aluno.teste2','$2b$10$vXGpoyHcKeWRtOntQN8whunR8tTkg3/4vTaXUlZDPvRjJ/nSAJs82',id_pessoa
FROM pessoa WHERE nome_pessoa = 'Aluno-Teste-2'
AND NOT EXISTS (SELECT 1 FROM usuario WHERE user_name = 'aluno.teste2');

-- ==========================================
-- TABELA POST
-- ==========================================

CREATE TABLE IF NOT EXISTS post (
    id_post INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    conteudo VARCHAR(800) NOT NULL,
    criado_por INTEGER NOT NULL,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_ultima_alteracao TIMESTAMP NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_post_pessoa FOREIGN KEY (criado_por) REFERENCES pessoa(id_pessoa)
);

-- ==========================================
-- TABELA COMENTARIO
-- ==========================================

CREATE TABLE IF NOT EXISTS comentario (
    id_comentario INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    conteudo VARCHAR(150) NOT NULL,
    id_usuario INTEGER NOT NULL,
    id_post INTEGER NOT NULL,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_ultima_alteracao TIMESTAMP NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_comentario_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    CONSTRAINT fk_comentario_post FOREIGN KEY (id_post) REFERENCES post(id_post)
);

-- ==========================================
-- TABELA HISTORICO
-- ==========================================

CREATE TABLE IF NOT EXISTS historico (
    id_historico INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    operacao VARCHAR(20) NOT NULL,
    entidade VARCHAR(50) NOT NULL,
    id_registro INTEGER NOT NULL,
    id_pessoa INTEGER,
    data_operacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_operacao CHECK (operacao IN ('CRIACAO','EDICAO','EXCLUSAO')),
    CONSTRAINT fk_historico_pessoa FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa)
);

-- ==========================================
-- FUNÇÃO DE AUDITORIA
-- ==========================================

CREATE OR REPLACE FUNCTION registrar_historico()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    pessoa_id INTEGER;
    registro_id INTEGER;
BEGIN
    IF TG_OP = 'DELETE' THEN
        IF TG_TABLE_NAME = 'pessoa' THEN
            pessoa_id := OLD.id_pessoa;
            registro_id := OLD.id_pessoa;
        ELSIF TG_TABLE_NAME = 'post' THEN
            pessoa_id := OLD.criado_por;
            registro_id := OLD.id_post;
        ELSIF TG_TABLE_NAME = 'comentario' THEN
            pessoa_id := OLD.id_usuario;
            registro_id := OLD.id_comentario;
        END IF;
        INSERT INTO historico (operacao,entidade,id_registro,id_pessoa)
        VALUES ('EXCLUSAO',TG_TABLE_NAME,registro_id,pessoa_id);
        RETURN OLD;
    ELSE
        IF TG_TABLE_NAME = 'pessoa' THEN
            pessoa_id := NEW.id_pessoa;
            registro_id := NEW.id_pessoa;
        ELSIF TG_TABLE_NAME = 'post' THEN
            pessoa_id := NEW.criado_por;
            registro_id := NEW.id_post;
        ELSIF TG_TABLE_NAME = 'comentario' THEN
            pessoa_id := NEW.id_usuario;
            registro_id := NEW.id_comentario;
        END IF;
        INSERT INTO historico (operacao,entidade,id_registro,id_pessoa)
        VALUES (
            CASE TG_OP WHEN 'INSERT' THEN 'CRIACAO' WHEN 'UPDATE' THEN 'EDICAO' END,
            TG_TABLE_NAME,registro_id,pessoa_id
        );
        RETURN NEW;
