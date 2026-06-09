<script setup lang="ts">
const draft = useDraftStore();
</script>

<template>
  <section
    v-if="draft.faseAtual !== 'draft'"
  >
    <h2>Libertadores</h2>

    <p>
      Fase:
      {{ draft.faseAtual }}
    </p>

    <p>
      Adversário:
      {{ draft.adversarioAtual?.nome }}
    </p>

    <p>
      Overall:
      {{ draft.adversarioAtual?.overall }}
    </p>

    <button
      @click="draft.jogarPartida()"
    >
      Simular Partida
    </button>

    <p
      v-if="draft.resultadoUltimaPartida"
    >
      Resultado:
      {{ draft.resultadoUltimaPartida }}
    </p>

    <h1
      v-if="draft.faseAtual === 'campeao'"
    >
      🏆 CAMPEÃO
    </h1>

    <h1
      v-if="draft.faseAtual === 'eliminado'"
    >
      ❌ ELIMINADO
    </h1>
  </section>
</template>