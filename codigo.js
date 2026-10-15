const receta = [];

const btnAgregar = document.querySelector("#btnAgregar");
const btnEscalar = document.querySelector("#btnEscalar");
const listaIngredientes = document.querySelector("#listaIngredientes");
const mensaje = document.querySelector("#mensaje");
const resultado = document.querySelector("#resultado");

function mostrarLista() {
  let texto = "";
  for (let i = 0; i < receta.length; i++) {
    const ing = receta[i];
    texto += "<div class='item'>" +
      ing.nombre + ": " + ing.cantidad + " " + ing.unidad +
      " <button class='btnBorrar' onclick='borrarIngrediente(" + i + ")'>Borrar</button>" +
      "</div>";
  }
  listaIngredientes.innerHTML = texto;
}

function borrarIngrediente(indice) {
  receta.splice(indice, 1);
  resultado.innerHTML = "";
  mostrarLista();
}

btnAgregar.addEventListener("click", function () {
  const nombre = document.querySelector("#nombre").value.trim();
  const cantidad = parseFloat(document.querySelector("#cantidad").value);
  const unidad = document.querySelector("#unidad").value.trim();

  if (nombre === "" || isNaN(cantidad) || cantidad <= 0 || unidad === "") {
    mensaje.textContent = "Completá nombre, cantidad (mayor a cero) y unidad.";
    return;
  }

  receta.push({ nombre: nombre, cantidad: cantidad, unidad: unidad });
  mensaje.textContent = "";
  mostrarLista();

  document.querySelector("#nombre").value = "";
  document.querySelector("#cantidad").value = "";
  document.querySelector("#unidad").value = "";
});

btnEscalar.addEventListener("click", function () {
  const original = parseFloat(document.querySelector("#original").value);
  const deseadas = parseFloat(document.querySelector("#deseadas").value);

  if (receta.length === 0) {
    resultado.textContent = "Primero agregá al menos un ingrediente.";
    return;
  }

  if (isNaN(original) || isNaN(deseadas) || original <= 0 || deseadas <= 0) {
    resultado.textContent = "Ingresá porciones mayores a cero.";
    return;
  }

  const factor = deseadas / original;
  let texto = "";

  for (let i = 0; i < receta.length; i++) {
    const ingrediente = receta[i];
    const nuevaCantidad = Math.round(ingrediente.cantidad * factor * 10) / 10;
    texto += ingrediente.nombre + ": " + nuevaCantidad + " " + ingrediente.unidad + "<br>";
  }

  resultado.innerHTML = texto;
});
let recetario = [];

function cargarRecetario() {
  try {
    const guardado = localStorage.getItem("recetario");
    if (guardado) {
      recetario = JSON.parse(guardado);
    }
  } catch (e) {
    recetario = [];
  }
}

function guardarRecetario() {
  localStorage.setItem("recetario", JSON.stringify(recetario));
}

function mostrarRecetario() {
  const contenedor = document.querySelector("#recetario");

  if (recetario.length === 0) {
    contenedor.textContent = "Todavía no guardaste ninguna receta.";
    return;
  }

  let texto = "";
  for (let i = 0; i < recetario.length; i++) {
    const r = recetario[i];
    texto += "<div class='item'>" + r.nombre + " (" + r.porciones + " porciones)" +
      "<span><button class='btnBorrar' onclick='cargarReceta(" + i + ")'>Cargar</button> " +
      "<button class='btnBorrar' onclick='eliminarReceta(" + i + ")'>Eliminar</button></span></div>";
  }
  contenedor.innerHTML = texto;
}

document.querySelector("#btnGuardar").addEventListener("click", function () {
  const nombre = document.querySelector("#nombreReceta").value.trim();
  const porciones = parseFloat(document.querySelector("#original").value);
  const mensajeGuardar = document.querySelector("#mensajeGuardar");

  if (nombre === "" || isNaN(porciones) || porciones <= 0 || receta.length === 0) {
    mensajeGuardar.textContent = "Poné un nombre, las porciones originales y al menos un ingrediente.";
    return;
  }

  recetario.push({ nombre: nombre, porciones: porciones, ingredientes: receta.slice() });
  guardarRecetario();
  mostrarRecetario();
  mensajeGuardar.textContent = "Receta guardada.";
  document.querySelector("#nombreReceta").value = "";
});

function cargarReceta(indice) {
  const r = recetario[indice];

  receta.length = 0;
  for (let i = 0; i < r.ingredientes.length; i++) {
    receta.push(r.ingredientes[i]);
  }

  document.querySelector("#original").value = r.porciones;
  document.querySelector("#deseadas").value = "";
  resultado.innerHTML = "";
  mostrarLista();
}

function eliminarReceta(indice) {
  recetario.splice(indice, 1);
  guardarRecetario();
  mostrarRecetario();
}

cargarRecetario();
mostrarRecetario();