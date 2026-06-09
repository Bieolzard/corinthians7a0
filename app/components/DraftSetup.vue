<script setup lang="ts">
const draft = useDraftStore();
</script>

<template>
  <section>
    <h2>Draft</h2>

    <h3>Escolha sua formação</h3>

    <label>
      <input
        type="radio"
        :checked="draft.formacao === '4-3-3'"
        @change="draft.definirFormacao('4-3-3')"
      />

      4-3-3
    </label>

    <label>
      <input
        type="radio"
        :checked="draft.formacao === '4-4-2'"
        @change="draft.definirFormacao('4-4-2')"
      />

      4-4-2
    </label>

    <button @click="draft.iniciarDraft()">
      Iniciar Draft
    </button>
  </section>
</template>