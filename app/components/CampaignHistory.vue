<script setup lang="ts">
const draft = useDraftStore();
</script>

<template>
  <section
  v-if="draft.campanha.length"
  class="campaign-card"
>
  <h3>📜 Campanha</h3>

  <div
    v-for="partida in draft.campanha"
    :key="
      partida.fase +
      partida.adversario
    "
    class="campaign-item"
  >
    <div class="dot"></div>

    <div>
      <strong>
        {{
          draft.nomesFases[
            partida.fase
          ]
        }}
      </strong>

      <p>
        Corinthians
        {{ partida.placar }}
        {{ partida.adversario }}
      </p>
    </div>
  </div>
</section>
</template>