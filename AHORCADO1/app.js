let palabrita;
let cant_errores = 0;//cuantass veces se equivoco
let cant_aciertos = 0;//cuantas letras acerto

const palabras = [
    "casa", "perro", "gato", "mesa", "silla", "libro", "arbol", "flor", "agua", "fuego",
    "cielo", "mar", "sol", "luna", "estrella", "nube", "viento", "montana", "rio", "bosque",
    "ciudad", "pueblo", "camino", "carro", "tren", "avion", "barco", "playa", "arena", "ola",
    "familia", "amigo", "escuela", "profesor", "alumno", "clase", "juego", "comida", "bebida", "fruta",
    "verdura", "pan", "leche", "carne", "pescado", "queso", "huevo", "puerta", "ventana", "techo",
    "pared", "piso", "cama", "armario", "espejo", "reloj", "televisor", "radio", "telefono", "computadora",
    "raton", "teclado", "pantalla", "impresora", "camara", "foto", "video", "musica", "cancion", "pelicula",
    "deporte", "futbol", "baloncesto", "tenis", "correr", "saltar", "nadar", "bailar", "cantar", "pintar",
    "dibujar", "escribir", "leer", "contar", "sumar", "restar", "multiplicar", "dividir", "jugar", "dormir",
    "soñar", "reir", "llorar", "amar", "odiar", "pensar", "recordar", "olvidar", "vivir", "morir"
];//cada palabra del array tiene un numero, por ejemplo la primera palabra seria 0, la segunda 1 etc.


const blob = new Blob([JSON.stringify(palabras)], { type: 'application/json' });//blob sirve para agarrar datos existentes y transformarlos en un formato json.
const url = URL.createObjectURL(blob);//hice eso para poder transformar los datos del array en una direccion URL asi despues hago el fetch.

const btn = id('jugar');
const imagen = id ('imagen');
const btn_letras = document.querySelectorAll ("#letras button");

btn.addEventListener('click', iniciar);//el boton obtener palabra, inicia al hacer click.

function iniciar (event)
{
    imagen.src = 'img0.png';
    btn.disabled = true;//deshabilito el boton de obtener pregunta asi no puede cambiar de palabra el jugador.
    cant_errores = 0;
    cant_aciertos= 0;
    id('resultado').innerHTML = '';
    const parrafo = id('palabra_a_adivinar');
    parrafo.innerHTML = '';//es para que se reincie el span luego de apretar el boton obtener palabra.
    
    // Haces un fetch a url para obtener una palabra aleatoria.
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const cant_palabras = data.length;
            const valor_al_azar = obtener_random(0, cant_palabras);
            palabrita = data[valor_al_azar];
            console.log(palabrita);
            const cant_letras = palabrita.length;//para palabra aleatoria

            for (let i = 0; i < btn_letras.length; i++) {//para habilitar los botones de letras.
                btn_letras[i].disabled = false;
            }

            for (let i = 0; i < cant_letras; i++) {//este for sirve como ciclo repetitivo de los span que seria la barrita o subrallado, que genere uno por cada letra de la palabra.
                const span = document.createElement('span');
                parrafo.appendChild(span);
            }
        })
        .catch(error => {
            console.error('Error al obtener la palabra:', error);
        });
} 

//devuelve un array de todos los elementos que encontro, que seria los botones de las letras.
for(let i = 0; i< btn_letras.length; i++){//si toco cualquier letra va a ejecutarse la funcion click_letras.
    btn_letras [i].addEventListener('click', click_letras);
}

function click_letras (event){
    const spans = document.querySelectorAll ('#palabra_a_adivinar span');
    const button = event.target; //cual de todas las letras, llamo a la funcion.
    button.disabled = true;
    const letra = button.innerHTML.toLowerCase ();
    const palabra = palabrita.toLowerCase (); //para que lea todo minuscula.
    
    let acerto = false;
    for(let i=0;i<palabra.length; i++ ){
        //la variable i es la posicion de la letra en la palabra que coincide con el span al que tenemos que mostrarle esta letra.
        if(letra==palabra [i]){
            spans [i].innerHTML = letra;
            cant_aciertos++;
            acerto = true;
        } 
    }
    if (acerto==false){
        cant_errores++;
        const source = `img${cant_errores}.png` ;//ir cambiando la iamgen segun los errores.
        const imagen = id ('imagen');
        imagen.src = source;
    }//en caso de que recorra el for y siga en false, se debe cobrar una vida por que la letra no coincide y cambiar de imagen.

    if (cant_errores== 7){
        id('resultado').innerHTML = "Perdiste, la palabra era " + palabrita;// si tenes 7 errores se termina el juego.
        game_over();
    }
    else if (cant_aciertos == palabrita.length){
        id('resultado').innerHTML = "Ganaste, encontraste la palabra, Felicitaciones";//si la cantidad de aciertos coincide con la palabra, ganas.
        game_over();
    }

    console.log ("la letra"+ letra + "en la palabra" +palabra+ "existe?" + acerto);
}

function game_over (){//fin del juego.
    for (let i = 0; i < btn_letras.length; i++){
        btn_letras [i].disabled =true;
    }
    btn.disabled = false; //habilito nuevamente el boton de obtener palabra.
}
game_over ();