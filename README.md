# 💰 Organiza Evolution — Aplicação Web de Finanças Pessoais

Projeto desenvolvido para a disciplina **Gerência de Software** com o objetivo de criar uma aplicação web que auxilie no controle e gestão de finanças pessoais.

## 📋 Descrição

O **Organiza Evolution** permite aos usuários registrar receitas, despesas, investimentos, definir metas orçamentárias e receber notificações financeiras importantes. O foco é oferecer uma visualização clara da saúde financeira do usuário de forma prática, responsiva e intuitiva.

---

## ✅ Requisitos Funcionais

- **Cadastro de Usuários:** criação de contas com informações básicas e autenticação segura.
- **Login e Autenticação:** validação de credenciais para acesso à aplicação.
- **Gerenciamento de Receitas e Despesas:** adicionar, editar e excluir receitas/despesas com categorização por data, valor e descrição.
- **Definição de Orçamento:** criação de metas para categorias de gastos e alertas quando os limites forem atingidos ou ultrapassados.
- **Acompanhamento de Investimentos:** registro de investimentos com tipo, valor e cálculo simulado de rendimento (juros compostos).
- **Geração de Relatórios:** exibição de gráficos e estatísticas detalhadas das finanças do usuário.
- **Notificações e Lembretes:** alertas sobre vencimentos de contas, investimentos e outros eventos importantes.
- **Visualização por Páginas:** páginas distintas para login, cadastro, painel principal, receitas/despesas, orçamento, investimentos e notificações.

---

## ⚙️ Requisitos Não Funcionais

- **Usabilidade:** interface intuitiva e navegação fluida.
- **Design Responsivo:** compatibilidade com diferentes dispositivos e tamanhos de tela.
- **Desempenho:** carregamento rápido e resposta eficiente.
- **Segurança:** validação e proteção de dados sensíveis dos usuários.
- **Armazenamento e Persistência:** uso de Local Storage ou Fake API.
- **Modularidade:** utilização de componentes reutilizáveis na estrutura da aplicação.
- **Compatibilidade:** utilização das tecnologias estudadas em aula e deploy em plataforma gratuita (ex: Surge.sh).

---

## 🚀 Tecnologias e Ferramentas Utilizadas

- **Frontend:** HTML, CSS, JavaScript, framework "Next.js"
- **Design:** balsamiq, Figma, Adobe XD 
- **API Simulada:** NODE-server
- **Banco de Dados:** MYSQL, e Persistência Local(LocalStorage) 
- **Deploy:** Surge.sh

---

## 📁 Estrutura de Páginas

- Página de Registro e Login
- Painel Principal
- Página de Receitas e Despesas
- Página de Orçamento
- Página de Investimentos
- Configurações de Notificação

---

## ▶️ Como rodar o projeto LOCALMENTE (Via Terminal do próprio computador/servidor)

1. **Clone este repositório:**
   
   > git clone https://github.com/AngeloRafaelbr/Organiza_Evolution.git
   

2. **Acesse a pasta do projeto:**
   
   > cd Organiza_Evolution
   

3. **Configure um banco de dados (Recomendado MYSQL) deixe-o ativo**
   > Sugere-se executar um container mysql pela praticidade.
   > Lembre-se de verificar as variáveis de ambiente no .env
   > Lembre-se de verificar a variavel "url" no arquivo prisma/schema.prisma, a indicação de onde o BD está sendo executado deve ser "localhost" ("mysql://root:root123@localhost:3306/organiza")

4. **Instale as dependências (se necessário):**
    >instale dependências usando o comando `npm install` (por ser projeto Node).

5. **Configure PRISMA (ORM) - gerencior de banco de dados:**
   >npx prisma generate

   >npx prisma migrate deploy (Se houver migrations criadas -> Originalmente, repositorio já possui!)
   ou
   >npx prisma db push (Se não houver migrations criadas)

6. **Executo comando de inicialização do serviço do app**
   > npm start

7. **Abra o projeto no navegador:**
   >Basta rodar um servidor local (ex: http://localhost:3000).

---
## ▶️ Como rodar o projeto em container DOCKER

1. **Clone este repositório:**
   > git clone https://github.com/AngeloRafaelbr/Organiza_Evolution.git

2. **Acesse a pasta do projeto:**
   cd Organiza_Evolution

   > Lembre-se de verificar as variáveis de ambiente no "docker-compose.yml" (diferentemente da execução local, que é no .env)

3. **Verifique a variavel "url" no arquivo prisma/schema.prisma**
   > rodando no docker, a indicação de onde o BD está sendo executado deve ser o nome do serviço do docker-compose.yml, que é "db" ("mysql://root:root123@db:3306/organiza")

4. **Realize Build da imagem e já inicie a imagem com seus containers:**
   > docker-compose up --build -d

5. **Configure PRISMA (ORM) - gerencior de banco de dados:**   
   > docker exec -it nextjs-organiza_evolution-app npx prisma migrate deploy (Se houver migrations criadas -> Originalmente, repositorio já possui!)

   > docker exec -it nextjs-organiza_evolution-app npx prisma db push (Se não houver migrations criadas)

6. **Executo comando de inicialização do serviço do app**
   >Se necessário, antes, executar npm run build
   > docker exec -it nextjs-organiza_evolution-app npm start

7. **Abra o projeto no navegador:**
   > Basta rodar um servidor local (ex: http://localhost:3000).
 
## 📢 Como contribuir

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature ou correção:
   
   git checkout -b nome-da-sua-branch
   
3. Faça suas alterações e commit:
   
   git commit -m "Descrição da sua alteração"
   
4. Suba para o seu fork:
   
   git push origin nome-da-sua-branch
   
5. Abra um Pull Request detalhando suas contribuições.

---

## 🤝 Desenvolvedores

Agradecimentos especiais às pessoas que contribuíram para este projeto educacional:

<table>
 <tr>
  <td align="center">
     <a href="https://github.com/AngeloRafaelbr">
       <img src="https://avatars.githubusercontent.com/u/147670666?v=4" width="100px;" alt="Foto do Ângelo"/><br>
       <sub>
        <b>Ângelo Santos</b>
       </sub>
     </a>
   </td>
     
  <td align="center">
     <a href="https://github.com/THAISHRM">
       <img src="https://avatars.githubusercontent.com/u/144055463?v=4" width="100px;" alt="Foto da Thais"/><br>
       <sub>
        <b>Thais Melo</b>
       </sub>
     </a>
  </td>
  
  <td align="center">
     <a href="https://github.com/TulioMendesDev">
       <img src="https://avatars.githubusercontent.com/u/167912036?v=4" width="100px;" alt="Foto do Túlio"/><br>
       <sub>
        <b>Túlio Mendes</b>
       </sub>
     </a>
  </td>
 </tr>
</table>

---

## 📄 Licença

Este projeto é destinado exclusivamente para fins acadêmicos e educativos.

## Links Importantes

- **Deploy**: [https://organiza.onrender.com](https://organiza.onrender.com)
- **Design no Figma**: [Organiza no Figma](https://www.figma.com/proto/f4upQT7gBnha1pQeM18vQ2/Organiza?node-id=0-1&t=oNgpa6bCdTDyG2Ge-1)

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests. 
