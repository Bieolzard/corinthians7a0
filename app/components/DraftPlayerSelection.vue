<script setup lang="ts">
const draft = useDraftStore();
</script>

<template>
  <section v-if="draft.elencoAtual">
    <h2>
      {{ draft.elencoAtual.nome }}
    </h2>

    <p>
      Ano:
      {{ draft.elencoAtual.ano }}
    </p>

    <p>
      Posição Atual:
      {{ draft.posicaoAtual }}
    </p>

    <ul>
      <li
        v-for="jogador in draft.jogadoresDisponiveis"
        :key="jogador.id"
      >
        <button
          @click="draft.selecionarJogador(jogador)"
        >
          {{ jogador.nome }}
          ({{ jogador.overall }})
        </button>
      </li>
    </ul>
  </section>
</template>