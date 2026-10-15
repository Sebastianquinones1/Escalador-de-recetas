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
    texto += ing.nombre + ": " + ing.cantidad + " " + ing.unidad + "<br>";
  }
  listaIngredientes.innerHTML = texto;
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