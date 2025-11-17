<template>
  <div>
    <nav style="background:#007bff; padding:10px; color:white;">
      <router-link to="/" style="margin-right:15px; color:white;">Accueil</router-link>
      <router-link to="/add" style="color:white;">Ajouter un emploi</router-link>
    </nav>

    <main style="padding:20px;">
      <router-view />
    </main>
  </div>
</template>
