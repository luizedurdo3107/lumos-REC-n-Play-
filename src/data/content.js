export const topics = [
  {
    id: "ia",
    title: "Inteligência artificial",
    subject: "Tecnologia",
    icon: "sparkles",
    description: "Como as máquinas aprendem com exemplos?",
    short: "Exemplos que viram descobertas.",
    intro:
      "A inteligência artificial pode identificar padrões em exemplos para realizar tarefas. É assim que um sistema aprende a reconhecer imagens, sugerir caminhos ou ajudar nos estudos.",
    example:
      "Imagine mostrar muitas fotos de gatos e cachorros a um sistema. Com esses exemplos, ele aprende padrões, como formas das orelhas e do focinho. Ao receber uma nova foto, usa o que aprendeu para fazer uma previsão. Essa previsão pode estar errada.",
    simple:
      "Pense na IA como alguém que aprende observando exemplos. Quanto mais adequados e variados forem os exemplos, mais pistas ela terá. Ela ainda pode errar, então uma resposta precisa ser conferida.",
    takeaway:
      "Exemplos ajudam a reconhecer padrões. Uma previsão não é uma certeza.",
    paragraphs: [
      "Sistemas de inteligência artificial podem aprender padrões a partir de dados. Um modelo que reconhece imagens, por exemplo, recebe muitos exemplos durante seu treinamento.",
      "A qualidade e a variedade dos exemplos influenciam o resultado. Se os dados deixam situações de fora, o modelo pode funcionar pior nessas situações.",
      "Usar IA para estudar pode ajudar a explorar explicações e fazer perguntas. Conferir fatos e construir seu próprio raciocínio continuam sendo parte do aprendizado.",
    ],
    questions: [
      {
        type: "choice",
        prompt: "Como um sistema de IA aprende a reconhecer imagens?",
        options: [
          "Analisando padrões em muitos exemplos.",
          "Guardando uma única foto como resposta para tudo.",
          "Sabendo o significado de todas as imagens desde o início.",
        ],
        answer: 0,
        hint: "Pense no que acontece quando o sistema recebe várias fotos durante o treinamento.",
        explanation:
          "Os exemplos ajudam o modelo a identificar padrões e fazer previsões sobre novas imagens.",
      },
      {
        type: "choice",
        prompt:
          "A IA deu uma resposta para seu trabalho. O que você faz agora?",
        options: [
          "Uso a resposta, porque uma IA sempre acerta.",
          "Confiro as informações e uso meu próprio raciocínio.",
          "Confio na resposta se ela tiver muitas palavras.",
        ],
        answer: 1,
        hint: "Uma resposta bem escrita também pode conter erros.",
        explanation:
          "Conferir fontes e avaliar a resposta faz parte do uso consciente da IA.",
      },
    ],
  },
  {
    id: "natureza",
    title: "Natureza e cidade",
    subject: "Ciências",
    icon: "sprout",
    description: "O que conecta os manguezais à vida no Recife?",
    short: "A natureza também mora na cidade.",
    intro:
      "O manguezal é um ecossistema costeiro influenciado pelas marés. No Recife, ele faz parte da paisagem dos estuários e abriga animais que encontram proteção entre suas raízes.",
    example:
      "Entre as raízes do mangue, peixes jovens, caranguejos e outros animais encontram abrigo e alimento. Por isso, os manguezais são conhecidos como berçários de muitas espécies.",
    simple:
      "Imagine um bairro natural cheio de abrigos. As raízes são como pequenas casas para vários animais. Cuidar do mangue é também cuidar da vida nos rios e na costa.",
    takeaway:
      "Rios, mangues e cidade estão conectados. Cuidar de um ajuda a cuidar dos outros.",
    paragraphs: [
      "Os manguezais aparecem em regiões costeiras sujeitas às marés. Em áreas de estuário, a mistura de águas cria condições para um ecossistema muito particular.",
      "As raízes e o solo do manguezal oferecem alimento e proteção a diferentes espécies. Muitas passam parte de seu ciclo de vida nesse ambiente.",
      "O descarte adequado de resíduos ajuda a reduzir a quantidade de lixo que chega aos rios e aos mangues. A conservação também depende de ações coletivas e da proteção desses ambientes.",
    ],
    questions: [
      {
        type: "choice",
        prompt: "Por que o manguezal é chamado de berçário natural?",
        options: [
          "Porque suas raízes impedem qualquer animal de entrar.",
          "Porque ele é formado apenas por árvores jovens.",
          "Porque muitas espécies encontram abrigo e alimento ali.",
        ],
        answer: 2,
        hint: "Um berçário é um lugar que protege a vida em desenvolvimento.",
        explanation:
          "Muitas espécies encontram condições para se alimentar, crescer e se proteger no manguezal.",
      },
      {
        type: "choice",
        prompt: "Que atitude ajuda a cuidar dos rios e dos mangues?",
        options: [
          "Descartar resíduos corretamente e apoiar a conservação.",
          "Jogar resíduos em um canal distante do mangue.",
          "Retirar os animais para protegê-los em casa.",
        ],
        answer: 0,
        hint: "A água dos canais e dos rios pode transportar o que descartamos.",
        explanation:
          "A cidade e seus rios estão conectados. O descarte correto e a proteção do ambiente fazem diferença.",
      },
    ],
  },
  {
    id: "tecnologia",
    title: "Tecnologia no cotidiano",
    subject: "Tecnologia",
    icon: "laptop",
    description: "Como a mesma interface pode acolher jeitos diferentes?",
    short: "Um objetivo. Diferentes caminhos.",
    intro:
      "Uma tecnologia acessível oferece diferentes maneiras de perceber, entender e usar um conteúdo. Ajustar o texto, navegar pelo teclado ou acompanhar uma legenda pode fazer parte desse caminho.",
    example:
      "Na mesma aula, uma pessoa aumenta o texto, outra acompanha as legendas e outra usa um leitor de tela. O conteúdo é o mesmo; cada pessoa encontra uma forma de participar.",
    simple:
      "Pense em uma porta com mais de uma forma de abrir. A acessibilidade oferece alternativas para que mais pessoas consigam entrar e participar com autonomia.",
    takeaway:
      "Acessibilidade amplia a participação e deve fazer parte do projeto desde o começo.",
    paragraphs: [
      "Acessibilidade digital envolve tornar interfaces e conteúdos utilizáveis por pessoas com diferentes necessidades. Isso inclui a estrutura da página, a navegação, as cores, os textos e a mídia.",
      "Recursos como legendas, alternativas textuais e operação pelo teclado ajudam em situações diferentes. A personalização complementa uma base que já precisa ser acessível.",
      "Na Norya, o SeuModo demonstra possibilidades de personalização. Ajustes visuais não substituem avaliação com tecnologias assistivas e participação de pessoas com deficiência.",
    ],
    questions: [
      {
        type: "choice",
        prompt:
          "Uma aula tem uma explicação em áudio. Que alternativa amplia o acesso?",
        options: [
          "Tocar o áudio mais alto para todo mundo.",
          "Oferecer também uma transcrição do conteúdo.",
          "Impedir que a pessoa pause a reprodução.",
        ],
        answer: 1,
        hint: "Pense em quem não consegue ouvir ou está em um ambiente barulhento.",
        explanation:
          "Uma transcrição oferece o conteúdo em texto e permite outras formas de acompanhamento.",
      },
      {
        type: "choice",
        prompt: "Qual é a ideia por trás do SeuModo?",
        options: [
          "Oferecer ajustes para diferentes necessidades e preferências.",
          "Definir uma única configuração obrigatória.",
          "Transformar acessibilidade em uma etapa de pontuação.",
        ],
        answer: 0,
        hint: "O mesmo ajuste não é confortável para todas as pessoas.",
        explanation:
          "Personalizar a experiência ajuda cada pessoa a participar no seu ritmo.",
      },
    ],
  },
];

export const languages = [
  {
    id: "en",
    title: "Inglês",
    hello: "Hello!",
    description: "Pequenas palavras, novas conexões.",
    locale: "en-US",
    words: [
      {
        phrase: "Good morning!",
        meaning: "Bom dia!",
        context: "Para cumprimentar alguém durante a manhã.",
      },
      {
        phrase: "Hello!",
        meaning: "Olá!",
        context: "Para começar uma conversa em qualquer momento do dia.",
      },
      {
        phrase: "Thank you!",
        meaning: "Obrigado(a)!",
        context: "Para agradecer por uma ajuda ou gentileza.",
      },
      {
        phrase: "See you!",
        meaning: "Até logo!",
        context: "Para se despedir de um jeito informal.",
      },
    ],
    questions: [
      {
        type: "order",
        prompt: "Monte a expressão que significa “Bom dia!”.",
        tokens: [
          { id: "night", text: "night!" },
          { id: "good", text: "Good" },
          { id: "morning", text: "morning!" },
        ],
        answer: ["good", "morning"],
        hint: "Morning significa manhã. Comece pela palavra Good.",
        explanation:
          "Good morning! é uma forma de cumprimentar alguém durante a manhã.",
      },
      {
        type: "match",
        prompt: "Conecte cada expressão ao seu significado.",
        pairs: [
          { id: "hello", phrase: "Hello!", meaning: "Olá!" },
          { id: "thanks", phrase: "Thank you!", meaning: "Obrigado(a)!" },
          { id: "bye", phrase: "See you!", meaning: "Até logo!" },
        ],
        rightOrder: ["bye", "hello", "thanks"],
        hint: "Thank you é usado para agradecer. See you é uma despedida.",
        explanation:
          "Você conectou cumprimentos, agradecimentos e despedidas em inglês.",
      },
    ],
  },
  {
    id: "es",
    title: "Espanhol",
    hello: "¡Hola!",
    description: "Um novo idioma, uma nova descoberta.",
    locale: "es-ES",
    words: [
      {
        phrase: "¡Buenos días!",
        meaning: "Bom dia!",
        context: "Para cumprimentar alguém durante a manhã.",
      },
      {
        phrase: "¡Hola!",
        meaning: "Olá!",
        context: "Para começar uma conversa em qualquer momento do dia.",
      },
      {
        phrase: "¡Gracias!",
        meaning: "Obrigado(a)!",
        context: "Para agradecer por uma ajuda ou gentileza.",
      },
      {
        phrase: "¡Hasta luego!",
        meaning: "Até logo!",
        context: "Para se despedir e continuar a conversa depois.",
      },
    ],
    questions: [
      {
        type: "order",
        prompt: "Monte a expressão que significa “Bom dia!”.",
        tokens: [
          { id: "noches", text: "noches!" },
          { id: "dias", text: "días!" },
          { id: "buenos", text: "¡Buenos" },
        ],
        answer: ["buenos", "dias"],
        hint: "Días significa dias. Comece pela palavra ¡Buenos.",
        explanation:
          "¡Buenos días! é uma forma de cumprimentar alguém durante a manhã.",
      },
      {
        type: "match",
        prompt: "Conecte cada expressão ao seu significado.",
        pairs: [
          { id: "hello", phrase: "¡Hola!", meaning: "Olá!" },
          { id: "thanks", phrase: "¡Gracias!", meaning: "Obrigado(a)!" },
          { id: "bye", phrase: "¡Hasta luego!", meaning: "Até logo!" },
        ],
        rightOrder: ["thanks", "bye", "hello"],
        hint: "Gracias é usado para agradecer. Hasta luego é uma despedida.",
        explanation:
          "Você conectou cumprimentos, agradecimentos e despedidas em espanhol.",
      },
    ],
  },
];

export const findTopic = (id) => topics.find((topic) => topic.id === id);
export const findLanguage = (id) =>
  languages.find((language) => language.id === id);
export const getMission = (id) =>
  id?.startsWith("labs-") ? findTopic(id.slice(5)) : findLanguage(id?.slice(8));
export const catalog = [
  ...topics.map((topic) => ({
    ...topic,
    id: `labs-${topic.id}`,
    module: "labs",
    subtitle: "Uma descoberta do Norya Labs",
  })),
  ...languages.map((language) => ({
    ...language,
    id: `idiomas-${language.id}`,
    subject: "Idiomas",
    icon: "languages",
    module: "idiomas",
    short: "Primeiras conexões",
    subtitle: "Uma descoberta do Norya Idiomas",
    paragraphs: language.words.map(
      (word) => `${word.phrase} — ${word.meaning} ${word.context}`,
    ),
  })),
];
export const contentById = (id) => catalog.find((item) => item.id === id);

export function getGuidedReply(topic, text) {
  const query = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  if (/exempl|pratic|cotidian|dia a dia/.test(query)) return topic.example;
  if (/simpl|facil|outro jeito|entend|explic/.test(query)) return topic.simple;
  if (/resum|lembr|important|principal/.test(query)) return topic.takeaway;
  if (/desafio|atividade/.test(query))
    return "Quando estiver pronto, escolha “Ir para o desafio”. Você poderá pedir dicas e tentar novamente, sem perder sua conquista.";
  return `Nesta conversa de demonstração, posso explicar ${topic.title.toLowerCase()}, mostrar um exemplo ou fazer um resumo. Use as sugestões abaixo para experimentar esses caminhos.`;
}
