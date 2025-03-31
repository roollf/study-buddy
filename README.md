# Study Buddy

Este projeto foi desenvolvido utilizando Next.js, Tailwind CSS, Typescript e shadcn-ui, seguindo uma estrutura padrão que aproveita os recursos nativos do Next.js, como a pasta `app` para a construção das páginas e diretórios privados para componentes, hooks, contextos, utils, etc. 

## Dando Ínicio

### Pré-requisitos

- Node.js (versão recomendada: LTS)
- NPM

### Instalação das dependências

No diretório raiz do projeto, execute:

```bash
npm install
```

### Execuçã do projeto

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) com o seu navegador para ver o resultado.

## Descrição dos Componentes

### Componente do Cronômetro

Este é o componente mais complexo do projeto e possui as seguintes características:

- **Controle de Tempo:**
Utiliza o hook `useRef` para manter uma referência do cronômetro e `useState` para armazenar e atualizar a duração do tempo.

- **Atualização Contínua:**
A cada intervalo de tempo definido, um `setInterval` é utilizado para incrementar o estado de duração, permitindo que o cronômetro atualize de forma contínua.

- **Persistência entre Páginas:**
Para garantir que o estado do cronômetro seja mantido ao navegar entre diferentes telas, foi utilizado o recurso de Layout do Next.js, que compartilha componentes de forma global. Além disso, foi criado um contexto (Context API) para lidar com as alterações de estado do cronômetro que são disparadas diretamente nas páginas.

Outros componentes, hooks e utils estão organizados em diretórios privados.

## Principais Escolhas Técnicas

### Next.js

Optei pelo Next.js devido à experiência prévia e à praticidade que o framework oferece. Entre os principais pontos, destacam-se:

- **Roteamento Simplificado:**
Através da estrutura de diretórios, o Next.js facilita a criação e a navegação entre páginas, eliminando a necessidade de configurações complexas de roteamento.

- **Componentes Client-Side e Server-Side:**
O Next.js permite uma distinção clara entre componentes renderizados no lado do cliente e do servidor, otimizando a performance e a experiência do usuário.

- **Layout Compartilhado:**
A estrutura de Layout do Next.js possibilita a persistência de componentes globais, como o cronômetro, entre as páginas da aplicação.

### Typescript

A escolha pelo Typescript foi motivada por razões semelhantes às que levaram à escolha do Next.js:

- **Segurança e Confiabilidade:**
Com tipagem estática, o Typescript ajuda a evitar erros comuns em tempo de execução, proporcionando um desenvolvimento mais seguro e robusto.

- **Melhor Manutenção:**
A utilização de tipos explícitos facilita a leitura e manutenção do código, o que é fundamental em projetos que podem evoluir ao longo do tempo.

- **Suporte Avançado para IDEs:**
A integração do Typescript com editores modernos oferece autocompletar, refatoração e detecção precoce de erros, aumentando a produtividade do desenvolvimento.

### Tailwind CSS

A escolha pelo Tailwind CSS também foi uma decisão estratégica:

- **Design Utility-First:**
O Tailwind permite a criação de estilos de forma rápida e intuitiva, utilizando classes utilitárias que reduzem a necessidade de escrever CSS personalizado em excesso.

- **Consistência Visual:**
Ao padronizar a estilização com classes pré-definidas, é possível manter uma identidade visual consistente em toda a aplicação.

- **Facilidade de Customização:**
Apesar de ser uma biblioteca com classes utilitárias, o Tailwind oferece flexibilidade para personalizações avançadas quando necessário, possibilitando ajustes finos no design.

### shadcn-ui

Para agilizar o desenvolvimento e melhorar a experiência visual do usuário, optei pela biblioteca shadcn-ui. Seus pontos fortes incluem:

- **Composition Pattern:**
A abordagem de composição permite um controle granular sobre a montagem dos componentes, facilitando a customização e a reutilização de elementos na interface.

- **Componentes Bem Estruturados:**
Os componentes oferecidos pela shadcn-ui são desenvolvidos seguindo padrões modernos, o que agiliza a implementação de layouts e funcionalidades, mantendo o código organizado e coeso.