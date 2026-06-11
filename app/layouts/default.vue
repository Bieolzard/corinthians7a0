<template>
  <div class="app-layout">
    <aside class="sidebar">
      <Sidebar />
    </aside>

    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;

  display: grid;

  grid-template-columns: 340px 1fr;

  background: #111;

  color: white;
}

.sidebar {
  border-right: 1px solid #222;

  background: #0d0d0d;
}

.content {
  padding: 2rem;
}

@media (max-width: 1024px) {
  .app-layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: none;

    border-bottom: 1px solid #222;
  }

  .content {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .content {
    padding: .75rem;
  }
}
</style>