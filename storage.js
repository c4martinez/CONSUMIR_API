// variables globales

const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaActividades');
let arrayActividades = [];


// funciones 

const CrearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: true
    }
    arrayActividades.push(item);
    return item;
}

const guardarDB = (actividad) => {
    localStorage.setItem('busqueda', JSON.stringify(arrayActividades));
    PintarDB();
}
const PintarDB = () => {
    listaActividadesUI.innerHTML = '';                           // Iniciar siempre con un string vacio(xq los vamos a ir pintando) cuando cargue nuestra aplicacion, limpia todo lo que aparece en listaActividades
    arrayActividades = JSON.parse(localStorage.getItem('busqueda'));
    if (arrayActividades.length > 3) {
        arrayActividades.shift();
    }
    if (arrayActividades === null){
        arrayActividades = [];
    } else {
        arrayActividades.forEach(Element => {                    // este elemento es nuestro item
            listaActividadesUI.innerHTML += `
            <div>
            <b class="clickeable" onclick="submitValue('${Element.actividad}')">${Element.actividad}</b>
        </div>`
        });
    }
} 
// EventListener

formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();                                          // para no refrescar el sitio
    let actividadUI = document.getElementById('search').value;   // leemos el input
    CrearItem(actividadUI);
    guardarDB();
    formularioUI.reset();
});

// pintamos en el dom

document.addEventListener('DOMContentLoaded', PintarDB);