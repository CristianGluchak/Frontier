# Frontier

Sistema simples e moderno para gestão de RH desenvolvido em Angular 15.

## Como rodar

**Pré-requisitos:** Node.js 16+ e Angular CLI

1. **Instale as dependências:**

```bash
npm install
```

2. **Execute o projeto:**

```bash
ng serve
```

3. **Acesse:** http://localhost:4200

## Funcionalidades

- **Autenticação** - Login seguro e criação de contas
- **Funcionários** - Cadastro, listagem e busca de funcionários
- **Empresas** - Gestão de dados corporativos
- **Folha de Pagamento** - Cálculo automático de salários
- **Histórico** - Consulta de folhas anteriores

## Stack

- **Frontend:** Angular 15 + TypeScript
- **UI:** Angular Material + AG-Grid
- **Navegação:** Sidebar com ícones Material Design
- **Tabelas:** AG-Grid com paginação e filtros

## Estrutura

```
src/app/
├── auth/           # Login e cadastro
├── modules/        # Módulos principais
│   ├── funcionario/
│   ├── empresa/
│   └── calcula-folha/
└── toolbar/        # Navegação lateral
```
