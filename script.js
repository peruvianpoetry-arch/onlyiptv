fetch('modelos.json')
.then(res => res.json())
.then(data => {
 const contenedor = document.getElementById('contenedor');
 data.forEach(m => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<img src="${m.imagen}" alt="${m.nombre}"><p>${m.nombre}</p>`;
  card.onclick = () => window.open(m.link, '_blank');
  contenedor.appendChild(card);
 });
});