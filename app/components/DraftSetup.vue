<script setup lang="ts">
const draft = useDraftStore();
</script>

<template>
  <section class="draft-setup" v-if="
    draft.jogadoresSelecionados.length === 0
  ">
    <h2 class="title">
      Monte seu Corinthians
    </h2>

    <p class="subtitle">
      Escolha a formação inicial
    </p>

    <div class="formations">
      <button
        class="formation-btn"
        :class="{
          active:
            draft.formacao === '4-3-3'
        }"
        @click="
          draft.definirFormacao('4-3-3')
        "
      >
        4-3-3
      </button>

      <button
        class="formation-btn"
        :class="{
          active:
            draft.formacao === '4-4-2'
        }"
        @click="
          draft.definirFormacao('4-4-2')
        "
      >
        4-4-2
      </button>
    </div>

    <button
      class="start-btn"
      @click="draft.iniciarDraft()"
    >
      Iniciar Draft
    </button>
  </section>
</template>

<style scoped>
.draft-setup {
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;

  font-weight: 700;

  margin-bottom: .5rem;
}

.subtitle {
  color: #888;

  margin-bottom: 1rem;
}

.formations {
  display: flex;

  gap: 12px;

  margin-bottom: 1rem;
}

.formation-btn {
  background: #181818;

  color: white;

  border: 1px solid #333;

  border-radius: 12px;

  padding: 12px 20px;

  cursor: pointer;

  transition: .2s;
}

.formation-btn:hover {
  border-color: white;
}

.formation-btn.active {
  background: white;

  color: black;

  font-weight: 700;
}

.start-btn {
  background: white;

  color: black;

  border: none;

  border-radius: 12px;

  padding: 12px 24px;

  font-weight: 700;

  cursor: pointer;
}
</style>