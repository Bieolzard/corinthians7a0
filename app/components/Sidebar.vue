<script setup lang="ts">
const draft = useDraftStore();
</script>

<template>
  <div class="sidebar-content">
  <div class="logo">
    <h1>
      TIMÃO
      <br />
      <span>IMPOSSÍVEL</span>
    </h1>
  </div>

  <DraftSetup
    v-if="draft.jogadoresSelecionados.length === 0"
  />

  <div class="section">
    <div class="section-title">
      Status do Draft
    </div>

    <div class="info">
      <span>Formação</span>
      <strong>{{ draft.formacao }}</strong>
    </div>

    <div class="info">
      <span>Posição</span>
      <strong>{{ draft.posicaoAtual }}</strong>
    </div>

    <div class="info">
      <span>Jogadores</span>
      <strong>
        {{ draft.jogadoresSelecionados.length }}/11
      </strong>
    </div>

    <div class="info">
      <span>OVR</span>
      <strong>{{ draft.overallTime }}</strong>
    </div>
  </div>

  <DraftPlayerSelection
    v-if="!draft.draftFinalizado"
  />
</div>
</template>

<style scoped>
.sidebar-content {
  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 16px;
}

.logo {
  margin-bottom: 8px;
}

.logo h1 {
  font-size: 2rem;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -1px;
}

.logo span {
  color: #c9a227;
}

h1 {
  margin-bottom: 2rem;

  font-size: 2rem;
}

.card {
  background: #0a0a0a;
  background:
linear-gradient(
  180deg,
  #ffffff,
  #e7e7e7
);
color: #c9a227;

  border: 1px solid #333;

  border-radius: 12px;

  padding: 1rem;

  margin-bottom: 1rem;

  display: flex;

  justify-content: space-between;
}

.section {
  background: #111;

  border: 1px solid #222;

  border-radius: 16px;

  padding: 16px;
}

.section-title {
  font-size: .85rem;

  color: #888;

  text-transform: uppercase;

  letter-spacing: 1px;

  margin-bottom: 12px;
}

.info {
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 10px 0;

  border-bottom: 1px solid #1f1f1f;
}

.info:last-child {
  border-bottom: none;
}

.info span {
  color: #888;
}

.info strong {
  color: white;
}
</style>