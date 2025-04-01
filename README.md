# Study Buddy

Este projeto foi desenvolvido utilizando Next.js, Tailwind CSS, Typescript e shadcn-ui, seguindo uma estrutura padrão que aproveita os recursos nativos do Next.js, como a pasta `app` para a construção das páginas e diretórios privados para componentes, hooks, contextos, utils, etc. 

## Dando Ínicio

### Acesso ao deploy

O acesso a aplicação pode ser feito através do link https://study-buddy-nu.vercel.app/. Caso tenha problemas, pode seguir os passos para executar no servidor de desenvolvimento.

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

Optei pelo Next.js devido à experiência prévia e à praticidade que o framework oferece. Ele simplifica o roteamento por meio da estrutura de diretórios, eliminando configurações complexas, além de permitir a distinção entre componentes renderizados no cliente e no servidor para otimizar a performance. Além disso, sua estrutura de Layout possibilita a persistência de componentes globais entre páginas, melhorando a experiência do usuário.

### Typescript

A escolha pelo Typescript foi motivada por razões semelhantes às que levaram à escolha do Next.js. O TypeScript melhora a segurança e confiabilidade do código com tipagem estática, evitando erros em tempo de execução, além de facilitar a manutenção com tipos explícitos que tornam o código mais legível.

### Tailwind CSS

A escolha pelo Tailwind CSS também foi uma decisão estratégica. Ele adota um design utility-first, permitindo estilização rápida com classes utilitárias que reduzem a escrita de CSS personalizado, garantindo consistência visual na aplicação. Além disso, oferece flexibilidade para personalizações avançadas, possibilitando ajustes precisos no design quando necessário.

### shadcn-ui

Para agilizar o desenvolvimento e melhorar a experiência visual do usuário, optei pela biblioteca shadcn-ui. Ela segue o padrão de composição, permitindo controle granular na montagem de componentes para facilitar customização e reutilização. Além disso, seus componentes bem estruturados seguem padrões modernos, agilizando a implementação e mantendo o código organizado.

### Recharts

Para criar visualizações de dados de forma simples e eficiente, optei pela Recharts. A biblioteca facilitou a implementação de gráficos interativos com uma API declarativa e componentes reutilizáveis, tornando a personalização e adaptação às necessidades do projeto muito mais fáceis. Além disso, ela possui uma excelente integração com os componentes existentes na biblioteca shadcn-ui.