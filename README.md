# Dropshipping Automator 🤖

![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green)
![React](https://img.shields.io/badge/React-18-blueviolet)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Selenium](https://img.shields.io/badge/Selenium-4.x-green)

Este é um projeto full-stack de automação de dropshipping, desenvolvido para demonstrar a integração de um frontend moderno em React com um backend robusto em Java + Spring Boot. O sistema simula o fluxo completo de uma loja virtual, desde a exibição de produtos até a automação de compras em sites de fornecedores.

## Funcionalidades Principais

### Frontend (React + TypeScript)
-   **Catálogo de Produtos:** Exibição dinâmica de produtos buscados da API.
-   **Filtro e Busca:** Funcionalidade de filtrar produtos por categoria e buscar por nome.
-   **Sistema de Autenticação:** Páginas de Registro e Login com gerenciamento de sessão via Token JWT.
-   **Rotas Protegidas:** Área de administração e perfil de usuário acessíveis apenas para usuários logados.
-   **Área de Admin:** Formulário para cadastrar novos produtos na loja.
-   **Atualização Automática:** A lista de produtos se atualiza automaticamente, refletindo mudanças no banco de dados em tempo real (via polling).

### Backend (Java + Spring Boot)
-   **API REST Completa:** Endpoints para gerenciar produtos, pedidos e usuários.
-   **Segurança com JWT:** Sistema de autenticação e autorização stateless usando Spring Security e JSON Web Tokens.
-   **Robô de Compra (Selenium):** Ao receber um novo pedido, um robô Selenium é iniciado para simular a compra do item no site do fornecedor.
-   **Robô de Busca de Promoções (Scraping):** Um serviço agendado (`@Scheduled`) que roda periodicamente para varrer sites de fornecedores em busca de promoções e cadastrar os produtos automaticamente no banco de dados.
-   **Persistência de Dados:** Integração com banco de dados MS SQL Server usando Spring Data JPA e Hibernate.

## Tecnologias Utilizadas

#### **Backend**
-   **Linguagem:** Java 17
-   **Framework:** Spring Boot 3
-   **Módulos Spring:** Spring Web, Spring Data JPA, Spring Security
-   **Automação:** Selenium WebDriver
-   **Autenticação:** JSON Web Token (JWT)
-   **Banco de Dados:** Microsoft SQL Server

#### **Frontend**
-   **Framework:** React 18 com Vite
-   **Linguagem:** TypeScript
-   **Estilização:** Tailwind CSS & shadcn/ui
-   **Cliente HTTP:** Axios
-   **Roteamento:** React Router DOM

## Estrutura do Repositório

O projeto é um monorepo organizado da seguinte forma:

```
/
├── backend/      <-- Projeto Java/Spring Boot
│   ├── src/
│   └── pom.xml
│
├── frontend/     <-- Projeto React/TypeScript
│   ├── src/
│   └── package.json
│
└── README.md
```

## Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento local.

### Pré-requisitos
-   **Java JDK 17** ou superior.
-   **Maven 3.8** ou superior.
-   **Node.js 18** ou superior (com npm).
-   **Microsoft SQL Server** instalado e rodando.
-   Sua IDE favorita (ex: IntelliJ para o backend, VS Code para o frontend).

### 1. Configuração do Backend
1.  **Banco de Dados:**
    * No seu SQL Server, crie um novo banco de dados (ex: `dropshipping_db`).
    * Crie um usuário com login e senha para este banco (ex: `dropshipping_user`) e dê a ele permissões de `db_owner`.
2.  **Arquivo de Configuração:**
    * Navegue até a pasta `backend/src/main/resources/`.
    * Crie uma cópia do arquivo `application.properties.example` (se existir) ou crie um novo arquivo chamado `application.properties`.
    * Preencha o arquivo com os dados de acesso ao seu banco de dados:
        ```properties
        spring.datasource.url=jdbc:sqlserver://SEU_SERVIDOR:SUA_PORTA;databaseName=dropshipping_db;encrypt=true;trustServerCertificate=true;
        spring.datasource.username=dropshipping_user
        spring.datasource.password=sua_senha_aqui
        spring.jpa.hibernate.ddl-auto=update
        spring.jpa.show-sql=true
        ```
3.  **Iniciar o Backend:**
    * Abra a pasta `backend` na sua IDE (IntelliJ).
    * Aguarde o Maven baixar todas as dependências.
    * Execute a classe principal `DropshippingAutoApplication.java`.
    * O servidor backend estará rodando em `http://localhost:8080`.

### 2. Configuração do Frontend
1.  **Navegue até a pasta** do frontend no seu terminal:
    ```bash
    cd frontend
    ```
2.  **Instale as dependências** do Node.js:
    ```bash
    npm install
    ```
3.  **Inicie o servidor** de desenvolvimento:
    ```bash
    npm run dev
    ```
4.  Abra seu navegador e acesse o endereço fornecido (geralmente `http://localhost:3000` ou `http://localhost:5173`).

## Próximos Passos e Melhorias
-   [ ] Implementar um fluxo de checkout completo com integração a um gateway de pagamento (Mercado Pago, Stripe).
-   [ ] Aprimorar o robô de compra com tratamento de erros avançado (ex: CAPTCHAs, produto fora de estoque).
-   [ ] Desenvolver a área "Minha Conta" para o usuário editar seus dados.
-   [ ] Implementar a funcionalidade de "Carrinho de Compras" de forma persistente.
-   [ ] Adicionar testes unitários e de integração para a API.
