<script setup lang="ts">
const draft = useDraftStore();
</script>

<template>
  <div class="sidebar-content">
    <h1>
      TIMÃO
      <br />
      IMPOSSÍVEL
    </h1>

    <div class="card">
      <span>Formação</span>

      <strong>
        {{ draft.formacao }}
      </strong>
    </div>

    <div class="card">
      <span>Overall</span>

      <strong>
        {{ draft.overallTime }}
      </strong>
    </div>

    <div class="card">
      <span>Jogadores</span>

      <strong>
        {{ draft.jogadoresSelecionados.length }}/11
      </strong>
    </div>

    <div
      class="card"
      v-if="draft.faseAtual !== 'draft'"
    >
      <span>Libertadores</span>

      <strong>
        {{ draft.faseAtual }}
      </strong>
    </div>
  </div>
</template>

<style scoped>
.sidebar-content {
  padding: 2rem;
}

h1 {
  margin-bottom: 2rem;

  font-size: 2rem;
}

.card {
  background: #191919;

  border: 1px solid #333;

  border-radius: 12px;

  padding: 1rem;

  margin-bottom: 1rem;

  display: flex;

  justify-content: space-between;
}
</style>