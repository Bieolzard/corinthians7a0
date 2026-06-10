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
  chanceVitoria += diferenca * 2;
  chanceVitoria = Math.max(
  15,
  Math.min(85, chanceVitoria)
);
  const venceu =
  Math.random() * 100 <
  chanceVitoria;
  let golsTime = 0;
  let golsAdversario = 0;
  if (venceu) {
  golsTime =
    Math.floor(Math.random() * 4) + 1;

  golsAdversario =
    Math.floor(Math.random() * golsTime);
} else {
  golsAdversario =
    Math.floor(Math.random() * 4) + 1;

  golsTime =
    Math.floor(Math.random() * golsAdversario);
}

  const eventos: {
  minuto: number;
  autor: string;
  time: "corinthians" | "adversario";
}[] = [];
  for (let i = 0; i < golsTime; i++) {
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
      Math.floor(Math.random() * 90) + 1,

    autor: jogador.jogador.nome,

    time: "corinthians",
  });
}

  for (let i = 0; i < golsAdversario; i++) {
    eventos.push({
  minuto:
    Math.floor(Math.random() * 90) + 1,

  autor: adversario.nome,

  time: "adversario" as const,
});
  }

  eventos.sort(
    (a, b) => a.minuto - b.minuto
  );

  return {
    venceu,
    golsTime,
    golsAdversario,
    eventos,
  };
}