import type { Jogador } from "./jogador";

import type { SlotCampo }
  from "./slot";

export interface JogadorSelecionado {
  jogador: Jogador;
  slot: SlotCampo;
}