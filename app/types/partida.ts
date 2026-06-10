export type TipoEventoPartida =
  | "gol"
  | "gol_adversario"
  | "chance"
  | "defesa"
  | "erro";

export interface EventoPartida {
  minuto: number;

  tipo: TipoEventoPartida;

  autor: string;

  time: "corinthians" | "adversario";

  descricao: string;
}

export interface ResumoPartida {
  venceu: boolean;

  golsTime: number;

  golsAdversario: number;

  eventos: EventoPartida[];

  melhorJogador?: string;

  destaquePartida?: string;
}