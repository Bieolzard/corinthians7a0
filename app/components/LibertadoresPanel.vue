<script setup lang="ts">
const draft = useDraftStore();
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="draft.faseAtual !== 'draft'" class="next-phase-overlay">
        <!-- TRANSIÇÃO -->

        <template v-if="draft.estadoPartida === 'transicao'">
          <div class="phase-content">
            <span class="competition"> Libertadores </span>

            <h2 class="phase-name">
              {{ draft.nomesFases[draft.faseAtual] }}
            </h2>

            <div class="phase-subtitle">{{ draft.adversarioAtual?.descricao }}</div>

            <div class="versus-preview">
              <div class="preview-team">
                <span> Corinthians </span>

                <strong>
                  OVR
                  {{ draft.overallTime }}
                </strong>
              </div>

              <span class="preview-vs"> VS </span>

              <div class="preview-team">
                <span>
                  {{ draft.adversarioAtual?.nome }}
                </span>

                <strong>
                  OVR
                  {{ draft.adversarioAtual?.overall }}
                </strong>
              </div>
            </div>
          </div>
        </template>

        <!-- SIMULAÇÃO -->

        <template v-else-if="draft.estadoPartida === 'simulando'">
          <div class="match-screen">
            <div class="competition">Libertadores</div>

            <div class="simulating">Simulando partida...</div>

            <div class="scoreboard">
              <div class="team">
                <span> Corinthians </span>

                <span class="score">
                  {{ draft.placarAtual.golsTime }}
                </span>
              </div>

              <div class="x">X</div>

              <div class="team">
                <span>
                  {{ draft.adversarioAtual?.nome }}
                </span>

                <span class="score">
                  {{ draft.placarAtual.golsAdversario }}
                </span>
              </div>
            </div>
            <div
  v-if="draft.ultimoEvento"
  class="broadcast-banner"
>
  <div class="broadcast-live">
    AO VIVO
  </div>

  <div class="broadcast-content">
    <div class="broadcast-title">
      {{
        draft.ultimoEvento.time ===
        "corinthians"
          ? "GOOOL DO CORINTHIANS"
          : "GOL DO ADVERSÁRIO"
      }}
    </div>

    <div class="broadcast-description">
      {{
        draft.ultimoEvento.descricao
      }}
    </div>
  </div>
</div>

            <div class="events">
              <div
                v-for="evento in draft.eventosVisiveis"
                :key="evento.minuto + evento.autor"
                class="event"
                :class="evento.time"
              >
                <div class="event-minute">{{ evento.minuto }}'</div>

                <div class="event-content">
                  <div class="event-author">⚽ {{ evento.autor }}</div>

                  <div class="event-description">
                    {{ evento.descricao }}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </template>

        <!-- APITO FINAL -->
<template
  v-else-if="
    draft.estadoPartida ===
    'fim'
  "
>
  <div class="match-screen final-whistle">
    <div class="whistle-label">
      APITO FINAL
    </div>

    <div class="whistle-score">
      Corinthians
      {{ draft.placarAtual.golsTime }}

      ×

      {{ draft.placarAtual.golsAdversario }}

      {{ draft.adversarioAtual?.nome }}
    </div>
  </div>
</template>


        <!-- RESULTADO -->

<template
  v-else-if="
    draft.estadoPartida ===
    'resultado'
  "
>
  <div class="match-screen">
    <Transition
      name="result-reveal"
      appear
    >
      <div class="result-container">

        <!-- CLASSIFICADO -->

        <div
          v-if="
            draft.resultadoUltimaPartida === 'Vitória' &&
            draft.faseAtual !== 'final'
          "
          class="result"
        >
          <div class="result-line"></div>

          <div class="result-title">
            CLASSIFICADO
          </div>

          <div class="result-score">
            Corinthians
            {{ draft.resumoPartida?.golsTime }}

            ×

            {{ draft.resumoPartida?.golsAdversario }}

            {{ draft.resumoPartida?.adversario }}
          </div>

          <div class="result-subtitle">
            {{ draft.proximaFaseLabel }}
          </div>
        </div>

        <!-- CAMPEÃO -->

        <div
          v-else-if="
            draft.resultadoUltimaPartida === 'Vitória'
          "
          class="champion"
        >
          <div class="result-line"></div>

          <div class="champion-title">
            CAMPEÃO DA LIBERTADORES
          </div>

          <div class="champion-subtitle">
            O Timão pintou a América de preto e branco.
          </div>
        </div>

        <!-- ELIMINADO -->

        <div
  v-else-if="
    draft.faseAtual === 'final'
  "
  class="result vice"
>
  <div class="result-line"></div>

  <div class="result-title">
    VICE-CAMPEÃO
  </div>

  <div class="result-score">
    Corinthians
    {{ draft.resumoPartida?.golsTime }}

    ×

    {{ draft.resumoPartida?.golsAdversario }}

    {{ draft.resumoPartida?.adversario }}
  </div>

  <div class="result-subtitle">
    A Glória Eterna escapou por pouco.
  </div>
</div>

<div
  v-else
  class="result defeat"
>
  <div class="result-line"></div>

  <div class="result-title">
    ELIMINADO
  </div>

  <div class="result-score">
    Corinthians
    {{ draft.resumoPartida?.golsTime }}

    ×

    {{ draft.resumoPartida?.golsAdversario }}

    {{ draft.resumoPartida?.adversario }}
  </div>

  <div class="result-subtitle">
    Sua campanha chegou ao fim.
  </div>
</div>

        <!-- AÇÕES -->

        <div class="actions">
          <button
            v-if="
              draft.resultadoUltimaPartida === 'Vitória' &&
              draft.faseAtual !== 'final'
            "
            class="continue-btn"
            @click="
              draft.continuarCampanha()
            "
          >
            Continuar Campanha
          </button>

          <button
            v-else
            class="restart-btn"
            @click="
              draft.reiniciarCampanha()
            "
          >
            Montar Novo Time
          </button>
        </div>

      </div>
    </Transition>
  </div>
</template>
      </div>
    </Transition>
    <Transition name="goal">
      <div v-if="draft.eventoDestaque" class="goal-overlay">
        <div class="goal-type">
          {{
            draft.eventoDestaque.time === "corinthians"
              ? "GOOOL"
              : "GOL DO ADVERSÁRIO"
          }}
        </div>

        <div class="goal-player">
          {{ draft.eventoDestaque.autor }}
        </div>

        <div class="goal-description">
          {{ draft.eventoDestaque.descricao }}
        </div>
      </div>
    </Transition>
  </Teleport>
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

  font-size: 0.75rem;

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

  justify-content: center;

  gap: 4px;

  min-width: 0;

  text-align: center;
}

.team span:first-child {
  max-width: 120px;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  font-size: .9rem;
}

.team-name {
  font-weight: 600;
}

.team-ovr {
  color: #999;

  font-size: 0.85rem;
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

  transition: 0.2s;
}

.simulate-btn:hover {
  transform: translateY(-2px);
}

.simulate-btn:disabled {
  opacity: 0.6;

  cursor: not-allowed;
}

.status {
  border-radius: 16px;

  padding: 16px;

  text-align: center;

  font-weight: 700;
}

.campeao {
  background: linear-gradient(
    180deg,
    rgba(201, 162, 39, 0.18),
    rgba(201, 162, 39, 0.08)
  );

  color: #c9a227;

  border: 1px solid rgba(201, 162, 39, 0.3);
}

.eliminado {
  background: linear-gradient(
    180deg,
    rgba(255, 107, 107, 0.18),
    rgba(255, 107, 107, 0.08)
  );

  color: #ff7675;

  border: 1px solid rgba(255, 107, 107, 0.25);
}
.next-phase-overlay {
  position: fixed;

  inset: 0;

  z-index: 9999;

  background: linear-gradient(180deg, #050505 0%, #0f0f0f 100%);

  display: flex;

  justify-content: center;

  align-items: center;

  overflow: hidden;
}

.phase-content {
  text-align: center;

  color: white;

  animation: phaseZoom 2.5s ease;
}

.phase-name {
  font-size: clamp(
    2rem,
    8vw,
    4rem
  );

  line-height: 1.1;

  word-break: break-word;

  font-weight: 800;

  color: #c9a227;

  text-transform: uppercase;

  letter-spacing: 3px;

  margin: 12px 0;
}

.phase-subtitle {
  color: #999;

  font-size: 1rem;

  margin-bottom: 32px;
}

.versus-preview {
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 48px;
}

.preview-team {
  display: flex;

  flex-direction: column;

  gap: 8px;
}

.preview-team strong {
  color: #c9a227;
}

.preview-vs {
  font-size: 2rem;

  font-weight: 800;

  color: #c9a227;
}

.match-screen {
  width: min(900px, 95vw);

  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: clamp(16px, 4vw, 48px);

  color: white;
}

.scoreboard {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    auto
    minmax(0, 1fr);

  align-items: center;

  gap: 16px;

  margin: 48px 0;

  padding: clamp(
    16px,
    4vw,
    40px
  );

  background: linear-gradient(
    180deg,
    rgba(255,255,255,.04),
    rgba(255,255,255,.02)
  );

  border: 1px solid #222;

  border-radius: 20px;
}

.score {
  font-size: clamp(
    3.5rem,
    12vw,
    7rem
  );

  font-weight: 900;

  line-height: 1;
}

.simulating {
  text-align: center;

  padding: 20px;

  color: #c9a227;

  font-size: 1.1rem;

  font-weight: 600;

  animation: pulse 1.2s infinite;
}

.broadcast-banner {
  margin: 24px auto;

  width: 100%;

  max-width: 720px;

  display: flex;

  overflow: hidden;

  border-radius: 14px;

  background: #101010;

  border: 1px solid #252525;

  animation: bannerEnter 0.35s ease;
}

.broadcast-live {
  background: linear-gradient(
    135deg,
    #ff2d2d,
    #b80000
  );

  color: white;

  font-size: 0.75rem;

  font-weight: 800;

  letter-spacing: 2px;

  text-transform: uppercase;

  padding: 0 18px;

  display: flex;

  align-items: center;

  justify-content: center;

  min-width: 110px;
}

.broadcast-live::before {
  content: "";

  width: 8px;

  height: 8px;

  border-radius: 50%;

  background: white;

  margin-right: 8px;

  animation: livePulse 1s infinite;
}

@keyframes livePulse {
  0% {
    opacity: 1;
  }

  50% {
    opacity: .3;
  }

  100% {
    opacity: 1;
  }
}

.broadcast-content {
  flex: 1;

  padding: 14px 18px;
}

.broadcast-title {
  font-size: 0.75rem;

  color: #c9a227;

  text-transform: uppercase;

  letter-spacing: 1px;

  margin-bottom: 4px;
}

.broadcast-description {
  color: white;

  font-size: 0.95rem;
}

@keyframes bannerEnter {
  from {
    opacity: 0;

    transform: translateY(-10px);
  }

  to {
    opacity: 1;

    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.5;
  }
}

.continue-btn,
.restart-btn {
  min-width: 260px;

  width: auto;

  padding: 14px 28px;

  background: transparent;

  border: 1px solid rgba(201, 162, 39, 0.4);

  color: #c9a227;

  border-radius: 999px;

  font-weight: 600;

  letter-spacing: 1px;

  cursor: pointer;

  transition: all 0.25s ease;
}

/* .continue-btn {
  background: white;

  color: black;
} */

.restart-btn {
  background: rgba(255, 255, 255, 0.04);

  border: 1px solid rgba(255, 255, 255, 0.12);

  color: #d4d4d4;
}

.continue-btn:hover,
.restart-btn:hover {
  background: rgba(201, 162, 39, 0.08);

  border-color: rgba(201, 162, 39, 0.9);

  transform: translateY(-2px);
}

.x {
  font-size: clamp(
    1.5rem,
    5vw,
    2rem
  );

  display: flex;
  align-items: center;
  justify-content: center;
}

.events {
  flex: 1;
  width: 100%;
max-height: 420px;
  max-width: 700px;

  margin: 32px auto 0;

  display: flex;

  flex-direction: column;

  gap: 12px;
  
}

.event {
  display: flex;

  justify-content: space-between;

  padding: 12px;

  background: #181818;

  border-radius: 10px;

  animation: eventAppear 0.3s ease;
}

.event {
  animation: goalReveal 0.5s ease;
}

@keyframes goalReveal {
  from {
    opacity: 0;

    transform: translateY(20px);
  }

  to {
    opacity: 1;

    transform: translateY(0);
  }
}

.event.corinthians {
  border-left: 4px solid #c9a227;
}

.event.adversario {
  border-left: 4px solid #ff6b6b;
}

.result {
  text-align: center;

  margin-top: 28px;
}

.result {
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;
}

.result-title {
  font-size: clamp(
    2rem,
    8vw,
    3rem
  );

  font-weight: 800;

  letter-spacing: 4px;

  text-transform: uppercase;
  animation:
  resultPop .8s ease;
}

@keyframes resultPop {
  0% {
    opacity: 0;

    transform:
      scale(.8);
  }

  60% {
    transform:
      scale(1.08);
  }

  100% {
    opacity: 1;

    transform:
      scale(1);
  }
}

.result-subtitle {
  margin-top: 16px;

  font-size: 1.2rem;

  color: #c9a227;

  letter-spacing: 2px;

  text-transform: uppercase;
  opacity: 0;

  animation:
    fadeUp .8s ease .6s forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;

    transform:
      translateY(12px);
  }

  to {
    opacity: 1;

    transform:
      translateY(0);
  }
}

.champion {
  text-align: center;

  margin-top: 30px;
}

.champion-title {
  font-size: 2rem;

  font-weight: 800;

  color: #c9a227;
}

.result-line {
  width: 180px;

  height: 2px;

  margin: 0 auto 40px;

  background: linear-gradient(90deg, transparent, #c9a227, transparent);
}

.result-score {
  margin-top: 24px;

  font-size: clamp(
    1.2rem,
    5vw,
    2rem
  );

  font-weight: 700;

  color: white;
  opacity: 0;

  animation:
    fadeUp .8s ease .3s forwards;
}

.champion-subtitle {
  margin-top: 8px;

  color: #999;
}

.actions {
  margin-top: 48px;

  display: flex;

  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;

  transform: scale(1.05);
}
.event-minute {
  min-width: 55px;

  font-size: 1.3rem;

  font-weight: 800;

  color: #c9a227;
}

.goal-overlay {
  position: fixed;
  inset: 0;

  z-index: 10000;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.55);
backdrop-filter: blur(6px);
}
.goal-overlay {
  animation: goalFlash .4s ease;
}

@keyframes goalFlash {
  from {
    background: rgba(201, 162, 39, 0.15);
  }

  to {
    background: rgba(0, 0, 0, 0.55);
  }
}

.goal-type {
  font-size: clamp(
    2rem,
    10vw,
    5rem
  );

  text-align: center;

  font-weight: 900;

  color: #c9a227;

  text-transform: uppercase;

  letter-spacing: 6px;

  margin-bottom: 24px;

  animation: goalPop .4s ease;
}

.goal-player {
  font-size: clamp(
    1.4rem,
    6vw,
    3rem
  );

  text-align: center;

  font-weight: 800;

  color: white;

  margin-bottom: 16px;
}

.goal-description {
  font-size: 1.3rem;

  color: #d1d1d1;

  text-align: center;

  max-width: 600px;
}

.goal-enter-active,
.goal-leave-active {
  transition:
    opacity .4s ease,
    transform .4s ease;
}

.goal-enter-from,
.goal-leave-to {
  opacity: 0;

  transform: scale(1.08);
}

@keyframes goalPop {
  from {
    opacity: 0;

    transform:
      translateY(20px)
      scale(.9);
  }

  to {
    opacity: 1;

    transform:
      translateY(0)
      scale(1);
  }
}

.event-author {
  font-weight: 700;

  margin-bottom: 4px;
}

.event-description {
  color: #999;

  line-height: 1.5;
}

@keyframes phaseZoom {
  from {
    opacity: 0;
    transform: scale(1.08);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes eventAppear {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-reveal-enter-active {
  transition:
    opacity .8s ease,
    transform .8s ease;
}

.result-reveal-enter-from {
  opacity: 0;

  transform:
    translateY(30px);
}

.final-whistle {
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 24px;

  animation:
    whistleReveal 1s ease;
}

.whistle-label {
  font-size: 1rem;

  letter-spacing: 4px;

  text-transform: uppercase;

  color: #999;
}

.whistle-score {
  font-size: clamp(
    1.8rem,
    8vw,
    4rem
  );
  text-align: center;

  font-weight: 800;

  color: white;
}

@keyframes whistleReveal {
  from {
    opacity: 0;

    transform:
      translateY(20px);
  }

  to {
    opacity: 1;

    transform:
      translateY(0);
  }
}

.vice {
  color: #d6d6d6;
}

.vice .result-title {
  color: #c0c0c0;
}

.vice .result-line {
  background:
    linear-gradient(
      90deg,
      transparent,
      #c0c0c0,
      transparent
    );
}

@media (max-width: 768px) {
  .versus-preview {
    flex-direction: column;

    gap: 16px;
  }

  .preview-vs {
    font-size: 1.5rem;
  }

   .event {
  flex-direction: column;

  justify-content: flex-start;

  gap: 6px;
}

  .event-minute {
    min-width: auto;

    font-size: 1rem;
  }
  .continue-btn,
  .restart-btn {
    width: 100%;

    min-width: unset;

    max-width: 320px;
  }

   .scoreboard {
    grid-template-columns:
      minmax(0, 1fr)
      auto
      minmax(0, 1fr);

    gap: 12px;
  }

  .events {
  max-height: 260px;
}
}
</style>
