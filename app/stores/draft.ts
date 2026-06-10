import { defineStore } from "pinia";
import { jogadoresHistoricos } from "~/data/jogadoresHistoricos";
import { formacoes } from "~/data/formacoes";
import { adversarios, type Adversario } from "~/data/adversarios";
import type { SlotCampo } from "~/types/slot";
import type { Jogador } from "~/types/jogador";
import type { JogadorSelecionado } from "~/types/jogadorSelecionado";
import { gerarPlacar } from "~/composables/useMatchSimulation";
import type { EventoPartida } from "~/types/partida";

export const useDraftStore = defineStore("draft", () => {
  type Formacao = keyof typeof formacoes;
  const simulandoPartida = ref(false);
  const opcoesDraft = ref<Jogador[]>([]);
  const poolJogadores = ref<Jogador[]>([]);
  const formacao = ref<Formacao>("4-3-3");
  const aguardandoContinuacao = ref(false);
  const estadoPartida = ref<"idle" | "transicao" | "fim" | "simulando" | "resultado">(
    "idle",
  );
  const resumoPartida = ref<{
    adversario: string;
    golsTime: number;
    golsAdversario: number;
    eventos: EventoPartida[];
  } | null>(null);
  const jogadoresSelecionados = ref<JogadorSelecionado[]>([]);
  const adversarioAtual = ref<Adversario | null>(null);
  //   const elencosUtilizados = ref<string[]>([]);
const ultimoEvento =
  ref<EventoPartida | null>(
    null
  );
  type FaseCampanha =
    | "draft"
    | "oitavas"
    | "quartas"
    | "semi"
    | "final"
    | "campeao"
    | "eliminado";

  function ehGolDecisivo(
    evento: EventoPartida
  ) {
    const minutosFinais =
      evento.minuto >= 80;

    const diferenca =
      Math.abs(
        placarAtual.value.golsTime -
        placarAtual.value.golsAdversario
      );

    return (
      minutosFinais &&
      diferenca <= 1
    );
  }

  const campanha = ref<
    {
      fase: FaseCampanha;
      adversario: string;
      placar: string;
      venceu: boolean;
    }[]
  >([]);

  const eventoDestaque = ref<EventoPartida | null>(null);

  const eventosVisiveis =
    ref<EventoPartida[]>([]);

  const vagasDisponiveis = ref<SlotCampo[]>([]);

  function iniciarDraft() {
    jogadoresSelecionados.value = [];

    campanha.value = [];

    resumoPartida.value = null;

    resultadoUltimaPartida.value = null;

    eventosVisiveis.value = [];

    ultimoEvento.value = null;

  eventoDestaque.value = null;

  estadoPartida.value = "idle";

    placarAtual.value = {
      golsTime: 0,
      golsAdversario: 0,
    };

    adversarioAtual.value = null;

    faseAtual.value = "draft";

    poolJogadores.value = [...jogadoresHistoricos];

    vagasDisponiveis.value = [...formacoes[formacao.value]];

    gerarOpcoesDraft();
  }

  const draftFinalizado = computed(() => {
    return vagasDisponiveis.value.length === 0;
  });

  function obterSlotsCompativeis(jogador: Jogador) {
    return vagasDisponiveis.value.filter((slot) => {
      const base = slot
        .replace("_E", "")
        .replace("_D", "") as Jogador["posicoes"][number];

      return jogador.posicoes.includes(base);
    });
  }

  async function iniciarFase(fase: FaseMataMata) {
    faseAtual.value = fase;

    // limpa a partida anterior

    eventosVisiveis.value = [];
ultimoEvento.value = null;
    placarAtual.value = {
      golsTime: 0,
      golsAdversario: 0,
    };

    resumoPartida.value = null;

    resultadoUltimaPartida.value = null;
    eventoDestaque.value =
      null;

    aguardandoContinuacao.value = false;

    sortearAdversario();

    estadoPartida.value = "transicao";

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await jogarPartida();
  }

  async function selecionarJogador(jogador: Jogador) {
    const slot = obterSlotsCompativeis(jogador)[0];

    if (!slot) {
      return;
    }

    jogadoresSelecionados.value.push({
      jogador,
      slot,
    });

    vagasDisponiveis.value = vagasDisponiveis.value.filter(
      (vaga) => vaga !== slot,
    );

    // ALTERAR APENAS ESTE TRECHO
    poolJogadores.value = poolJogadores.value.filter(
      (jogadorPool) => jogadorPool.id !== jogador.id,
    );

    if (!draftFinalizado.value) {
      gerarOpcoesDraft();
    } else {
      await iniciarFase("oitavas");
    }
  }

  const overallTime = computed(() => {
    if (!jogadoresSelecionados.value.length) {
      return 0;
    }

    const soma = jogadoresSelecionados.value.reduce(
      (acc, jogador) => acc + jogador.jogador.overall,
      0,
    );

    return Math.round(soma / jogadoresSelecionados.value.length);
  });

  type FaseMataMata = "oitavas" | "quartas" | "semi" | "final";

  const faseAtual = ref<
    "draft" | "oitavas" | "quartas" | "semi" | "final" | "campeao" | "eliminado"
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

    const indice = Math.floor(Math.random() * lista.length);

    adversarioAtual.value = lista[indice] ?? null;
  }

  const resultadoUltimaPartida = ref<string | null>(null);
  const placarAtual = ref({
    golsTime: 0,
    golsAdversario: 0,
  });
  async function jogarPartida() {
    
    estadoPartida.value = "simulando";
    simulandoPartida.value = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (!adversarioAtual.value) {
        return;
      }

      aguardandoContinuacao.value = false;

      eventosVisiveis.value = [];

      placarAtual.value = {
        golsTime: 0,
        golsAdversario: 0,
      };

      const nomeAdversario = adversarioAtual.value.nome;

      const partida = gerarPlacar(
        jogadoresSelecionados.value,
        adversarioAtual.value,
      );

      resumoPartida.value = {
        adversario: nomeAdversario,

        golsTime: partida.golsTime,

        golsAdversario: partida.golsAdversario,

        eventos: partida.eventos,
      };

      campanha.value.push({
  fase: faseAtual.value,
  adversario: nomeAdversario,
  placar: `${partida.golsTime} x ${partida.golsAdversario}`,
  venceu: partida.venceu,
});

      resultadoUltimaPartida.value = partida.venceu ? "Vitória" : "Eliminado";

      for (const evento of partida.eventos) {
  await new Promise(
    resolve =>
      setTimeout(resolve, 1200)
  );

  ultimoEvento.value =
    evento;

  eventosVisiveis.value.push(
    evento
  );

  if (
    evento.time === "corinthians"
  ) {
    placarAtual.value.golsTime++;
  } else {
    placarAtual.value.golsAdversario++;
  }

  if (
    ehGolDecisivo(evento)
  ) {
    eventoDestaque.value =
      evento;

    await new Promise(
      resolve =>
        setTimeout(resolve, 2500)
    );

    eventoDestaque.value =
      null;
  }
}

      await new Promise(
        resolve =>
          setTimeout(resolve, 1000)
      );

      estadoPartida.value =
        "fim";

      await new Promise(
        resolve =>
          setTimeout(resolve, 1500)
      );

      estadoPartida.value =
        "resultado";

      aguardandoContinuacao.value =
        true;
    } finally {
      simulandoPartida.value = false;
    }
  }

  async function continuarCampanha() {
    aguardandoContinuacao.value = false;

    if (resultadoUltimaPartida.value === "Eliminado") {
      faseAtual.value = "eliminado";

      estadoPartida.value = "resultado";

      return;
    }

    avancarFase();

    if (faseAtual.value === "campeao") {
      estadoPartida.value = "resultado";

      return;
    }

    await iniciarFase(faseAtual.value as FaseMataMata);
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
    aguardandoContinuacao.value = false;

    simulandoPartida.value = false;

    eventosVisiveis.value = [];

    placarAtual.value = {
      golsTime: 0,
      golsAdversario: 0,
    };

    faseAtual.value = "draft";

    adversarioAtual.value = null;

    resultadoUltimaPartida.value = null;

    resumoPartida.value = null;

    campanha.value = [];

    jogadoresSelecionados.value = [];

    poolJogadores.value = [];

    opcoesDraft.value = [];
    vagasDisponiveis.value = [];
    estadoPartida.value = "idle";
    eventoDestaque.value =
      null;
    ultimoEvento.value = null;
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
    const posicoesNecessarias = [
      ...new Set(
        vagasDisponiveis.value.map((vaga) =>
          vaga.replace("_E", "").replace("_D", ""),
        ),
      ),
    ];

    const garantidos: Jogador[] = [];

    let poolTemp = [...poolJogadores.value];

    for (const posicao of posicoesNecessarias) {
      const candidatos = poolTemp.filter((jogador) =>
        jogador.posicoes.includes(posicao as Jogador["posicoes"][number]),
      );

      if (!candidatos.length) {
        console.warn(`NENHUM candidato para ${posicao}`);

        continue;
      }

      const jogadorSorteado =
        candidatos[Math.floor(Math.random() * candidatos.length)];

      if (jogadorSorteado) {

        garantidos.push(jogadorSorteado);

        poolTemp = poolTemp.filter((j) => j.id !== jogadorSorteado.id);
      }
    }

    const candidatosExtras = poolTemp.filter(
      (jogador) => obterSlotsCompativeis(jogador).length > 0,
    );

    const extras = candidatosExtras
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.max(0, 11 - garantidos.length));

    opcoesDraft.value = [...garantidos, ...extras].sort(
      () => Math.random() - 0.5,
    );

  }

  function definirFormacao(novaFormacao: keyof typeof formacoes) {
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
    eventoDestaque,
    resumoPartida,
    simulandoPartida,
    nomesFases,
    overallTime,
    definirFormacao,
    proximaFaseLabel,
    faseAtual,
    campanha,
    sortearAdversario,
    vagasDisponiveis,
    obterSlotsCompativeis,
    estadoPartida,
    draftFinalizado,
    placarAtual,
    adversarioAtual,
    eventosVisiveis,
    reiniciarCampanha,
    resultadoUltimaPartida,
    jogarPartida,
    aguardandoContinuacao,
    avancarFase,
    continuarCampanha,
    ultimoEvento
  };
});
