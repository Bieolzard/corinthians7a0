<script setup lang="ts">
const draft = useDraftStore();
</script>

<template>
  <section>
    <h2>Time Montado</h2>

    <p>
      Formação:
      {{ draft.formacao }}
    </p>

    <p>
      {{ draft.jogadoresSelecionados.length }}/11
    </p>

    <p>
      Overall:
      {{ draft.overallTime }}
    </p>

    <ul>
      <li
  v-for="selecionado in draft.jogadoresSelecionados"
  :key="selecionado.jogador.id"
>
  {{ selecionado.jogador.nome }}
  -
  {{ selecionado.slot }}
</li>
    </ul>
  </section>
</template>