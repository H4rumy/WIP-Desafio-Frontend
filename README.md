# WIP - Technology Centre
![Logo](images/WIP-Logo.png)

# Desafio Front-end React
Este repositório contém a solução para o Desafio Técnico de Front-end proposto pela WIP.  
O projeto consiste no desenvolvimento de uma interface funcional em React, com dropdowns dinâmicos interdependentes e geração automática de um código identificador.  
Este desafio tem como objetivo avaliar não apenas a competência técnica, mas também a organização, o ritmo de trabalho e a capacidade de antecipar requisitos.

## 📝 Tarefas Iniciais
- Escolher uma biblioteca de componentes 

- Estimar o tempo necessário para o desenvolvimento

- Desenvolver a página em React

- Implementar a lógica de geracao de código (campo PK)

- Associar o botão "Gravar" à geracão do JSON final

- Dropdowns com filtro por texto

- Validacão de campos numéricos

## 📚 Biblioteca de Componentes
Escolha: 

Motivo:

## 🗓️ Timeline do Projeto
- 1 dia para estudo e aprendizagem de React e da biblioteca de componentes;

- 3 dias para construcão do website (back-end e Front-end):

    dia 2- Lógica dos dropdowns + fetch mock;
    
    dia 3- Lógica de verificação (verify);
    
    dia 4- Gravacão e geracão do JSON final.
    
- 1 dia para resolucão de bugs.

## 🔒Regras  

### ✍️ Campos
- n pares: campo numérico (int), max 999.

- Cliente, Marca, Cor/ Sortimento, Tamanho: dropdowns filtráveis.

- Outros campos: texto livre.

- Pesos e medidas: apenas valores numéricos.

### 🧩 Geracão do Código (PK)
  Ao clicar no botão "Verify", será gerado o campo PK com a seguinte estrutura:
PK<Pares><Cliente><Marca><Cor><Tamanho><Certificacão>

### 🔽 Dropdowns com Dependências
Cliente --> Marca

Marca --> Cor/Sortimento

  ## 🛠️ Mock API Endpoints
  1️⃣Menu Inicial ("Create Articles")
```
{
 "success" : true,
 "data" : [
  "PM",
  "PK",
  "AC",
  "KS"
 ]
}
```

  2️⃣Escolha de Tipo "PK" (exibe restantes campos)
```
{
 "success" : true,
 "customer": [
  {"001" : "WIP"},
  {"025" : "IPCA"}
 ],
 "certification": [
  {"001" : "GOTS"},
  {"002" : "BLUE"},
  {"003" : "GREEN"}
 ],
 "unit": [
  {"001" : "UN"},
  {"002" : "PK"},
  {"003" : "PAIR"},
 ],
 "currency": [
  {"001" : "EUR"},
  {"002" : "USD"},
  {"003" : "JPY"},
  {"004" : "GBP"},
 ],
 "sustComp": [
  {"001" : "ECO"},
  {"002" : "WOOL"},
  {"003" : "GRTXT"},
 ],
}
```
3️⃣**Brand(dependente de Cliente)**

_Cliente 001 - WIP_
```
{
  "success": true,
  "data": [
    {"001": "WIPTech Pro"},
    {"253": "WIPTech Ultra"},
    {"563": "WIPTech Standard"}
  ]
}
```
_Cliente 025 - IPCA_
```
{
  "success": true,
  "data": [
    {"009": "IPCA 1"},
    {"632": "IPCA 2"}
  ]
}
```
4️⃣**Cor/Sortimento (dependente de Marca)**

_Exemplo Marca 001 - WIPTech Pro_
```
{
  "success": true,
  "data": [
    {"002": "Pure Red"},
    {"006": "Soft White"},
    {"009": "Sunset Orange"}
  ]
}
```
  ### 💾 Gravacão
O botão "Gravar" deve:
- Gerar um JSON com todos os campos preenchidos;
- Remover a chave "Success" das respostas mock;
- Incluir campos de texto livre e dropdowns com os códigos e valores selecionados.

## 📂 Estrutura Planeada
