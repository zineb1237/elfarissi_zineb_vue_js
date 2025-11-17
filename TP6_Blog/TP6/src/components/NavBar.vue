<template>
  <nav class="navbar">
    <h2 class="logo">My Blog</h2>

    <ul class="links">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/create">Add Post</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  background: #05398d; /* Bleu foncé moderne */
  padding: 12px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.logo {
  color: #f8fafc; /* Couleur claire */
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: 1px;
}

.links {
  display: flex;
  gap: 25px;
  list-style: none;
}

.links a {
  color: #f8fafc;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.links a:hover {
  background-color: #2e528b; /* bleu léger au survol */
  color: white;
  text-decoration: none;
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .links {
    flex-direction: column;
    width: 100%;
    gap: 10px;
    margin-top: 10px;
  }

  .links a {
    width: 100%;
    text-align: center;
  }
}
</style>
