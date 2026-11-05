import { challengeQuestions, extraLanguageWords } from "./challenges.js";

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
    questions: challengeQuestions.ia,
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
    questions: challengeQuestions.natureza,
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
    questions: challengeQuestions.tecnologia,
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
    ...extraLanguageWords.en],
    questions: challengeQuestions.en,
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
    ...extraLanguageWords.es],
    questions: challengeQuestions.es,
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
