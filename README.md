
# 📝 Task Manager 

Task Manager é uma aplicação para gerencimento
de tarefas com um dashboard simples e separação entre
períodos do dia.





## 🚀 Tecnologias

**React**: Biblioteca para construção de UI.

**Tailwind**: Realizar a estilização da aplicação.

**React Query**: Biblioteca para cuidar do data fetching
da aplicação. Otimizando cache e perfomance nas chamadas de API e 
atulização da interface do usuário com dados mais recentes. Também para tratamentos de erros de forma centralizada.

**React Hook Form**: Realizar validação de formulários, garantindo
o gerenciamento e envio de dados de forma segura e eficiente.

**Axios**: Realizar chamadas a API.

**React Router Dom**: Criação de rotas na aplicação.

**React Transition Group**: Garantir melhor experiência do usuário, com criação de transições suaves e personalizadas.

**Json-server**: Foi utilizada uma API Rest com JSON-server para 
garantir consistência e uma base de dados. Mais detalhes da API desse projeto está nesse repositório abaixo 

🔗 https://github.com/VinicyosFerreira/To-Do-List-Mananger-API


## 🔍 Qualidade de código
Durante o desenvolvimento foi utilizado tecnologias para
garantir melhor experiência, segue abaixo:

**Husky**: Validar pré commits, executando scripts

**Lint-staged**: Utilizado com husky para validar commits, com linters em pré commits para validação

**Prettier e Eslint**: Realizar validação e garantir qualidade 
de código.


## 💡 Como utilizar
O projeto possui 2 páginas(Início e Minhas Tarefas)

**Início**: Contém um dashboard com status
das tarefas(disponíveis,não iniciadas, em andamento e
concluídas), álem das listagem resumidas das tarefas e uma
mensagem motivacional

**Minhas Tarefas**: Contém todas tarefas separadas por períodos(*manhã , tarde e noite*), podendo adicionar tarefas ao clicar em Nova Tarefa e limpar todas tarefas.

**Detalhes de tarefas**: Utiliza a rota das tarefas com um parâmetro para a tarefa específica.Podendo editar ou deletar cada tarefa separadamente


## 📁 Estrutura do Projeto

```
src/
├── assets/       # Imagens e ícones
├── components/   # Componentes JSX
├── hooks/        # Hooks customizados
├── keys/         # Configuração do React Query
├── lib/          # Configuração de bibliotecas
└── pages/        # Páginas da aplicação
```

## 📦 Como rodar localmente 

**Clonar projeto**

**git clone** https://github.com/VinicyosFerreira/To-Do-List-Manager

**Acessar pasta**

cd To-Do-List-Manager

**Instalar dependências**

npm install

**Rodar projeto**

npm run dev
## 🔗 Links 

**App rodando:** [Confira o projeto rodando] 
https://to-do-list-mananger.vercel.app/

**Código Fonte** [Confira o código fonte]
https://github.com/VinicyosFerreira/To-Do-List-Manager
