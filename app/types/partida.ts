export interface EventoPartida {
  minuto: number;
  autor: string;
  time: "corinthians" | "adversario";
}

export interface ResumoPartida {
  venceu: boolean;

  golsTime: number;

  golsAdversario: number;

  eventos: EventoPartida[];
}