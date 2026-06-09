import type { SlotCampo } from "~/types/slot";

export const formacoes = {
  "4-3-3": [
  "GOL",

  "LD",

  "ZAG_E",
  "ZAG_D",

  "LE",

  "VOL",

  "MC_E",
  "MC_D",

  "PD",

  "CA",

  "PE",
],

  "4-4-2": [
  "GOL",

  "LD",

  "ZAG_E",
  "ZAG_D",

  "LE",

  "VOL",

  "MC_E",
  "MC_D",

  "MC",

  "CA_E",
  "CA_D",
]
} satisfies Record<string, SlotCampo[]>;;