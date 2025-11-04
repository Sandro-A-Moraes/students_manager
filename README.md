# Sistema de Gerenciamento de Estudantes

**Autor:** Sandro Moraes  
**Disciplina:** Arquitetura de Software  
**Professor:** Alan  

## 📋 I. Escolha do Sistema

**Sistema Escolhido:** Sistema de Gerenciamento de Estudantes  
**Justificativa:** Sistema acadêmico para cadastro, consulta e gerenciamento de informações de estudantes, permitindo aplicação de diversos padrões arquiteturais e de projeto.

**Funcionalidades Principais:**
- Cadastro de estudantes
- Consulta por ID e matrícula
- Listagem de todos os estudantes
- Interface web responsiva

## 📐 II. Estrutura Geral do Sistema

### Arquitetura Escolhida: **Arquitetura em Camadas (Layered Architecture)**

**Camadas Definidas:**
1. **Presentation Layer** (Frontend React)
2. **API Layer** (Controllers Express)
3. **Business Logic Layer** (Services)
4. **Data Access Layer** (Repositories)
5. **Data Layer** (Prisma + SQLite)

**Frameworks e Tecnologias:**
- **Backend:** Node.js + Express + TypeScript + Prisma
- **Frontend:** React + TypeScript + Vite
- **Banco:** SQLite com Prisma ORM
- **Comunicação:** REST API com JSON

## 🏛️ III. Padrão MVC (Model-View-Controller)

### Implementação do Padrão MVC:

#### **Model (Modelo)**
- **Localização:** `backend/src/entities/student.ts`
- **Responsabilidades:**
  - Definir estrutura de dados do estudante
  - Regras de validação de domínio
  - Criação e manipulação de entidades
- **Implementação:**
```typescript
export class StudentEntity {
  private constructor(readonly props: StudentProps) {}
  
  public static create(nome: string, idade: number, email?: string) {
    // Lógica de criação com validações
  }
}
```

#### **View (Visão)**
- **Localização:** `frontend/src/components/`
- **Responsabilidades:**
  - Renderização da interface do usuário
  - Captura de eventos do usuário
  - Exibição de dados formatados
- **Componentes:**
  - `StudentForm.tsx` - Formulário de cadastro
  - `StudentList.tsx` - Lista de estudantes
  - `StudentSearch.tsx` - Interface de busca

#### **Controller (Controlador)**
- **Localização:** `backend/src/api/express/controllers/student.controller.ts`
- **Responsabilidades:**
  - Receber requisições HTTP
  - Validar parâmetros de entrada
  - Coordenar chamadas aos serviços
  - Retornar respostas formatadas
- **Métodos:**
  - `createStudent()` - Cadastro
  - `getAllStudents()` - Listagem
  - `getStudentById()` - Busca por ID
  - `getStudentByMatricula()` - Busca por matrícula

### Interação entre Camadas MVC:
```
View (React) → HTTP Request → Controller (Express) → Service → Repository → Model → Database
                    ↓
View ← HTTP Response ← Controller ← Service ← Repository ← Model ← Database
```

## 🏗️ Arquitetura Detalhada do Sistema

### Backend (Node.js + Express + Prisma)
```
backend/
├── src/
│   ├── api/                    # Camada de API
│   │   ├── express/
│   │   │   ├── controllers/    # Controladores HTTP
│   │   │   └── api.express.ts  # Configuração Express
│   │   └── api.ts             # Interface da API
│   ├── entities/              # Entidades de domínio
│   │   └── student.ts         # Entidade Student
│   ├── repositories/          # Camada de dados
│   │   └── students/
│   │       ├── prisma/        # Implementação Prisma
│   │       └── students.repository.ts
│   ├── services/              # Regras de negócio
│   │   └── students/
│   │       ├── implementation/
│   │       └── students.service.ts
│   ├── util/                  # Utilitários
│   │   └── prisma.util.ts     # Cliente Prisma
│   └── main.ts               # Ponto de entrada
├── prisma/
│   └── schema.prisma         # Schema do banco
└── db/
    └── dev.db               # Banco SQLite
```

### Frontend (React + TypeScript + Vite)
```
frontend/
├── src/
│   ├── components/           # Componentes React
│   │   ├── StudentForm.tsx   # Formulário de cadastro
│   │   ├── StudentList.tsx   # Lista de estudantes
│   │   └── StudentSearch.tsx # Busca de estudantes
│   ├── hooks/               # Hooks customizados
│   │   └── useStudents.ts   # Hook para gerenciar estudantes
│   ├── services/            # Serviços de API
│   │   └── studentService.ts # Cliente HTTP
│   ├── types/               # Tipos TypeScript
│   │   └── student.ts       # Interfaces do domínio
│   └── App.tsx             # Componente principal
└── package.json
```

## 🎯 Funcionalidades

### Backend - API REST
- **GET /students** - Lista todos os estudantes
- **GET /students/:id** - Busca estudante por ID
- **GET /students/matricula/:matricula** - Busca por matrícula
- **POST /students/create** - Cria novo estudante

### Frontend - Interface Web
- ✅ Cadastro de novos estudantes
- ✅ Listagem de todos os estudantes
- ✅ Busca por ID ou matrícula
- ✅ Tratamento de erros
- ✅ Estados de carregamento
- ✅ Interface responsiva

## 🗄️ Modelo de Dados

### Entidade Student
```typescript
interface Student {
  id: string;           // UUID único
  matricula: string;    // Matrícula gerada automaticamente
  nome: string;         // Nome do estudante
  idade: number;        // Idade do estudante
  email?: string;       // Email opcional
}
```

### Schema Prisma
```prisma
model Student {
  id        String  @id @default(uuid())
  matricula String  @unique
  nome      String
  idade     Int
  email     String?
  
  @@map("students")
}
```

## 🏢 IV. Padrões de Arquitetura Corporativos

### 1. **Repository Pattern**
- **Problema:** Desacoplamento entre lógica de negócio e acesso a dados
- **Solução:** Interface abstrata para operações de dados
- **Implementação:**
```typescript
// Interface abstrata
export interface StudentsRepository {
  create(student: StudentEntity): Promise<void>;
  findAll(): Promise<StudentEntity[]>;
  findById(id: string): Promise<StudentEntity | null>;
}

// Implementação concreta
export class StudentsRepositoryPrisma implements StudentsRepository {
  // Implementação específica do Prisma
}
```

### 2. **Service Layer Pattern**
- **Problema:** Centralização de regras de negócio
- **Solução:** Camada de serviços entre controllers e repositories
- **Implementação:**
```typescript
export class StudentsServiceImplementation implements StudentsService {
  constructor(private repository: StudentsRepository) {}
  
  async createStudent(nome: string, idade: number, email?: string) {
    // Regras de negócio aqui
  }
}
```

### 3. **Dependency Injection Pattern**
- **Problema:** Alto acoplamento entre componentes
- **Solução:** Injeção de dependências via construtor
- **Implementação:** Todas as classes recebem dependências via construtor

### 4. **API Gateway Pattern (Simplificado)**
- **Problema:** Ponto único de entrada para APIs
- **Solução:** Express.js como gateway centralizando rotas
- **Implementação:** Todas as rotas passam pelo Express com middleware comum

## 🎯 V. Padrões de Projeto (Design Patterns)

### 1. **Factory Pattern**
- **Localização:** Métodos `build()` em todas as classes
- **Problema:** Controle de criação de objetos complexos
- **Implementação:**
```typescript
export class StudentController {
  private constructor() {}
  
  public static build() {
    return new StudentController();
  }
}
```

### 2. **Builder Pattern (Implícito)**
- **Localização:** `StudentEntity.create()` e `StudentEntity.with()`
- **Problema:** Criação de objetos com múltiplos parâmetros opcionais
- **Implementação:** Métodos estáticos para diferentes cenários de criação

### 3. **Strategy Pattern (Implícito)**
- **Localização:** Interface `StudentsRepository`
- **Problema:** Diferentes implementações de acesso a dados
- **Implementação:** Possibilidade de trocar implementação (Prisma, MongoDB, etc.)

### 4. **Observer Pattern (React)**
- **Localização:** Hooks React (`useStudents`)
- **Problema:** Notificação de mudanças de estado
- **Implementação:** React hooks observam mudanças e re-renderizam componentes

### 5. **Facade Pattern**
- **Localização:** `studentService.ts` no frontend
- **Problema:** Simplificar interface complexa da API
- **Implementação:** Interface simples para operações HTTP complexas

## 🌐 VI. Estilos Arquiteturais

### 1. **REST (Representational State Transfer)**
- **Aplicação:** API HTTP entre frontend e backend
- **Características:**
  - Stateless (sem estado)
  - Recursos identificados por URLs
  - Métodos HTTP semânticos (GET, POST)
  - Representação JSON
- **Endpoints:**
  - `GET /students` - Coleção
  - `GET /students/:id` - Recurso específico
  - `POST /students/create` - Criação

### 2. **Client-Server Architecture**
- **Separação clara:** Frontend (cliente) e Backend (servidor)
- **Comunicação:** HTTP/HTTPS
- **Benefícios:** Escalabilidade, manutenibilidade, portabilidade

### 3. **Layered Architecture (N-Tier)**
- **Camadas bem definidas** com responsabilidades específicas
- **Fluxo unidirecional** de dependências
- **Isolamento** entre camadas

### 4. **Component-Based Architecture (Frontend)**
- **React Components:** Arquitetura baseada em componentes
- **Reutilização:** Componentes modulares e reutilizáveis
- **Composição:** Interface construída por composição de componentes

## 🔧 Tecnologias e Frameworks Utilizados

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados
- **CORS** - Política de origem cruzada

### Frontend
- **React 19** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **CSS-in-JS** - Estilização inline

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Backend
```bash
cd backend
npm install
npm run dev
```
Servidor rodará em: http://localhost:8000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Interface rodará em: http://localhost:5173

## 📡 Endpoints da API

### Listar Estudantes
```http
GET http://localhost:8000/students
```
**Resposta:**
```json
{
  "students": [
    {
      "id": "uuid",
      "matricula": "123456",
      "nome": "João Silva",
      "idade": 20,
      "email": "joao@email.com"
    }
  ]
}
```

### Criar Estudante
```http
POST http://localhost:8000/students/create
Content-Type: application/json

{
  "nome": "Maria Santos",
  "idade": 22,
  "email": "maria@email.com"
}
```

### Buscar por ID
```http
GET http://localhost:8000/students/{id}
```

### Buscar por Matrícula
```http
GET http://localhost:8000/students/matricula/{matricula}
```

## 🏛️ Padrões Arquiteturais

### 1. Arquitetura em Camadas
- **API Layer**: Controladores HTTP
- **Service Layer**: Regras de negócio
- **Repository Layer**: Acesso a dados
- **Entity Layer**: Modelos de domínio

### 2. Dependency Injection
- Injeção de dependências via construtores
- Desacoplamento entre camadas

### 3. Repository Pattern
- Abstração do acesso a dados
- Interface genérica para diferentes implementações

### 4. Factory Pattern
- Métodos estáticos `build()` para criação de instâncias
- Controle centralizado de criação de objetos

## 🎨 Componentes React

### StudentForm
Formulário para cadastro de novos estudantes com validação.

### StudentList
Exibe lista de estudantes em cards organizados.

### StudentSearch
Permite busca por ID ou matrícula com feedback visual.

### useStudents Hook
Hook customizado que gerencia:
- Estado dos estudantes
- Operações CRUD
- Estados de loading e erro

## 🔒 Tratamento de Erros

### Backend
- Validação de parâmetros obrigatórios
- Retorno de códigos HTTP apropriados
- Mensagens de erro descritivas

### Frontend
- Try/catch em todas as operações assíncronas
- Exibição de mensagens de erro para o usuário
- Botão de retry para operações falhadas

## 📊 Fluxo de Dados

1. **Usuário interage** com componente React
2. **Hook useStudents** processa a ação
3. **studentService** faz requisição HTTP
4. **Backend recebe** na camada de API
5. **Controller** delega para Service
6. **Service** aplica regras de negócio
7. **Repository** acessa o banco via Prisma
8. **Resposta** retorna pela mesma cadeia
9. **Frontend atualiza** estado e interface

## 🧪 Estrutura de Testes

### Arquivos de Teste da API
```
backend/api-test/
└── product.http  # Testes HTTP manuais
```

## 📝 Considerações de Design

### Responsividade
- Layout em grid adaptativo
- Componentes flexíveis
- Estilos inline para simplicidade

### Usabilidade
- Feedback visual para todas as ações
- Estados de carregamento claros
- Mensagens de erro informativas

### Manutenibilidade
- Separação clara de responsabilidades
- Tipos TypeScript em todo o código
- Componentes reutilizáveis

## 📋 VII. Documentação Arquitetural Completa

### Resumo da Arquitetura Implementada:

#### **Estrutura Geral:**
- ✅ **Arquitetura em Camadas** com separação clara de responsabilidades
- ✅ **Padrão MVC** implementado entre frontend e backend
- ✅ **REST API** para comunicação cliente-servidor

#### **Padrões Corporativos Aplicados:**
- ✅ **Repository Pattern** - Abstração de acesso a dados
- ✅ **Service Layer** - Centralização de regras de negócio
- ✅ **Dependency Injection** - Desacoplamento de componentes
- ✅ **API Gateway** - Ponto único de entrada (Express)

#### **Design Patterns Utilizados:**
- ✅ **Factory Pattern** - Criação controlada de objetos
- ✅ **Builder Pattern** - Construção flexível de entidades
- ✅ **Strategy Pattern** - Múltiplas implementações de repositório
- ✅ **Observer Pattern** - Reatividade no frontend (React)
- ✅ **Facade Pattern** - Simplificação da API no cliente

#### **Estilos Arquiteturais:**
- ✅ **REST** - Comunicação HTTP stateless
- ✅ **Client-Server** - Separação frontend/backend
- ✅ **Layered** - Organização em camadas
- ✅ **Component-Based** - Arquitetura de componentes React

### Benefícios da Arquitetura Escolhida:

1. **Manutenibilidade:** Separação clara de responsabilidades
2. **Escalabilidade:** Camadas independentes e desacopladas
3. **Testabilidade:** Componentes isolados e injetáveis
4. **Reutilização:** Padrões bem definidos e interfaces claras
5. **Flexibilidade:** Possibilidade de trocar implementações

### Decisões Arquiteturais Justificadas:

#### **Por que Arquitetura em Camadas?**
- Separação clara de responsabilidades
- Facilita manutenção e evolução
- Permite testes isolados de cada camada

#### **Por que REST API?**
- Padrão amplamente adotado
- Stateless e escalável
- Fácil integração com diferentes clientes

#### **Por que Repository Pattern?**
- Abstrai detalhes de persistência
- Facilita troca de tecnologias de banco
- Melhora testabilidade com mocks

#### **Por que React com Hooks?**
- Arquitetura component-based moderna
- Gerenciamento de estado reativo
- Reutilização de lógica com custom hooks

## 🔮 Evolução e Melhorias Futuras

### Próximas Implementações:
1. **Autenticação JWT** - Segurança da API
2. **CQRS Pattern** - Separação de comandos e consultas
3. **Event Sourcing** - Histórico de mudanças
4. **Microservices** - Decomposição em serviços menores
5. **GraphQL** - API mais flexível
6. **Docker** - Containerização
7. **CI/CD** - Pipeline de deploy automatizado

### Padrões Adicionais Possíveis:
- **Saga Pattern** - Transações distribuídas
- **Circuit Breaker** - Resiliência de rede
- **Bulkhead** - Isolamento de recursos
- **Cache-Aside** - Estratégia de cache

---

## 📊 Conclusão

O **Sistema de Gerenciamento de Estudantes** foi desenvolvido aplicando rigorosamente os conceitos de arquitetura de software estudados na disciplina. A implementação demonstra:

- ✅ **Aplicação prática** de padrões arquiteturais corporativos
- ✅ **Uso correto** de design patterns para problemas específicos
- ✅ **Implementação adequada** do padrão MVC
- ✅ **Adoção de estilos arquiteturais** modernos (REST, Client-Server)
- ✅ **Documentação completa** da arquitetura e decisões tomadas

A arquitetura escolhida garante **manutenibilidade**, **escalabilidade** e **flexibilidade** para futuras evoluções do sistema, seguindo as melhores práticas da engenharia de software.

---

**Desenvolvido por Sandro Moraes**  
**Disciplina: Arquitetura de Software**  
**Professor: Alan**  
**Universidade: Universidade do Estado do Pará**
