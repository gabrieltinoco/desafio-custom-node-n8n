# Desafio n8n: Conector Customizado - True Random Number Generator

Este repositório contém o código-fonte para um conector (node) customizado para a plataforma n8n. O conector `Random Number` utiliza a API pública do **Random.org** para gerar números inteiros verdadeiramente aleatórios.

Este projeto foi desenvolvido como parte de um desafio técnico e serve como um guia para a criação e instalação de conectores customizados em uma instância self-hosted do n8n rodando com Docker.

## Funcionalidades

* **Node:** Random Number
* **Operação:** True Random Number Generator
* **Inputs:**
    * `Min`: O menor valor inteiro a ser considerado (incluso).
    * `Max`: O maior valor inteiro a ser considerado (incluso).
* **Output:** Retorna um objeto JSON com uma chave `result` contendo o número aleatório gerado.

## Pré-requisitos

Para rodar este projeto localmente, você precisará ter as seguintes ferramentas instaladas:

* [Node.js v22 (LTS)](https://nodejs.org/)
* [Docker e Docker Compose](https://www.docker.com/products/docker-desktop/)

## Como Instalar e Rodar

1.  **Clone este repositório:**
    ```bash
    git clone https://github.com/gabrieltinoco/desafio-custom-node-n8n.git
    cd desafio-n8n-random
    ```

2.  **Inicie o ambiente n8n + PostgreSQL:**
    O arquivo `docker-compose.yml` já está configurado. Para iniciar os serviços, execute:
    ```bash
    docker-compose up -d
    ```
    Aguarde alguns instantes e acesse o n8n em [http://localhost:5678](http://localhost:5678).

3.  **Instale o conector customizado:**
    O conector precisa ser compilado e linkado para a pasta customizada do n8n.

    ```bash
    # Navegue até a pasta do conector
    cd n8n-nodes-random

    # Instale as dependências e compile o código TypeScript
    npm install
    npm run build

    # Crie um link simbólico global para o pacote
    npm link

    # Navegue até a pasta de extensões customizadas do n8n
    cd ../n8n_data/custom

    # Link o pacote do conector nesta pasta
    npm link n8n-nodes-random
    ```

4.  **Reinicie o n8n:**
    Para que a plataforma reconheça o novo conector, é necessário reiniciar o container.
    ```bash
    # Na raiz do projeto
    cd ../..
    docker-compose restart n8n
    ```

## Como Usar

Após reiniciar, atualize a página do n8n no seu navegador. Crie um novo workflow, clique para adicionar um node e procure por **"Random Number"**. Adicione-o ao seu fluxo, configure os valores de `Min` e `Max` e execute para ver a mágica acontecer!
