# 📊 Meu Negócio Simples

> Controle financeiro simples como mandar uma mensagem. Feito para pequenos empreendedores e MEIs.

O **Meu Negócio Simples** é uma aplicação web feita para simplificar e democratizar o controle de finanças de pequenos negócios. Em vez de preencher formulários complexos e planilhas cansativas, o usuário apenas "conversa" com o aplicativo: basta digitar como se fosse numa conversa do WhatsApp (ex: *"Recebi 50 reais de um cliente em dinheiro"* ou *"Paguei 30 de luz hoje no pix"*). 

Com uma lógica inteligente, o aplicativo interpreta o texto, extrai os valores, categoriza, identifica métodos de pagamento, clientes/fornecedores e registra sua transação automaticamente.

## 🚀 Principais Funcionalidades

- **💬 Registro por Linguagem Natural**: Digite como você falaria. O sistema entende e classifica como entrada ou saída automaticamente.
- **📊 Dashboard Resumido**: Visualize instantaneamente saldos diários, semanais e mensais.
- **📁 Categorização Automática**: O app reconhece categorias comuns (Vendas, Serviços, Alimentação, Contas, Impostos, etc) baseado no que você digitou.
- **📥 Exportação de Relatórios em Excel**: Baixe suas movimentações diretamente em arquivos `.xlsx` organizados por mês e ano.
- **📱 Design Focado em Mobile (Mobile-First)**: Interface limpa, moderna, baseada em Dark/Light Mode e responsiva — desenhada para uso prático com visual de chat.
- **🔐 Autenticação Rápida e Segura**: Sistema de login estruturado do lado do servidor (SSR) junto aos serviços da plataforma Supabase.

## 🛠️ Tecnologias Utilizadas

- **[Next.js (App Router) & React 19]**: Framework robusto para estruturação da aplicação React.
- **[Tailwind CSS v4]**: Pilha de estilização utilitária para designs customizados, limpos e responsivos.
- **[shadcn/ui e Radix]**: Componentes de interface (UI) acessíveis, modulares e agradáveis.
- **[Supabase]**: Autenticação integrada e Banco de Dados (PostgreSQL).
- **[SheetJS / xlsx]**: Biblioteca robusta para a exportação de dados estruturados em planilhas.
- **[Lucide React]**: Biblioteca dos ícones utilizados em toda a aplicação.

## ⚙️ Pré-requisitos

Para rodar o projeto localmente, certifique-se de ter instalado os seguintes itens em seu ambiente:
* **Node.js** (versão 18.x ou superior)
* **npm**, **yarn**, **pnpm** ou **bun**
* Um projeto configurado no [Supabase](https://supabase.com/).

## 💻 Como Rodar o Projeto (Configuração Local)

1. **Clone o repositório:**
```bash
git clone https://github.com/SEU-USUARIO/meu-negocio-simples.git
cd meu-negocio-simples
```

2. **Instale as dependências:**
```bash
npm install
# ou yarn install / pnpm install
```

3. **Configure as Variáveis de Ambiente:**
Crie ou mude o nome do arquivo `.env.example` para `.env` (ou `.env.local`) na raiz do projeto e configure suas chaves do Supabase. O projeto consome principalmente:
```env
NEXT_PUBLIC_SUPABASE_URL="sua-url-do-supabase"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-chave-anon"
```
*(Também existem outras variáveis para a conexão de banco `POSTGRES_URL` definidas, preencha-as conforme a aba de definições no Supabase Database).*

4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

5. O aplicativo estará disponível para teste simulado no navegador em: `http://localhost:3000`.

## 🤝 Como Contribuir

Toda ajuda e sugestão visando a melhoria dessa ferramenta são muito bem-vindas!
1. Faça um **Fork** do projeto.
2. Crie uma **Branch** com a sua feature ou correção (`git checkout -b feature/NovaFuncionalidade`).
3. Commit suas mudanças (`git commit -m 'feat: Adicionando NovaFuncionalidade'`).
4. Faça o **Push** para a sua branch origin (`git push origin feature/NovaFuncionalidade`).
5. Abra um **Pull Request**.

## 📄 Licença

Este projeto é de código aberto e está sob licença **MIT**. Sinta-se livre para verificar o arquivo `LICENSE` para mais detalhes e fazer suas modificações e deploy.

---

*Feito com 💚 para quem quer focar em fazer o negócio crescer, e não gastar tempo preenchendo planilhas e burocracias.*
