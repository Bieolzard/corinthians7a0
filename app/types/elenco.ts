import type { Jogador } from "./jogador";

export interface Elenco {
  id: string;
  nome: string;
  ano: number;
  jogadores: Jogador[];
}