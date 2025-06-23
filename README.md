# **Projeto Final FrontEnd** - **Academix**

## Membros
Henrique da Silva Ronzani, Thiago de Moliner, Fernando Fernandes de Farias e Caio dos Santos Lopes

## Descrição do Projeto
Plataforma web para compartilhamento de códigos entre estudantes e professores, focada em um ambiente escolar. O site permitirá o envio, visualização e comentários em códigos de diferentes linguagens, incentivando a colaboração, aprendizado e revisão entre os usuários.

## Objetivo do Projeto
Promover a troca de conhecimento em programação, facilitar a revisão de exercícios e projetos, incentivar o trabalho em grupo e aproximar estudantes e professores por meio da prática colaborativa de desenvolvimento de software.

## Estrutura do Projeto

### Área de Login
- Usuário usará esta tela para realizar login na plataforma.

### Área de Postagens
- Usuário poderá criar posts com perguntas, códigos, ou assuntos relacionados à área de desenvolvimento, onde outros usuários podem visualizar e responder com comentários ou melhorias.

### Área do Usuário
- Usuário poderá editar seu perfil, que será exibido para outros usuários.

## Tecnologias
O projeto utiliza as seguintes tecnologias e ferramentas:
- React com typescript para construção da interface do usuário.
- Tailwind CSS para estilização da interface.
- Json Server para simulação de uma API RESTful.
- Axios para requisições HTTP.

## Sobre o projeto
### Características / Diferenciais
- Interface simples e intuitiva, voltada para uso educacional.
- Suporte a múltiplas linguagens de programação.
- Sistema de comentários para os posts.
- Perfis personalizados para usuários.

### Cliente ou Público alvo
- Os clientes principais seriam escolas. Que utilizariam desta tecnologia para compartilhar códigos entre si, ou tirar dúvidas.

## Como rodar o projeto

### Pré-requisitos
- Node.js instalado na máquina.
- Yarn para gerenciamento de pacotes.
- Git para controle de versão.

### Passos para rodar o projeto
1. **Clone o repositório:**
   - Certifique-se de ter o Git instalado.
   - Abra o terminal e execute:
     ```bash
     git clone (URL_DO_REPOSITORIO)
     ```

2. **Instale as dependências:**
   - Navegue até o diretório do projeto:
     ```bash
     cd projeto-abp
     ```
   - Instale as dependências usando Yarn:
     ```bash
     yarn install
     ```

3. **Inicie o servidor JSON:**
   - Execute o seguinte comando para iniciar o servidor JSON:
     ```bash
     yarn mock-api
     ```
   - Isso iniciará o servidor JSON na porta 3001, simulando uma API RESTful para o projeto.

4. **Inicie o projeto:**
   - Abra um segundo terminal executeo comando para iniciar o projeto:
      ```bash
      yarn dev
      ```
   - O projeto estará disponível em `http://localhost:3000`.

5. **Acesse o projeto:**
   - Abra o navegador e acesse `http://localhost:3000` para visualizar a aplicação em funcionamento.
