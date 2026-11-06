// A revisão e as chaves das três primeiras etapas preservam o progresso salvo.
export const CHALLENGE_REVISION = 3;
export const challengeQuestions = {
  "ia": [
    {
      "id": "ia-1",
      "stage": "Observe o exemplo",
      "type": "choice",
      "context": "A IA foi treinada com fotos de garrafas em fundo branco. Ela erra em fundos coloridos.",
      "prompt": "O que a equipe deve conferir?",
      "options": [
        "A cor do botão.",
        "Se o treino tem fotos com fundos coloridos.",
        "O nome do aplicativo."
      ],
      "answer": 1,
      "hint": "Compare as fotos do treino com as fotos do teste.",
      "explanation": "É importante conferir se os exemplos do treino incluem a situação em que a IA errou."
    },
    {
      "id": "ia-2",
      "stage": "Confira a fonte",
      "type": "multi",
      "context": "A IA escreveu 500 participantes. O texto original diz 50.",
      "prompt": "Marque as duas ações corretas.",
      "options": [
        "Corrigir o número para 50.",
        "Entregar o resumo sem conferir.",
        "Conferir os outros dados."
      ],
      "answer": [
        0,
        2
      ],
      "hint": "Use o texto original como referência.",
      "explanation": "Corrija o número pela fonte e confira os outros dados do resumo."
    },
    {
      "id": "ia-3",
      "stage": "Monte a sequência",
      "type": "order",
      "context": "Vamos comparar duas versões de uma IA com as mesmas fotos.",
      "prompt": "Coloque os passos do teste em ordem.",
      "tokens": [
        {
          "id": "comparar",
          "text": "Comparar os resultados"
        },
        {
          "id": "ajustar",
          "text": "Ajustar a IA"
        },
        {
          "id": "separar",
          "text": "Separar fotos novas"
        },
        {
          "id": "testar",
          "text": "Testar as duas versões"
        }
      ],
      "answer": [
        "separar",
        "testar",
        "comparar",
        "ajustar"
      ],
      "hint": "Separe as fotos, teste, compare e ajuste.",
      "explanation": "Primeiro separe as fotos novas. Depois teste, compare e ajuste.",
      "instruction": "Toque nos blocos na ordem certa. Toque em um bloco escolhido para removê-lo."
    }
  ],
  "natureza": [
    {
      "id": "nat-1",
      "stage": "Observe o mangue",
      "type": "choice",
      "context": "No mangue, peixes jovens podem se esconder entre as raízes.",
      "prompt": "O que as raízes oferecem aos peixes?",
      "options": [
        "Abrigo.",
        "Luz à noite.",
        "Uma saída para a rua."
      ],
      "answer": 0,
      "hint": "Pense em um lugar para se esconder.",
      "explanation": "As raízes podem servir de abrigo para peixes jovens."
    },
    {
      "id": "nat-2",
      "stage": "Cuide do rio",
      "type": "multi",
      "context": "A chuva arrastou embalagens da rua para o rio.",
      "prompt": "Marque duas ações que ajudam a resolver o problema.",
      "options": [
        "Jogar o lixo em outro canal.",
        "Descobrir de onde o lixo vem.",
        "Descartar as embalagens no lugar certo."
      ],
      "answer": [
        1,
        2
      ],
      "hint": "Procure a origem do lixo e escolha onde descartá-lo.",
      "explanation": "Conhecer a origem e descartar corretamente ajuda a reduzir o lixo que chega ao rio."
    },
    {
      "id": "nat-3",
      "stage": "Monte a sequência",
      "type": "order",
      "context": "O grupo quer observar o lixo no rio antes e depois de uma ação.",
      "prompt": "Coloque os passos em ordem.",
      "tokens": [
        {
          "id": "comparar",
          "text": "Comparar os registros"
        },
        {
          "id": "agir",
          "text": "Planejar a ação"
        },
        {
          "id": "observar",
          "text": "Registrar o que viu"
        },
        {
          "id": "acompanhar",
          "text": "Acompanhar após a ação"
        }
      ],
      "answer": [
        "observar",
        "comparar",
        "agir",
        "acompanhar"
      ],
      "hint": "Registre, compare, planeje e acompanhe.",
      "explanation": "Com os registros, o grupo pode planejar a ação e depois acompanhar o resultado.",
      "instruction": "Toque nos blocos na ordem certa. Toque em um bloco escolhido para removê-lo."
    }
  ],
  "tecnologia": [
    {
      "id": "tec-1",
      "stage": "Encontre a solução",
      "type": "choice",
      "context": "Uma pessoa usa só o teclado. O botão funciona apenas com o mouse.",
      "prompt": "O que ajuda essa pessoa a usar o botão?",
      "options": [
        "Adicionar uma animação.",
        "Mudar a cor do fundo.",
        "Permitir acionar o botão pelo teclado."
      ],
      "answer": 2,
      "hint": "A pessoa precisa usar o botão sem o mouse.",
      "explanation": "Um botão operável pelo teclado permite que a pessoa realize a mesma ação."
    },
    {
      "id": "tec-2",
      "stage": "Escolha os recursos",
      "type": "multi",
      "context": "Uma atividade tem uma imagem e um áudio importantes para entender a tarefa.",
      "prompt": "Marque os dois recursos que dão acesso ao conteúdo em texto.",
      "options": [
        "Descrição da imagem.",
        "Áudio em volume mais alto.",
        "Transcrição do áudio."
      ],
      "answer": [
        0,
        2
      ],
      "hint": "Um recurso descreve o que se vê e o outro registra o que se ouve.",
      "explanation": "A descrição apresenta a imagem em texto. A transcrição apresenta o conteúdo do áudio em texto."
    },
    {
      "id": "tec-3",
      "stage": "Monte a sequência",
      "type": "order",
      "context": "Uma pessoa contou à equipe que teve dificuldade ao usar a atividade.",
      "prompt": "Coloque os passos da melhoria em ordem.",
      "tokens": [
        {
          "id": "testar",
          "text": "Testar a mudança"
        },
        {
          "id": "entender",
          "text": "Entender a dificuldade"
        },
        {
          "id": "corrigir",
          "text": "Fazer uma melhoria"
        },
        {
          "id": "revisar",
          "text": "Revisar com o retorno"
        }
      ],
      "answer": [
        "entender",
        "corrigir",
        "testar",
        "revisar"
      ],
      "hint": "Entenda, melhore, teste e revise.",
      "explanation": "Entenda a dificuldade, faça a melhoria, teste e revise a partir do retorno.",
      "instruction": "Toque nos blocos na ordem certa. Toque em um bloco escolhido para removê-lo."
    }
  ],
  "en": [
    {
      "id": "en-1",
      "stage": "Escolha o cumprimento",
      "type": "choice",
      "context": "Você chegou ao estande de manhã.",
      "prompt": "Como se diz «bom dia» em inglês?",
      "options": [
        "Good night!",
        "Good morning!",
        "See you!"
      ],
      "answer": 1,
      "hint": "Morning significa manhã.",
      "explanation": "Good morning! significa «bom dia»."
    },
    {
      "id": "en-2",
      "stage": "Monte a frase",
      "type": "order",
      "context": "Use o modelo: Can you explain more slowly, please?",
      "prompt": "Monte a frase do modelo.",
      "tokens": [
        {
          "id": "slowly",
          "text": "more slowly,"
        },
        {
          "id": "can",
          "text": "Can"
        },
        {
          "id": "please",
          "text": "please?"
        },
        {
          "id": "you",
          "text": "you"
        },
        {
          "id": "explain",
          "text": "explain"
        }
      ],
      "answer": [
        "can",
        "you",
        "explain",
        "slowly",
        "please"
      ],
      "hint": "Comece com Can, depois you.",
      "explanation": "Can you explain more slowly, please? significa «Você pode explicar mais devagar, por favor?».",
      "instruction": "Toque nos blocos na ordem certa. Toque em um bloco escolhido para removê-lo."
    },
    {
      "id": "en-3",
      "stage": "Associe as frases",
      "type": "match",
      "context": "Conecte cada frase em inglês ao seu significado.",
      "prompt": "Encontre os pares.",
      "pairs": [
        {
          "id": "ajuda",
          "phrase": "Could you help me, please?",
          "meaning": "Pode me ajudar, por favor?"
        },
        {
          "id": "agradecer",
          "phrase": "Thank you for your help!",
          "meaning": "Obrigado pela ajuda!"
        },
        {
          "id": "comecar",
          "phrase": "Where can I start?",
          "meaning": "Onde posso começar?"
        },
        {
          "id": "despedir",
          "phrase": "See you later!",
          "meaning": "Até logo!"
        }
      ],
      "rightOrder": [
        "despedir",
        "comecar",
        "ajuda",
        "agradecer"
      ],
      "hint": "Thank you é «obrigado». See you é uma despedida.",
      "explanation": "Você conectou pedidos de ajuda, agradecimentos e despedidas.",
      "instruction": "Selecione um item à esquerda e a correspondência à direita. Complete todos os pares."
    }
  ],
  "es": [
    {
      "id": "es-1",
      "stage": "Escolha o cumprimento",
      "type": "choice",
      "context": "Você chegou ao estande de manhã.",
      "prompt": "Como se diz «bom dia» em espanhol?",
      "options": [
        "¡Buenas noches!",
        "¡Hasta luego!",
        "¡Buenos días!"
      ],
      "answer": 2,
      "hint": "Días significa dias.",
      "explanation": "¡Buenos días! significa «bom dia»."
    },
    {
      "id": "es-2",
      "stage": "Monte a frase",
      "type": "order",
      "context": "Use o modelo: ¿Puedes explicar más despacio, por favor?",
      "prompt": "Monte a frase do modelo.",
      "tokens": [
        {
          "id": "favor",
          "text": "por favor?"
        },
        {
          "id": "despacio",
          "text": "más despacio,"
        },
        {
          "id": "puedes",
          "text": "¿Puedes"
        },
        {
          "id": "explicar",
          "text": "explicar"
        }
      ],
      "answer": [
        "puedes",
        "explicar",
        "despacio",
        "favor"
      ],
      "hint": "Comece com ¿Puedes e depois coloque explicar.",
      "explanation": "¿Puedes explicar más despacio, por favor? significa «Você pode explicar mais devagar, por favor?».",
      "instruction": "Toque nos blocos na ordem certa. Toque em um bloco escolhido para removê-lo."
    },
    {
      "id": "es-3",
      "stage": "Associe as frases",
      "type": "match",
      "context": "Conecte cada frase em espanhol ao seu significado.",
      "prompt": "Encontre os pares.",
      "pairs": [
        {
          "id": "ajuda",
          "phrase": "¿Puedes ayudarme, por favor?",
          "meaning": "Pode me ajudar, por favor?"
        },
        {
          "id": "agradecer",
          "phrase": "¡Gracias por tu ayuda!",
          "meaning": "Obrigado pela ajuda!"
        },
        {
          "id": "comecar",
          "phrase": "¿Dónde puedo empezar?",
          "meaning": "Onde posso começar?"
        },
        {
          "id": "despedir",
          "phrase": "¡Hasta luego!",
          "meaning": "Até logo!"
        }
      ],
      "rightOrder": [
        "comecar",
        "despedir",
        "agradecer",
        "ajuda"
      ],
      "hint": "Gracias é «obrigado». Hasta luego é uma despedida.",
      "explanation": "Você conectou pedidos de ajuda, agradecimentos e despedidas.",
      "instruction": "Selecione um item à esquerda e a correspondência à direita. Complete todos os pares."
    }
  ]
};
export const extraLanguageWords = {
  "en": [
    {
      "phrase": "Where can I start?",
      "meaning": "Onde posso começar?",
      "context": "Para perguntar como iniciar a atividade."
    },
    {
      "phrase": "Can you explain more slowly, please?",
      "meaning": "Você pode explicar mais devagar, por favor?",
      "context": "Para acompanhar a explicação no seu ritmo."
    },
    {
      "phrase": "Could you repeat that, please?",
      "meaning": "Você poderia repetir, por favor?",
      "context": "Para pedir uma repetição."
    },
    {
      "phrase": "Can you give me an example?",
      "meaning": "Você pode me dar um exemplo?",
      "context": "Para pedir apoio na compreensão."
    }
  ],
  "es": [
    {
      "phrase": "¿Dónde puedo empezar?",
      "meaning": "Onde posso começar?",
      "context": "Para perguntar como iniciar a atividade."
    },
    {
      "phrase": "¿Puedes explicar más despacio, por favor?",
      "meaning": "Você pode explicar mais devagar, por favor?",
      "context": "Para acompanhar a explicação no seu ritmo."
    },
    {
      "phrase": "¿Puedes repetir, por favor?",
      "meaning": "Você pode repetir, por favor?",
      "context": "Para pedir uma repetição."
    },
    {
      "phrase": "¿Puedes darme un ejemplo?",
      "meaning": "Você pode me dar um exemplo?",
      "context": "Para pedir apoio na compreensão."
    }
  ]
};
