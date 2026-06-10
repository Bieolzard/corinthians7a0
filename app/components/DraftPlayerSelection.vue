<script setup lang="ts">
const draft = useDraftStore();
</script>

<template>
  <section
    v-if="
      draft.faseAtual === 'draft' &&
      !draft.draftFinalizado
    "
    class="player-selection"
  >
    <div class="selection-header">
      <div>
        <div class="label">
          Rodada do Draft
        </div>

        <h3>
          Escolha uma Lenda
        </h3>
      </div>

      <span class="remaining">
        {{ draft.vagasDisponiveis.length }}
        vagas
      </span>
    </div>

    <div class="current-position">
      Vagas restantes:
      <strong>
        {{
          draft.vagasDisponiveis.join(
            ", "
          )
        }}
      </strong>
    </div>

    <div class="players-list">
      <button
        v-for="
          jogador in draft.opcoesDraft
        "
        :key="jogador.id"
        class="player-btn"
        @click="
          draft.selecionarJogador(
            jogador
          )
        "
      >
        <div>
          <div class="player-name">
            {{ jogador.nome }}
          </div>

          <div class="player-role">
            {{
              jogador.posicoes.join(
                " • "
              )
            }}
          </div>
        </div>

        <div class="player-overall">
          {{ jogador.overall }}
        </div>
      </button>
    </div>
  </section>
</template>

  <style>
  .player-selection {
  background: #111;

  border: 1px solid #222;

  border-radius: 16px;

  padding: 16px;
}

.selection-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 16px;
}

.label {
  font-size: 12px;

  color: #777;

  text-transform: uppercase;

  letter-spacing: 1px;
}

.selection-header h3 {
  margin-top: 4px;

  font-size: 1rem;
}

.year {
  color: #888;
}

.current-position {
  margin-bottom: 12px;

  font-size: .9rem;

  color: #bbb;
}

.players-list {
  display: flex;

  flex-direction: column;

  gap: 8px;
}

.player-btn {
  width: 100%;

  background: #181818;

  border: 1px solid #2a2a2a;

  border-radius: 12px;

  padding: 12px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  color: white;

  cursor: pointer;

  transition: .2s;
}

.player-btn:hover {
  border-color: #c9a227;

  transform: translateX(2px);
}

.player-name {
  font-size: .95rem;

  font-weight: 600;
}

.player-role {
  font-size: .75rem;

  color: #777;
}

.remaining {
  color: #c9a227;

  font-weight: 700;
}

.player-overall {
  color: #c9a227;

  font-size: 1.1rem;

  font-weight: 800;
}
  </style>