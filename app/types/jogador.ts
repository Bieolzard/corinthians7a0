export type Posicao =
  | "GOL"
  | "LD"
  | "LE"
  | "ZAG"
  | "VOL"
  | "MC"
  | "ME"
  | "MD"
  | "PD"
  | "PE"
  | "CA";

export interface Jogador {
  id: string;
  nome: string;
  temporada?: number;
  posicoes: Posicao[];
  overall: number;
}