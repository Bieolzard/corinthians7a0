export interface ResultadoPartida {
  venceu: boolean;
  chanceVitoria: number;
}

export function simularPartida(
  meuOverall: number,
  adversarioOverall: number
): ResultadoPartida {
  const diferenca =
    meuOverall - adversarioOverall;

  let chanceVitoria = 50;

  chanceVitoria += diferenca * 5;

  chanceVitoria = Math.max(
    10,
    Math.min(90, chanceVitoria)
  );

  const sorteio = Math.random() * 100;

  return {
    venceu: sorteio <= chanceVitoria,
    chanceVitoria,
  };
}