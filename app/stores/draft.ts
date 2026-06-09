import { defineStore } from "pinia";
import { elencos } from "~/data/elencos";
import { formacoes } from "~/data/formacoes";
import { adversarios, type Adversario } from "~/data/adversarios";
import { simularPartida }
  from "~/composables/useSimulador";
  import type { SlotCampo } from "~/types/slot";

import type { Jogador } from "~/types/jogador";
import type { Elenco } from "~/types/elenco";
import type { JogadorSelecionado } from "~/types/jogadorSelecionado";
import { gerarPlacar }
  from "~/composables/useMatchSimulation";

export const useDraftStore = defineStore("draft", () => {
    type Formacao = keyof typeof formacoes;

const formacao = ref<Formacao>("4-3-3");
const resumoPartida = ref<{
  golsTime: number;
  golsAdversario: number;

  eventos: {
    minuto: number;
    autor: string;
    time: "corinthians" | "adversario";
  }[];
} | null>(null);
    const indicePosicaoAtual = ref(0);

   const jogadoresSelecionados = ref<
  JogadorSelecionado[]
>([]);
    const adversarioAtual =
  ref<Adversario | null>(null);
    //   const elencosUtilizados = ref<string[]>([]);

    const elencoAtual = ref<Elenco | null>(null);

    const posicoes = computed(() => {
        return formacoes[formacao.value];
    });

    const posicaoAtual = computed(() => {
        return posicoes.value[indicePosicaoAtual.value];
    });

    const draftFinalizado = computed(() => {
        return indicePosicaoAtual.value >= posicoes.value.length;
    });

    function iniciarDraft() {
        jogadoresSelecionados.value = [];

        indicePosicaoAtual.value = 0;

        sortearElenco();
    }

    function sortearElenco() {
        const indice = Math.floor(
            Math.random() * elencos.length
        );

        const elenco = elencos[indice];

        if (!elenco) return;

        elencoAtual.value = elenco;
    }

    

const slotAtual = computed<SlotCampo | null>(() => {
  return (
    posicoes.value[indicePosicaoAtual.value] as SlotCampo
  ) ?? null;
});

    function selecionarJogador(jogador: Jogador) {
  const slot = slotAtual.value;

  if (!slot) {
    return;
  }

  jogadoresSelecionados.value.push({
    jogador,
    slot,
  });

  indicePosicaoAtual.value++;

  if (!draftFinalizado.value) {
    sortearElenco();
  } else {
    elencoAtual.value = null;

    faseAtual.value = "oitavas";

    sortearAdversario();
  }
}

const slotParaPosicao = {
  GOL: "GOL",

  LD: "LD",
  LE: "LE",

  ZAG_E: "ZAG",
  ZAG_D: "ZAG",

  VOL: "VOL",

  MC: "MC",
  MC_E: "MC",
  MC_D: "MC",

  MD: "MD",
  ME: "ME",

  PD: "PD",
  PE: "PE",

  CA: "CA",
  CA_E: "CA",
  CA_D: "CA",
} as const;

    const jogadoresDisponiveis = computed(() => {
  if (!elencoAtual.value) {
    return [];
  }

  const posicaoReal =
    slotParaPosicao[
      posicaoAtual.value as keyof typeof slotParaPosicao
    ];

  return elencoAtual.value.jogadores.filter(
    jogador =>
      jogador.posicao === posicaoReal
  );
});

    const overallTime = computed(() => {
        if (!jogadoresSelecionados.value.length) {
            return 0;
        }

        const soma = jogadoresSelecionados.value.reduce(
            (acc, jogador) => acc + jogador.jogador.overall,
            0
        );

        return Math.round(
            soma / jogadoresSelecionados.value.length
        );
    }); 

    type FaseMataMata =
  | "oitavas"
  | "quartas"
  | "semi"
  | "final";

    const faseAtual = ref<
        "draft" |
        "oitavas" |
        "quartas" |
        "semi" |
        "final" |
        "campeao" |
        "eliminado"
    >("draft");



    function sortearAdversario() {
  if (
    faseAtual.value === "draft" ||
    faseAtual.value === "campeao" ||
    faseAtual.value === "eliminado"
  ) {
    return;
  }

  const fase = faseAtual.value as FaseMataMata;

  const lista = adversarios[fase];

  const indice = Math.floor(
    Math.random() * lista.length
  );

  adversarioAtual.value = lista[indice] ?? null;
}

const resultadoUltimaPartida =
  ref<string | null>(null);

function jogarPartida() {
  if (!adversarioAtual.value) {
    return;
  }

  const partida = gerarPlacar(
    jogadoresSelecionados.value,
    adversarioAtual.value
  );

  resumoPartida.value = partida;

  if (!partida.venceu) {
    faseAtual.value = "eliminado";

    resultadoUltimaPartida.value =
      "Eliminado";

    return;
  }

  resultadoUltimaPartida.value =
    "Vitória";

  avancarFase();

  if (faseAtual.value !== "campeao") {
    sortearAdversario();
  }
}

function avancarFase() {
  switch (faseAtual.value) {
    case "oitavas":
      faseAtual.value = "quartas";
      break;

    case "quartas":
      faseAtual.value = "semi";
      break;

    case "semi":
      faseAtual.value = "final";
      break;

    case "final":
      faseAtual.value = "campeao";
      break;
  }
}

function definirFormacao(
  novaFormacao: keyof typeof formacoes
) {
  formacao.value = novaFormacao;
}



    return {
        formacao,

        indicePosicaoAtual,

        jogadoresSelecionados,

        // elencosUtilizados,

        elencoAtual,

        posicoes,

        posicaoAtual,

        draftFinalizado,

        iniciarDraft,

        sortearElenco,

        selecionarJogador,

        jogadoresDisponiveis, resumoPartida,
        overallTime, definirFormacao,
        faseAtual, sortearAdversario, adversarioAtual, resultadoUltimaPartida, jogarPartida, avancarFase
    };
});