<script setup lang="ts">
defineProps<{
  nome: string;
  posicao?: string;
}>();
</script>

<template>
  <div class="player">
    <div class="avatar">
      {{ nome.charAt(0).toUpperCase() }}
    </div>

    <span class="nome">
      {{ nome }}
    </span>
  </div>
</template>

<style scoped>
.player {
  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 6px;

  user-select: none;

  transition: transform 0.2s ease;
}

.player:hover {
  transform: translateY(-4px);
}

.avatar {
  width: 52px;

  height: 52px;

  border-radius: 999px;

  background: #0f0f0f;

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.2rem;

  font-weight: 800;

  border: 2px solid rgba(255, 255, 255, 0.12);

  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.35);
}

.nome {
  max-width: 90px;

  text-align: center;

  color: white;

  font-size: 13px;

  font-weight: 700;

  line-height: 1.1;

  text-shadow:
    0 2px 4px rgba(0, 0, 0, 0.7);
}
</style>