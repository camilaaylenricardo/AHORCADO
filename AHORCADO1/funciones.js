function id(str){
    return document.getElementById (str);//esta funcion sirve para pasar el id como argumento, para que el return lo devuelva a su variable. 
}

function obtener_random(num_min, num_max){
    const amplitud_valores = num_max - num_min;
    const valor_al_azar = Math.floor (Math.random( ) * amplitud_valores) + num_min;// te da un numero random y lo que hacemos es que te de una amplitud de valores y redondee el numero hacia abajo, eliminando el decimal.
        return valor_al_azar;
}