import type { Adversario } from "~/data/adversarios";
import type { JogadorSelecionado } from "~/types/jogadorSelecionado";

export function gerarPlacar(
  jogadores: JogadorSelecionado[],
  adversario: Adversario
) {
  if (!jogadores.length) {
    return {
      venceu: false,
      golsTime: 0,
      golsAdversario: 0,
      eventos: [],
      melhorJogador: "",
      destaquePartida: "",
    };
  }

  const overallTime =
    jogadores.reduce(
      (acc, jogador) =>
        acc + jogador.jogador.overall,
      0
    ) / jogadores.length;

  const diferenca =
    overallTime -
    adversario.overall;

  let chanceVitoria = 50;

  chanceVitoria +=
    diferenca * 2;

  chanceVitoria = Math.max(
    15,
    Math.min(
      85,
      chanceVitoria
    )
  );

  const venceu =
    Math.random() * 100 <
    chanceVitoria;

  let golsTime = 0;

  let golsAdversario = 0;

  if (venceu) {
    golsTime =
      Math.floor(
        Math.random() * 4
      ) + 1;

    golsAdversario =
      Math.floor(
        Math.random() *
        golsTime
      );
  } else {
    golsAdversario =
      Math.floor(
        Math.random() * 4
      ) + 1;

    golsTime =
      Math.floor(
        Math.random() *
        golsAdversario
      );
  }

  const eventos: {
    minuto: number;
    tipo:
      | "gol"
      | "gol_adversario";
    autor: string;
    time:
      | "corinthians"
      | "adversario";
    descricao: string;
  }[] = [];

  const goleiro =
    jogadores.find(
      j => j.slot === "GOL"
    );

  const defensores =
    jogadores.filter(j =>
      [
        "ZAG_E",
        "ZAG_D",
        "LD",
        "LE",
        "VOL",
      ].includes(j.slot)
    );

  const descricoesGol = [
    "finaliza com categoria.",
    "recebe livre e bate no canto.",
    "aproveita sobra na área.",
    "ganha da marcação e marca.",
    "cabeceia firme para o gol.",
  ];

  const descricoesGolContra = [
    "Falha na marcação.",
    "Contra-ataque mortal.",
    "Erro na saída de bola.",
    "Chute sem chances de defesa.",
    "Bela jogada coletiva do adversário.",
  ];

  for (
    let i = 0;
    i < golsTime;
    i++
  ) {
    const jogador =
      jogadores[
        Math.floor(
          Math.random() *
            jogadores.length
        )
      ];

    if (!jogador) {
      continue;
    }

    eventos.push({
      minuto:
        Math.floor(
          Math.random() * 90
        ) + 1,

      tipo: "gol",

      autor:
        jogador.jogador.nome,

      time: "corinthians",

      descricao:
        descricoesGol[
          Math.floor(
            Math.random() *
              descricoesGol.length
          )
        ],
    });
  }

  for (
    let i = 0;
    i < golsAdversario;
    i++
  ) {
    const culpado =
      defensores[
        Math.floor(
          Math.random() *
            defensores.length
        )
      ];

    const descricao =
      goleiro &&
      Math.random() > 0.5
        ? `Frango de ${goleiro.jogador.nome}.`
        : culpado
          ? `${descricoesGolContra[
              Math.floor(
                Math.random() *
                  descricoesGolContra.length
              )
            ]} ${
              culpado.jogador.nome
            } estava envolvido no lance.`
          : "Gol adversário.";

    eventos.push({
      minuto:
        Math.floor(
          Math.random() * 90
        ) + 1,

      tipo:
        "gol_adversario",

      autor:
        adversario.nome,

      time: "adversario",

      descricao,
    });
  }

  eventos.sort(
    (a, b) =>
      a.minuto - b.minuto
  );

  const melhorJogador =
    jogadores
      .sort(
        (a, b) =>
          b.jogador.overall -
          a.jogador.overall
      )[0]?.jogador.nome ?? "";

  return {
    venceu,

    golsTime,

    golsAdversario,

    eventos,

    melhorJogador,

    destaquePartida:
      venceu
        ? `${melhorJogador} liderou a vitória do Corinthians.`
        : "O Corinthians não conseguiu superar o adversário.",
  };
}