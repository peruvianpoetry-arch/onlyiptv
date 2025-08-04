
const modelos = [];
for (let i = 1; i <= 1000; i++) {
    let pais = "Sudamérica";
    if (i <= 200) pais = "Sudamérica";
    else if (i <= 400) pais = "Centroamérica";
    else if (i <= 600) pais = "Norteamérica";
    else if (i <= 800) pais = "Europa";
    else if (i <= 900) pais = "Asia";
    else pais = "Oceanía";
    modelos.push({
        id: "modelo" + i,
        nombre: "Modelo " + i,
        pais: pais,
        imagen: "assets/siluetas/silueta.png"
    });
}

const grid = document.getElementById("grid-modelos");
const seleccionados = [];

function cargarModelos() {
    grid.innerHTML = "";
    modelos.forEach((m) => {
        const div = document.createElement("div");
        div.classList.add("modelo");
        div.innerHTML = `<img src="${m.imagen}" alt="modelo"/><p>${m.nombre}</p>`;
        div.onclick = () => seleccionar(div, m.id);
        grid.appendChild(div);
    });
}

function seleccionar(div, id) {
    if (seleccionados.includes(id)) {
        div.classList.remove("selected");
        const idx = seleccionados.indexOf(id);
        seleccionados.splice(idx, 1);
    } else {
        div.classList.add("selected");
        seleccionados.push(id);
    }
}

function generarLink() {
    if (seleccionados.length === 0) {
        alert("No has seleccionado ningún modelo.");
        return;
    }
    const link = "https://onlyiptv.netlify.app/watch?id=" + seleccionados.join("-");
    alert("Tu link personalizado:
" + link);
}

window.onload = cargarModelos;
