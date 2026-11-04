# Norya • Experiência REC’n’Play — versão 2

Experiência para o estande da **Lumos Connect**, feita em **React com JavaScript, Vite e CSS**. Esta versão substitui a primeira entrega: usa arquivos separados das marcas, tipografia local, ícones Lucide e fluxos diferentes para Labs e Idiomas.

## Abrir para editar

Recomendação: Node.js 22 LTS ou uma versão mais nova compatível. Não requer banco, chave de API ou configuração `.env`.

```bash
cd norya-recnplay-v2
npm ci
code .
npm run dev
```

Abra o endereço mostrado pelo terminal, normalmente `http://localhost:5173`. Se você já está dentro da pasta, pule a primeira linha. `code .` é opcional e requer o VS Code instalado com seu comando disponível.

Alternativa no Linux:

```bash
bash INICIAR.sh
```

## Abrir a versão pronta sem instalar dependências

A pasta `dist/` contém a aplicação já compilada, com imagens, fontes e scripts locais. No Linux com Python 3:

```bash
bash PREVIA.sh
```

Depois abra `http://localhost:8000`. Não abra o HTML diretamente pelo protocolo `file://`. O servidor precisa continuar aberto no terminal. Para recompilar após editar:

```bash
npm run build
```

Para verificar a compilação com o Vite:

```bash
npm run preview
```

## O percurso do participante

1. Boas-vindas da Lumos Connect.
2. Apresentação da Norya e convite para uma missão.
3. Escolha de **Norya Labs** ou **Norya Idiomas**.
4. Descoberta do conteúdo e prática em duas atividades.
5. Conquista liberada após concluir **uma** missão.
6. Retirada de adesivo com a equipe e possibilidade de explorar outros recursos.

O **SeuModo** fica disponível em todas as páginas; não é uma barreira obrigatória para começar. Não há cronômetro, competição entre visitantes nem perda de pontos ao pedir ajuda.

### Norya Labs

Três temas: inteligência artificial, natureza e cidade, tecnologia no cotidiano. A conversa guiada mostra exemplos, explica de outro jeito e resume o tema. Inclui campo de texto, sugestões, narração, salvamento do conteúdo e atividades com dicas e novas tentativas.

**É uma simulação local:** as respostas são preparadas. Não há um modelo de IA conectado nem respostas livres a qualquer pergunta. A interface identifica a demonstração e explica quando uma pergunta está fora do roteiro.

### Norya Idiomas

Inglês e espanhol. Quatro expressões para explorar, áudio de pronúncia e duas atividades: montagem de expressão e associação de significados. O áudio não é obrigatório para concluir.

### SeuModo

- Fonte, entrelinhas e espaçamento entre letras.
- Temas claro, escuro e sépia, alto contraste e monocromático.
- Foco, redução de movimento e ocultação de efeitos.
- Tamanho dos controles e teclado virtual nos campos de texto.
- Narração de páginas e velocidade da voz.
- Prévia dos ajustes antes de aplicar e restauração de padrão.

As preferências ficam no `localStorage`. As vozes e a reprodução de áudio dependem do navegador e do dispositivo; o conteúdo permanece disponível em texto. O sistema também respeita a preferência de redução de movimento do sistema operacional.

### Biblioteca, agenda e visão da escola

Busca de conteúdos, criação de coleções, salvamento e movimentação de conteúdos entre coleções; leitura e narração de artigos; agenda semanal com criação, conclusão e exclusão de lembretes; painel que resume somente as ações desta visita.

Esses recursos são opcionais e não bloqueiam o adesivo. A agenda não envia notificações. Não há dados reais de alunos ou integração com instituições.

## Persistência e uso no estande

O progresso, as mensagens, as coleções e os lembretes ficam no `sessionStorage`. Atualizar a página mantém essa visita. Encerrar a aba normalmente encerra a sessão; o navegador pode restaurá-la ao recuperar uma aba. Use **Nova visita** entre participantes: o botão pede confirmação e limpa os dados da visita, mantendo as preferências do SeuModo. Não cadastre dados pessoais de visitantes.

A confirmação **Adesivo entregue** é um registro local operado pela equipe. Não autentica a equipe e não impede retiradas em outro dispositivo ou após reiniciar a visita. O controle físico dos brindes continua com a equipe; não é um sistema de resgate centralizado.

Depois de servido, o conteúdo não depende de APIs externas. Instalar dependências requer internet. Este projeto não inclui service worker, instalação de PWA ou garantia de cache offline.

## Estrutura

```text
src/
  components/   elementos da interface, modal, SeuModo, teclado e layout
  context/      preferências e estado da visita
  data/         temas, expressões, atividades e respostas guiadas
  lib/          regras, armazenamento, IDs e fala do navegador
  pages/        telas e interações
  App.jsx       rotas
  main.jsx      entrada e fontes locais
  styles.css    identidade visual, componentes e responsividade
public/brand/   logos e mascotes separados
scripts/       servidor de prévia sem dependências Node
tests/         testes das regras e persistência
```

Para mudar perguntas e textos, edite `src/data/content.js`. Para substituir um ativo de marca, mantenha o nome correspondente em `public/brand/` ou atualize o componente `Brand` / `Mascot`.

## Verificação

```bash
npm test
npm run build
```

Os testes cobrem progressão, tentativas, liberação após uma missão, montagem/associação, conversa guiada, reinício, recuperação de estado e funcionamento de IDs em HTTP. As verificações de interface realizadas estão em `VERIFICACAO.md`.

As fontes são distribuídas localmente por Fontsource e os ícones vetoriais vêm de Lucide. Os PNGs de marca são arquivos separados recuperados dos materiais já compartilhados na conversa, sem redesenhar as marcas e sem recortar a logo da roupa do mascote. Consulte `public/brand/ORIGEM.md`.
