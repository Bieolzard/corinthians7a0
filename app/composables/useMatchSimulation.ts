import type { Adversario } from "~/data/adversarios";
import type { JogadorSelecionado } from "~/types/jogadorSelecionado";

export function gerarPlacar(
  jogadores: JogadorSelecionado[],
  adversario: Adversario
) {
  const golsTime =
    Math.floor(Math.random() * 4);

  const golsAdversario =
    Math.floor(Math.random() * 3);

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

    eventos.push({
  minuto:
    Math.floor(Math.random() * 90) + 1,

  autor: jogador.jogador.nome,

  time: "corinthians" as const,
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
    venceu: golsTime > golsAdversario,
    golsTime,
    golsAdversario,
    eventos,
  };
}