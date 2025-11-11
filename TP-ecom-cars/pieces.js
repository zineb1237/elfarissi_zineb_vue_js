const { createApp } = Vue;

createApp({
  data() {
    return {
      recherche: "",
      categorieSelectionnee: "",
      filtreDisponible: false,
      triPrix: "",
      panier: [],
      pieces: [
  { id: 1, nom: "Batterie 12V", prix: 120, categorie: "Électricité", image: "./images/PC1.jpg", disponible: true },
  { id: 2, nom: "Filtre à huile", prix: 15, categorie: "Filtration", image: "./images/PC2.jpg", disponible: true },
  { id: 3, nom: "Bougies d'allumage (x4)", prix: 35, categorie: "Moteur", image: "./images/PC3.jpg", disponible: true },
  { id: 4, nom: "Disques de frein (x2)", prix: 80, categorie: "Freinage", image: "./images/PC4.jpg", disponible: true },
  { id: 5, nom: "Courroie de distribution", prix: 90, categorie: "Moteur", image: "./images/PC5.jpg", disponible: true },
  { id: 6, nom: "Pompe à eau", prix: 70, categorie: "Refroidissement", image: "./images/PC7.jpg", disponible: true },
  { id: 7, nom: "Amortisseurs arrière (x2)", prix: 150, categorie: "Suspension", image: "./images/PC6.jpg", disponible: true },
  { id: 8, nom: "Filtre à air", prix: 20, categorie: "Filtration", image: "./images/fPC2.jpg", disponible: true },
  { id: 9, nom: "Capteur ABS", prix: 50, categorie: "Sécurité", image: "./images/PC3.jpg", disponible: true },
  { id: 10, nom: "Radiateur de refroidissement", prix: 130, categorie: "Refroidissement", image: "./images/PC3.jpg", disponible: true },
  { id: 11, nom: "Alternateur", prix: 200, categorie: "Électricité", image: "./images/PC2.jpg", disponible: true },
  { id: 12, nom: "Démarreur", prix: 180, categorie: "Électricité", image: "./images/PC1.jpg", disponible: true },
  { id: 13, nom: "Kit d’embrayage", prix: 220, categorie: "Transmission", image: "./images/PC5.jpg", disponible: true },
  { id: 14, nom: "Injecteur de carburant", prix: 110, categorie: "Moteur", image: "./images/PC1.jpg", disponible: true },
  { id: 15, nom: "Pompe à carburant", prix: 90, categorie: "Carburant", image: "./images/PC5.jpg", disponible: true },
  { id: 16, nom: "Capteur de pression des pneus (TPMS)", prix: 45, categorie: "Sécurité", image: "./images/PC3.jpg", disponible: true },
  { id: 17, nom: "Rétroviseur extérieur", prix: 60, categorie: "Carrosserie", image: "./images/PC4.jpg", disponible: true },
  { id: 18, nom: "Échappement complet", prix: 250, categorie: "Échappement", image: "./images/PC6.jpg", disponible: true },
  { id: 19, nom: "Vanne EGR", prix: 140, categorie: "Moteur", image: "./images/PC5.jpg", disponible: true },
  { id: 20, nom: "Turbo", prix: 400, categorie: "Moteur", image: "./images/PC7.jpg", disponible: true },
  { id: 21, nom: "Joint de culasse", prix: 75, categorie: "Moteur", image: "./images/PC2.jpg", disponible: true },
  { id: 22, nom: "Boîtier de direction", prix: 300, categorie: "Direction", image: "./images/PC6.jpg", disponible: true },
  { id: 23, nom: "Silent bloc de suspension", prix: 35, categorie: "Suspension", image: "./images/PC1.jpg", disponible: true },
  { id: 24, nom: "Cardan de transmission", prix: 160, categorie: "Transmission", image: "./images/PC2.jpg", disponible: true },
  { id: 25, nom: "Capteur de position vilebrequin", prix: 50, categorie: "Moteur", image: "./images/PC3.jpg", disponible: true }
            ]

    };
  },

  computed: {
   
   piecesFiltrees() {
  let resultat = this.pieces.filter(piece => {
    const matchNom = piece.nom.toLowerCase().includes(this.recherche.toLowerCase());
    const matchCategorie = this.categorieSelectionnee === "" || piece.categorie === this.categorieSelectionnee;
    const matchDisponible = !this.filtreDisponible || piece.disponible === true;
    return matchNom && matchCategorie && matchDisponible;
  });

  if (this.triPrix === "croissant") {
    resultat.sort((a, b) => a.prix - b.prix);
  } else if (this.triPrix === "decroissant") {
    resultat.sort((a, b) => b.prix - a.prix);
  }

  return resultat;
},


    
    totalPanier() {
      return this.panier.reduce((total, item) => total + item.prix, 0);
    }
  },

  methods: {
    ajouterAuPanier(piece) {
      this.panier.push(piece);
      alert(`${piece.nom} ajouté au panier !`);
    }
  }
}).mount("#app");
