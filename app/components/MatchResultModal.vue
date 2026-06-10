<!-- <script setup lang="ts">
const draft = useDraftStore();
</script>

<template>
  <Teleport to="body">
    <div v-if="draft.modalResultadoAberta" class="overlay">
      <div class="modal">
        <div class="header">
          <span class="competition"> Libertadores </span>

          <h2>Resultado da Partida</h2>
        </div>

        <div class="scoreboard">
          <div class="team">
            <span class="team-name"> Corinthians </span>

            <span class="score">
              {{ draft.placarAtual.golsTime }}
            </span>
          </div>

          <div class="x">X</div>

          <div class="team">
            <span class="team-name">
              {{ draft.resumoPartida?.adversario }}
            </span>

            <span class="score">
              {{ draft.placarAtual.golsAdversario }}
            </span>
          </div>
        </div>
        <div v-if="!draft.aguardandoContinuacao" class="simulating">
          ⚽ Simulando partida...
        </div>

        <div class="events">
          <div
            v-for="evento in draft.eventosVisiveis"
            :key="evento.minuto + evento.autor"
            class="event"
            :class="evento.time"
          >
            <span> ⚽ {{ evento.autor }} </span>

            <span> {{ evento.minuto }}' </span>
          </div>
        </div>

        <div
          v-if="
            draft.aguardandoContinuacao &&
            draft.resultadoUltimaPartida === 'Vitória' &&
            draft.faseAtual !== 'final'
          "
          class="result"
        >
          <div class="result-title">🏆 CLASSIFICADO</div>

          <div class="result-subtitle">
            Próxima fase:
            {{ draft.proximaFaseLabel }}
          </div>
        </div>

        <div
          v-if="
            draft.aguardandoContinuacao &&
            draft.resultadoUltimaPartida === 'Vitória' &&
            draft.faseAtual === 'final'
          "
          class="champion"
        >
          <div class="champion-title">🏆 CAMPEÃO DA LIBERTADORES 🏆</div>

          <div class="champion-subtitle">
            O Timão pintou a américa de preto e branco.
          </div>
        </div>

        <div
          v-if="
            draft.aguardandoContinuacao &&
            draft.resultadoUltimaPartida === 'Eliminado'
          "
          class="result defeat"
        >
          <div class="result-title">💔 ELIMINADO</div>

          <div class="result-subtitle">
            Sua campanha chegou ao fim. Monte outro Timão e tente novamente.
          </div>
        </div>

        <div v-if="draft.aguardandoContinuacao" class="actions">
          <button
            v-if="
              draft.resultadoUltimaPartida === 'Vitória' &&
              draft.faseAtual !== 'final'
            "
            class="continue-btn"
            @click="draft.continuarCampanha()"
          >
            Próxima Fase →
          </button>

          <button v-else class="restart-btn" @click="draft.reiniciarCampanha()">
            🔄 Novo Draft
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.75);

  backdrop-filter: blur(6px);

  display: flex;

  justify-content: center;

  align-items: center;

  z-index: 9999;
}

.modal * {
  color: inherit;
}

.modal {
  color: white;

  width: 100%;

  max-width: 650px;

  background: #111;

  border: 1px solid #222;

  border-radius: 24px;

  padding: 32px;
}

.header {
  text-align: center;

  margin-bottom: 24px;
}

.competition {
  color: #c9a227;

  font-size: 0.85rem;

  text-transform: uppercase;

  letter-spacing: 1px;
}

.header h2 {
  margin-top: 8px;
}

.scoreboard {
  display: flex;

  justify-content: center;

  align-items: center;

  gap: 32px;

  margin: 32px 0;
}

.team {
  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 8px;
}

.team-name {
  color: #999;
}

.score {
  font-size: 5rem;

  font-weight: 800;
}

.x {
  font-size: 2rem;

  color: #c9a227;

  font-weight: 700;
}

.events {
  display: flex;

  flex-direction: column;

  gap: 10px;

  margin-bottom: 24px;
}

.event {
  display: flex;

  justify-content: space-between;

  padding: 10px;

  background: #181818;

  border-radius: 10px;
}

.result {
  text-align: center;

  padding: 20px 0;

  margin-top: 20px;
}

.result-title {
  font-size: 1.4rem;

  font-weight: 700;
}

.result-subtitle {
  color: #999;

  margin-top: 6px;
}

.champion {
  text-align: center;

  padding: 30px 0;
}

.champion-title {
  font-size: 2rem;

  font-weight: 800;

  color: #c9a227;
}

.victory {
  background: rgba(0, 180, 0, 0.15);

  color: #4cd964;
}

.defeat {
  background: rgba(255, 0, 0, 0.15);
  margin-bottom: 20px;
  color: #ff6b6b;
  border-radius: 12px;
}

.continue-btn {
  width: 100%;

  border: none;

  border-radius: 12px;

  padding: 16px;

  background: white;

  color: black;

  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.continue-btn:hover {
  transform: translateY(-2px);
}

.event.corinthians {
  border-left: 4px solid #c9a227;
}

.event.adversario {
  border-left: 4px solid #ff5f5f;
}
.simulating {
  text-align: center;

  padding: 30px;

  color: #c9a227;

  font-size: 1.1rem;

  font-weight: 600;
}

.restart-btn {
  width: 100%;

  border: none;

  border-radius: 12px;

  padding: 16px;

  background: #ff5f5f;

  color: white;

  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;
}

.restart-btn:hover {
  transform: translateY(-2px);

  filter: brightness(1.1);
}
</style> -->
