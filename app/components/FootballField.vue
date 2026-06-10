<script setup lang="ts">
import type { SlotCampo } from "~/types/slot";
const draft = useDraftStore();

const posicoesCampo: Record<
  SlotCampo,
  {
    top: string;
    left: string;
  }
> = {
  GOL: { top: "88%", left: "50%" },

  LD: { top: "72%", left: "78%" },
  LE: { top: "72%", left: "22%" },

  ZAG_E: {
  top: "72%",
  left: "42%",
},

ZAG_D: {
  top: "72%",
  left: "58%",
},

  VOL: { top: "55%", left: "50%" },

  MC: {
  top: "45%",
  left: "50%",
},

  MC_E: {
  top: "45%",
  left: "40%",
},

MC_D: {
  top: "45%",
  left: "60%",
},

  MD: { top: "35%", left: "70%" },
  ME: { top: "35%", left: "30%" },

  PD: { top: "20%", left: "75%" },
  PE: { top: "20%", left: "25%" },

  CA_E: {
  top: "12%",
  left: "42%",
},

CA: {
  top: "10%",
  left: "50%",
},

CA_D: {
  top: "12%",
  left: "58%",
},
} as const;
</script>

<template>
  <div class="campo">
    <div class="linha-centro" />

<div class="circulo-centro" />

<div class="area-superior" />

<div class="area-inferior" />
    <div
      v-for="selecionado in draft.jogadoresSelecionados"
      :key="selecionado.jogador.id"
      class="jogador"
      :style="{
        top: posicoesCampo[selecionado.slot]?.top,
        left: posicoesCampo[selecionado.slot]?.left
      }"
    >
      <PlayerCard
  :nome="selecionado.jogador.nome"
  :overall="selecionado.jogador.overall"
  :ano="selecionado.jogador.temporada"
  :posicao="selecionado.jogador.posicao"
/>
    </div>
  </div>
</template>

<style scoped>
.campo {
  position: relative;

  width: 100%;
  max-width: 700px;

  height: 700px;

  margin: auto;

  background:
repeating-linear-gradient(
  90deg,
  #0d5a16,
  #0d5a16 60px,
  #116d1c 60px,
  #116d1c 120px
);
overflow: hidden;
border-radius: 20px;

  border: 4px solid white;
}

.linha-centro {
  position: absolute;

  top: 50%;

  left: 0;

  width: 100%;

  height: 2px;

  background: rgba(255,255,255,.6);
}

.circulo-centro {
  position: absolute;

  top: 50%;

  left: 50%;

  width: 120px;

  height: 120px;

  border: 2px solid rgba(255,255,255,.6);

  border-radius: 50%;

  transform: translate(-50%, -50%);
}

.area-superior {
  position: absolute;

  top: 0;

  left: 50%;

  width: 260px;

  height: 120px;

  border: 2px solid rgba(255,255,255,.6);

  transform: translateX(-50%);
}

.area-inferior {
  position: absolute;

  bottom: 0;

  left: 50%;

  width: 260px;

  height: 120px;

  border: 2px solid rgba(255,255,255,.6);

  transform: translateX(-50%);
}

.jogador {
  position: absolute;

  transform: translate(-50%, -50%);

  background: white;

  padding: 8px;

  border-radius: 8px;

  font-size: 12px;
}


</style>