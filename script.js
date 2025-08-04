document.addEventListener("DOMContentLoaded", () => {
  fetch("modelos.json")
    .then((res) => res.json())
    .then((modelos) => {
      const container = document.getElementById("modelos-container");

      modelos.forEach((modelo) => {
        const card = document.createElement("div");
        card.className = "modelo-card";

        const img = document.createElement("img");
        img.src = modelo.imagen || "https://via.placeholder.com/240x180?text=OnlyIPTV";
        img.alt = modelo.nombre;

        const info = document.createElement("div");
        info.className = "modelo-info";

        info.innerHTML = `
          <h3>${modelo.nombre}</h3>
          <p><strong>País:</strong> ${modelo.pais}</p>
          <p><strong>Categoría:</strong> ${modelo.categoria}</p>
          <p><strong>Seguidores:</strong> ${modelo.seguidores}</p>
          <p><strong>Media:</strong> ${modelo.media}</p>
          <p><a href="${modelo.link}" target="_blank">Ver perfil</a></p>
        `;

        card.appendChild(img);
        card.appendChild(info);
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Error al cargar modelos.json:", err);
    });
});
