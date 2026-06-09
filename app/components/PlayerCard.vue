<script setup lang="ts">
defineProps<{
  nome: string;
  overall: number;
  ano: number;
  posicao?: string;
}>();
</script>

<template>
  <div class="card">
    <div class="overall">
      {{ overall }}
    </div>

    <div class="nome">
      {{ nome }}
    </div>

    <div class="ano">
      {{ ano }}
    </div>

    <div class="posicao">
      {{ posicao }}
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 110px;

  background:
    linear-gradient(
      180deg,
      #ffffff,
      #e8e8e8
    );

  color: #111;

  border-radius: 16px;

  padding: 10px;

  text-align: center;

  border: 2px solid #cfcfcf;

  box-shadow:
    0 10px 20px rgba(0,0,0,.25);

  transition: all .2s ease;
}

.card:hover {
  transform:
    translateY(-4px);

  box-shadow:
    0 16px 28px rgba(0,0,0,.35);
}

.overall {
  font-size: 24px;

  font-weight: 900;

  color: #111;
}

.nome {
   margin-top: 8px;

  font-size: 13px;

  font-weight: 700;

  color: #111;
}

.ano {
  margin-top: 4px;

  font-size: 10px;

  opacity: .7;
}

.posicao {
  margin-top: 4px;

  font-size: 10px;

  font-weight: 700;

  color: #666;
}
</style>