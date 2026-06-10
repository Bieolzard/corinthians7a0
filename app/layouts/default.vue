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

  grid-template-columns: 400px 1fr;

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
</style>