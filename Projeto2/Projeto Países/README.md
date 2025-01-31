Projeto: Gerenciamento de Autoridades e Agendas do G20

Este projeto é uma aplicação React que gerencia informações sobre países do G20, autoridades associadas e suas agendas. O sistema inclui funcionalidades de cadastro, filtragem por regiões, visualização detalhada de países e gerenciamento de agendas de autoridades.

Funcionalidades

Gerenciamento de Países:
Listagem de países do G20 com informações detalhadas.
Filtro por região para facilitar a navegação.


Gerenciamento de Autoridades:
Cadastro de autoridades com nome, país e cargo.
Listagem de autoridades cadastradas.


Gerenciamento de Agendas:
Registro de agendas com data, hora e autoridade responsável.
Exibição de agendas organizadas por país.


Persistência de Dados:
Uso de armazenamento local para cache de informações sobre países.
Integração com a API https://restcountries.com/v3.1/all para obter dados atualizados.


Interface Intuitiva:
Navegação entre páginas (Países, Autoridades e Agendas) usando React Router.
Design responsivo com suporte a sidebar para navegação.

Tecnologias Utilizadas
Frontend: React (useState, useEffect, React Router)
Estilo: CSS 
API: RESTCountries para dados sobre países

Gerenciamento de Dados: LocalStorage para cache de países


Como Executar o Projeto
Acesse o projeto diretamente pelo link: https://codesandbox.io/p/sandbox/at-24e4-4-kxd3fg


Estrutura do Projeto
App.js: Componente principal que organiza as rotas e coordena as funcionalidades.
Sidebar: Menu lateral com a listagem de países e filtro de regiões.
CountryDetails: Exibição de informações detalhadas de um país.
AuthorityForm: Formulário para cadastro de autoridades.
ScheduleForm: Formulário para registro de agendas.
NotFound: Página exibida para rotas inexistentes.
