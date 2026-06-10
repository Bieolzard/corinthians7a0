<script setup lang="ts">
const draft = useDraftStore();
</script>

<template>
  <section
    v-if="draft.faseAtual !== 'draft'"
    class="libertadores-panel"
  >
    <div class="competition-bar">
      <div class="competition-info">
        <span class="competition">
          🏆 Libertadores
        </span>

        <strong>
          {{ draft.nomesFases[draft.faseAtual] }}
        </strong>
      </div>

      <div class="versus">
        <div class="team">
          <span class="team-name">
            Corinthians
          </span>

          <span class="team-ovr">
            OVR {{ draft.overallTime }}
          </span>
        </div>

        <span class="vs">
          VS
        </span>

        <div class="team">
          <span class="team-name">
            {{ draft.adversarioAtual?.nome }}
          </span>

          <span class="team-ovr">
            OVR
            {{ draft.adversarioAtual?.overall }}
          </span>
        </div>
      </div>

      <button
        class="simulate-btn"
        :disabled="draft.simulandoPartida"
        @click="draft.jogarPartida()"
      >
        {{
          draft.simulandoPartida
            ? "Simulando..."
            : "Simular"
        }}
      </button>
    </div>

    <!-- <div
      v-if="draft.resumoPartida"
      class="resultado-card"
    >
      <h3 class="placar">
        Corinthians
        {{ draft.resumoPartida.golsTime }}

        x

        {{ draft.resumoPartida.golsAdversario }}

        {{ draft.resumoPartida.adversario }}
      </h3>

      <ul class="eventos">
        <li
          v-for="evento in draft.resumoPartida.eventos"
          :key="
            evento.minuto +
            evento.autor
          "
        >
          <span>
            ⚽
            {{ evento.autor }}
          </span>

          <span>
            {{ evento.minuto }}'
          </span>
        </li>
      </ul>
    </div> -->

    <div
      v-if="draft.faseAtual === 'campeao'"
      class="status campeao"
    >
      🏆 CAMPEÃO DA LIBERTADORES
    </div>

    <div
      v-if="draft.faseAtual === 'eliminado'"
      class="status eliminado"
    >
      ❌ ELIMINADO
    </div>
  </section>
</template>

<style scoped>
.libertadores-panel {
  display: flex;

  flex-direction: column;

  gap: 16px;

  margin-bottom: 24px;
}

.competition-bar {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 24px;

  background: #111;

  border: 1px solid #222;

  border-radius: 16px;

  padding: 18px 24px;
}

.competition-info {
  display: flex;

  flex-direction: column;

  gap: 4px;
}

.competition {
  color: #888;

  font-size: .75rem;

  text-transform: uppercase;

  letter-spacing: 1px;
}

.competition-info strong {
  font-size: 1rem;
}

.versus {
  display: flex;

  align-items: center;

  gap: 24px;
}

.team {
  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 4px;
}

.team-name {
  font-weight: 600;
}

.team-ovr {
  color: #999;

  font-size: .85rem;
}

.vs {
  color: #c9a227;

  font-weight: 800;

  font-size: 1.1rem;
}

.simulate-btn {
  background: white;

  color: black;

  border: none;

  border-radius: 10px;

  padding: 12px 20px;

  font-weight: 700;

  cursor: pointer;

  transition: .2s;
}

.simulate-btn:hover {
  transform: translateY(-2px);
}

.simulate-btn:disabled {
  opacity: .6;

  cursor: not-allowed;
}

.resultado-card {
  background: #111;

  border: 1px solid #222;

  border-radius: 16px;

  padding: 18px;
}

.placar {
  margin-bottom: 16px;

  text-align: center;

  font-size: 1.2rem;
}

.eventos {
  display: flex;

  flex-direction: column;

  gap: 10px;

  list-style: none;

  padding: 0;

  margin: 0;
}

.eventos li {
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding-bottom: 8px;

  border-bottom: 1px solid #1f1f1f;
}

.eventos li:last-child {
  border-bottom: none;
}

.status {
  border-radius: 16px;

  padding: 16px;

  text-align: center;

  font-weight: 700;
}

.campeao {
  background:
    linear-gradient(
      180deg,
      rgba(201,162,39,.18),
      rgba(201,162,39,.08)
    );

  color: #c9a227;

  border: 1px solid rgba(201,162,39,.3);
}

.eliminado {
  background:
    linear-gradient(
      180deg,
      rgba(255,107,107,.18),
      rgba(255,107,107,.08)
    );

  color: #ff7675;

  border: 1px solid rgba(255,107,107,.25);
}
</style>