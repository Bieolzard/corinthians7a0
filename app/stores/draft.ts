import { defineStore } from "pinia";
import { jogadoresHistoricos } from "~/data/jogadoresHistoricos";
import { formacoes } from "~/data/formacoes";
import { adversarios, type Adversario } from "~/data/adversarios";
import type { SlotCampo } from "~/types/slot";
import type { Jogador } from "~/types/jogador";
import type { JogadorSelecionado } from "~/types/jogadorSelecionado";
import { gerarPlacar }
  from "~/composables/useMatchSimulation";

export const useDraftStore = defineStore("draft", () => {
    type Formacao = keyof typeof formacoes;
  const simulandoPartida = ref(false)
  const opcoesDraft =
  ref<Jogador[]>([]);
  const poolJogadores =
  ref<Jogador[]>([]);
  const formacao = ref<Formacao>("4-3-3");
  const modalResultadoAberta =
    ref(false);
  const aguardandoContinuacao =
  ref(false);
  const resumoPartida = ref<{
  adversario: string;
  golsTime: number;
  golsAdversario: number;

  eventos: {
    minuto: number;
    autor: string;
    time: "corinthians" | "adversario";
  }[];
} | null>(null);

   const jogadoresSelecionados = ref<
  JogadorSelecionado[]
    >([]);
    const adversarioAtual =
  ref<Adversario | null>(null);
    //   const elencosUtilizados = ref<string[]>([]);
  
    type FaseCampanha =
  | "oitavas"
  | "quartas"
  | "semi"
  | "final"
  | "campeao"
  | "eliminado";
  
  const campanha = ref<
  {
    fase: FaseCampanha;
    adversario: string;
    placar: string;
  }[]
>([]);

  const eventosVisiveis = ref<
  {
    minuto: number;
    autor: string;
    time: "corinthians" | "adversario";
  }[]
    >([]);
  
  const vagasDisponiveis =
  ref<SlotCampo[]>([]);

 function iniciarDraft() {
  jogadoresSelecionados.value = [];

  campanha.value = [];

  resumoPartida.value = null;

  resultadoUltimaPartida.value = null;

  eventosVisiveis.value = [];

  placarAtual.value = {
    golsTime: 0,
    golsAdversario: 0,
  };

  adversarioAtual.value = null;

  faseAtual.value = "draft";

  poolJogadores.value = [
    ...jogadoresHistoricos,
  ];

  vagasDisponiveis.value = [
    ...formacoes[formacao.value],
  ];

  gerarOpcoesDraft();
}
  
  const draftFinalizado =
  computed(() => {
    return (
      vagasDisponiveis.value.length === 0
    );
  });

  function obterSlotsCompativeis(
  jogador: Jogador
) {
  return vagasDisponiveis.value.filter(
    slot => {
      const base =
  slot
    .replace("_E", "")
    .replace("_D", "") as
      Jogador["posicoes"][number];

      return jogador.posicoes.includes(base);
    }
  );
}

    function selecionarJogador(
  jogador: Jogador
) {
  const slot =
    obterSlotsCompativeis(
      jogador
    )[0];

  if (!slot) {
    return;
  }

  jogadoresSelecionados.value.push({
    jogador,
    slot,
  });

  vagasDisponiveis.value =
    vagasDisponiveis.value.filter(
      vaga => vaga !== slot
    );

  poolJogadores.value =
    poolJogadores.value.filter(
      jogadorPool =>
        !opcoesDraft.value.some(
          opcao =>
            opcao.id === jogadorPool.id
        )
    );

  if (!draftFinalizado.value) {
    gerarOpcoesDraft();
  } else {
    faseAtual.value =
      "oitavas";

    sortearAdversario();
  }
}

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

  const nomesFases = {
  
  oitavas: "Oitavas de Final",

  quartas: "Quartas de Final",

  semi: "Semifinal",

  final: "Final",

  campeao: "Campeão",

  eliminado: "Eliminado",
} as const;


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
const placarAtual = ref({
  golsTime: 0,
  golsAdversario: 0,
});
async function jogarPartida() {
  simulandoPartida.value = true;

  try {
    await new Promise(
      resolve =>
        setTimeout(resolve, 1500)
    );

    if (!adversarioAtual.value) {
      return;
    }

    aguardandoContinuacao.value = false;

    eventosVisiveis.value = [];

    placarAtual.value = {
      golsTime: 0,
      golsAdversario: 0,
    };

    const nomeAdversario =
      adversarioAtual.value.nome;

    const partida = gerarPlacar(
      jogadoresSelecionados.value,
      adversarioAtual.value
    );

    resumoPartida.value = {
      adversario: nomeAdversario,

      golsTime: partida.golsTime,

      golsAdversario:
        partida.golsAdversario,

      eventos: partida.eventos,
    };

    campanha.value.push({
      fase:
        faseAtual.value as FaseCampanha,

      adversario: nomeAdversario,

      placar:
        `${partida.golsTime} x ${partida.golsAdversario}`,
    });

    resultadoUltimaPartida.value =
      partida.venceu
        ? "Vitória"
        : "Eliminado";

    modalResultadoAberta.value =
      true;

    for (const evento of partida.eventos) {
  await new Promise(
    resolve =>
      setTimeout(resolve, 800)
  );

  eventosVisiveis.value.push(
    evento
  );

  if (
    evento.time === "corinthians"
  ) {
    placarAtual.value.golsTime++;
  } else {
    placarAtual.value
      .golsAdversario++;
  }
}

    await new Promise(
      resolve =>
        setTimeout(resolve, 1000)
    );

    aguardandoContinuacao.value =
      true;
  } finally {
    simulandoPartida.value = false;
  }
}

  function continuarCampanha() {
  aguardandoContinuacao.value =
    false;

  modalResultadoAberta.value =
    false;

  if (
    resultadoUltimaPartida.value ===
    "Eliminado"
  ) {
    faseAtual.value =
      "eliminado";

    return;
  }

  avancarFase();

  if (
    faseAtual.value !== "campeao"
  ) {
    sortearAdversario();
  }
  }

  const proximaFaseLabel = computed(() => {
  switch (faseAtual.value) {
    case "oitavas":
      return "Quartas de Final";

    case "quartas":
      return "Semifinal";

    case "semi":
      return "Final";

    case "final":
      return "Campeão";

    default:
      return "";
  }
});
  
  function reiniciarCampanha() {
  modalResultadoAberta.value =
    false;

  aguardandoContinuacao.value =
    false;

  simulandoPartida.value =
    false;

  eventosVisiveis.value = [];

  placarAtual.value = {
    golsTime: 0,
    golsAdversario: 0,
  };

  faseAtual.value = "draft";

  adversarioAtual.value = null;

  resultadoUltimaPartida.value =
    null;

  resumoPartida.value = null;

  campanha.value = [];

  jogadoresSelecionados.value = [];

  poolJogadores.value = [];
  

    opcoesDraft.value = [];
    vagasDisponiveis.value = [];
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
  
  function gerarOpcoesDraft() {
  const embaralhados = [
    ...poolJogadores.value,
  ].sort(
    () => Math.random() - 0.5
  );

  opcoesDraft.value =
    embaralhados.slice(0, 11);
}

function definirFormacao(
  novaFormacao: keyof typeof formacoes
) {
  formacao.value = novaFormacao;
}



    return {
      formacao,
      poolJogadores,

        jogadoresSelecionados,

        // elencosUtilizados,

       opcoesDraft,

        iniciarDraft,

        selecionarJogador,

        resumoPartida, simulandoPartida, nomesFases,
        overallTime, definirFormacao, proximaFaseLabel,
        faseAtual, campanha, sortearAdversario, vagasDisponiveis,
obterSlotsCompativeis,
draftFinalizado, placarAtual, adversarioAtual, eventosVisiveis, reiniciarCampanha, resultadoUltimaPartida, jogarPartida, aguardandoContinuacao, modalResultadoAberta ,avancarFase, continuarCampanha
    };
});