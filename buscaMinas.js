let fila=0;
let columna=0;
let bombas=0;
let bombasMarcadas=0;
let banderasMarcadas=0;
let intervaloCronometro;
let cronometro=false;
let verde=false;
let tiempoHecho;
let topScore = [];





function limpiar(){

    let juegoId=document.getElementById("juego");
    juegoId.innerHTML="";
}


function tamano(){
    
    limpiar();
    // Dimensiones en base a lo seleccionado en el HTML
    let tamano=document.getElementById("tamano").value;     

    console.log(tamano);

    switch (tamano){

        case "pequeno":
            columna=9;
            fila=9;
            break;
        case "mediano":
            columna=14;
            fila=14;
            break;
        case "grande":
            columna=19;
            fila=19;
            break;
        default:
            columna=9;
            fila=9;
            break;         

            
    }
    console.log("Nº de filas: " + fila + " -- Nº de columnas: " + columna);  
    
    // Capturamos la dificultad seleccionada en el HTML
    let dificultadElegida=document.getElementById("dificultad").value;
    console.log(dificultadElegida);
    // Llamada a la función dificultad pasando por parámetro el tamaño y la dificultad elegidas en el HTML
    definirDificultad(tamano, dificultadElegida);

    dibujarPanel(fila, columna);

}

function definirDificultad(tamano, dificultadElegida){        
    
    if (tamano=="pequeno") bombas=10;
    if (tamano=="mediano") bombas=15;
    if (tamano=="grande")  bombas=23;

    if (dificultadElegida=="facil") bombas+=Math.ceil((bombas*0.1));
    if (dificultadElegida=="intermedio") bombas+=Math.ceil(((1+bombas)*0.2));
    if (dificultadElegida=="dificil") bombas+=Math.ceil(((4+bombas)*0.3));

    
    console.log("Nº de bombas: " + bombas);        
    
}

function dibujarPanel(fila, columna){
    

    miPanel = Array(fila).fill(0).map(() => Array(columna).fill(0));

    pintarBombas(); 
    pintarNumeros();   

    let juegoId=document.getElementById("juego");

    let contenidoHTML = "";

        for (let i = 0; i < fila; i++) {
            contenidoHTML += `<div class="bloque">`;
            for (let j = 0; j < columna; j++) {
                contenidoHTML += `<div class="cuadrado" id="${i},${j}" onclick="destapar(this)" oncontextmenu="clickDerecho(this); return false;"></div>`;
            }
            contenidoHTML += `</div>`;
        }

        // Asigna todo el contenido construido al elemento con el ID "juego"
        juegoId.innerHTML = contenidoHTML;

        for (let valor of miPanel){

            console.log(valor);
        }   
        
    
    // analizar();
    console.log("Nº de bombas: " + bombas);
}

function pintarBombas(){
    
    let bombasOriginal = bombas;

    while (bombas!=0){        
        
        f=aleatorio(fila);
        c=aleatorio(columna);        
                
        if (miPanel[f][c]!="B"){

            miPanel[f][c]="B";
            bombas--;
            
        }                
        
    }
    bombas = bombasOriginal;

    cantidadBombas = document.getElementById("minas");    
    cantidadBombas.innerHTML=bombas;
}

function aleatorio(valor){
    
    resultado=Math.floor(Math.random()*(valor+1));
    if (resultado>=valor) resultado--;
    //console.log(resultado);
    return resultado;
    
}

function pintarNumeros(){
    for (let i = 0; i < fila; i++){
        for (let j = 0; j < columna; j++){
            if (miPanel[i][j] === "B"){                                
                for (let x = Math.max(0, i - 1); x <= Math.min(fila - 1, i + 1); x++){
                    for (let y = Math.max(0, j - 1); y <= Math.min(columna - 1, j + 1); y++){
                        if (miPanel[x] && miPanel[x][y] !== undefined && miPanel[x][y] !== "B"){
                            if (!isNaN(miPanel[x][y])){
                                miPanel[x][y]++;
                            } else {
                                miPanel[x][y] = 1;
                            }
                        }
                    }
                }
            }
        }
    }
}

function destapar(elemento){

    if (cronometro==false){
        cronometro=true;
        iniciarCronometro();
    }

    idValor=elemento.id;
    posiciones=idValor.split(",");
    /*    
    console.log(elemento);
    console.log(f);
    console.log(miPanel[posiciones[0]][posiciones[1]]);
    */
    if (miPanel[posiciones[0]][posiciones[1]]==0){
        elemento.innerHTML="";
        elemento.style.background="rgba(164, 164, 164, 0.425)";
        autoDestapar(posiciones[0],[posiciones[1]]);
    } else if (miPanel[posiciones[0]][posiciones[1]]=="B"){
        elemento.innerHTML="<img src='img/bomba.png' alt='B'>";
        elemento.style.background="red";
        terminar(true);
    } else {
        elemento.innerHTML=`${miPanel[posiciones[0]][posiciones[1]]}`;
        elemento.style.background="rgba(164, 164, 164, 0.425)";
    }
}

function autoDestapar(y, x) {
    let visited = []; // Array para mantener un registro de las celdas visitadas

    function recursiveDestapar(y, x) {
        // Verificar si la celda (y, x) ha sido visitada antes
        if (visited.includes(`${y},${x}`)) {
            return; // Si ya ha sido visitada, salir de la función
        }

        visited.push(`${y},${x}`); // Marcar la celda como visitada

        // Iterar sobre las celdas adyacentes
        for (let i = Math.max(0, y - 1); i <= Math.min(fila - 1, y + 1); i++) {
            for (let j = Math.max(0, x - 1); j <= Math.min(columna - 1, x + 1); j++) {
                // Verificar si la celda adyacente es un 0 y no ha sido visitada
                if (miPanel[i][j] == 0 && !(i === y && j === x)) {
                    let adyacente = document.getElementById(`${i},${j}`);
                    adyacente.innerHTML = "";
                    adyacente.style.background = "rgba(164, 164, 164, 0.425)";
                    // Llamar recursivamente a la función para destapar las celdas adyacentes
                    recursiveDestapar(i, j);
                } else if (!isNaN(miPanel[i][j]) && miPanel[i][j] !== 0) {
                    let adyacente = document.getElementById(`${i},${j}`);
                    adyacente.innerHTML = `${miPanel[i][j]}`;
                    adyacente.style.background = "rgba(164, 164, 164, 0.425)";
                }
            }
        }
    }

    // Iniciar la recursión con las coordenadas iniciales
    recursiveDestapar(y, x);
}

function clickDerecho(elemento){

    idValor=elemento.id;
    posiciones=idValor.split(",");


        if (elemento.innerHTML==""){
            
            banderasMarcadas++;
            elemento.innerHTML="<img src='img/bandera.png' alt='B'>";
            console.log("Bombas marcadas: " + bombasMarcadas + "Banderas marcadas: " + banderasMarcadas );

                if (miPanel[posiciones[0]][posiciones[1]]=="B"){
                    
                    bombasMarcadas++;
                    terminar();
                }

                console.log("Bombas marcadas: " + bombasMarcadas + "Banderas marcadas: " + banderasMarcadas );

        } else if (elemento.innerHTML.includes("B") || elemento.innerHTML=="<img src='img/bandera.png' alt='B'>"){
            
            elemento.innerHTML="<img src='img/interrogacion.png' alt='P'>";

                if (miPanel[posiciones[0]][posiciones[1]]=="B"){

                    bombasMarcadas--;
                    banderasMarcadas--;                    
                    console.log("Bombas marcadas: " + bombasMarcadas + "Banderas marcadas: " + banderasMarcadas );                 
                } else {
                    banderasMarcadas--;                    
                    console.log("Bombas marcadas: " + bombasMarcadas + "Banderas marcadas: " + banderasMarcadas );
                }

        } else {
                
                if (miPanel[posiciones[0]][posiciones[1]]>=0 ||miPanel[posiciones[0]][posiciones[1]]=="B"){
                    elemento.innerHTML="";
                }
                console.log("Bombas marcadas: " + bombasMarcadas + "Banderas marcadas: " + banderasMarcadas );
        }
        
        cantidadBanderas = document.getElementById("banderas");    
        cantidadBanderas.innerHTML=banderasMarcadas;
}

function destaparTodo(){
    for (let i = 0; i <fila; i++) {
        for (let j = 0; j <columna; j++) {

            elemento=document.getElementById(`${i},${j}`);
            
            if (miPanel[i][j] == 0) {
                elemento.innerHTML="";
                elemento.style.background="rgba(164, 164, 164, 0.425)";
                
            } else if (miPanel[i][j] == "B") {
                elemento.innerHTML="<img src='img/bomba.png' alt='B'>";
                if (verde){elemento.style.background="green";
                } else {elemento.style.background="red"}
            } else {
                elemento.innerHTML=`${miPanel[i][j]}`;
                elemento.style.background="rgba(164, 164, 164, 0.425)";
            }
        }
    }
}

function terminar(pum) {

    tiempoHecho= document.getElementById("cronometro").textContent;
    console.log(tiempoHecho);

    if (bombas === bombasMarcadas || bombas === banderasMarcadas || pum === false) {
        verde=true;
        destaparTodo();
        detenerCronometro()
        console.log("Bombas " + bombas + " Marcas " + bombasMarcadas + " Banderas " + banderasMarcadas);
        setTimeout(function() {
            nombre=prompt("¡Has ganado!  \nEres un jefaz@");
            gestionTop(nombre, tiempoHecho);
            //window.location.reload()
        }, 100); // Retraso de 100 milisegundos 
    } else if (pum) {
        destaparTodo();
        detenerCronometro()
        console.log(bombas, bombasMarcadas);
        setTimeout(() => {
            alert("PUUUUUUUUUUUUUM \n¡¡Te has convertido en una palomita!!");
            window.location.reload()
        }, 100); // Retraso de 100 milisegundos 
        
    } else {
        // Código adicional si es necesario
    }

    
}



function iniciarCronometro() {
    let tiempoInicio = Date.now();
    
    function actualizarCronometro() {
        let tiempoTranscurrido = Date.now() - tiempoInicio;
        let milisegundos = tiempoTranscurrido % 1000;
        let segundos = Math.floor(tiempoTranscurrido / 1000) % 60;
        let minutos = Math.floor(tiempoTranscurrido / (1000 * 60)) % 60;
        let horas = Math.floor(tiempoTranscurrido / (1000 * 60 * 60));

        // Formatear el tiempo en HH:MM:SS:mmm
        let tiempoFormateado = pad(horas, 2) + ":" + pad(minutos, 2) + ":" + pad(segundos, 2) + ":" + pad(milisegundos, 3);
        
        // Actualizar el elemento HTML con el tiempo
        document.getElementById("cronometro").textContent = tiempoFormateado;
    }
    
    // Iniciar el intervalo del cronómetro y almacenar su ID en la variable intervaloCronometro
    intervaloCronometro = setInterval(actualizarCronometro, 16);
}

function detenerCronometro() {
    // Detener el intervalo del cronómetro utilizando su ID almacenado en intervaloCronometro
    clearInterval(intervaloCronometro);
}

// Función auxiliar para agregar ceros a la izquierda si es necesario
function pad(numero, longitud) {
    return String(numero).padStart(longitud, "0");
}

/*
function analizar(){
    
    elemento=document.getElementById("juego");    
    elementoDiv=elemento.innerHTML;

    //console.log("El elemento es: " + elemento.innerHTML);
    
    dato=elementoDiv.split(',');
    //console.log(dato[8]);
}
*/


function gestionTop(nombre, tiempo) {
    // Crear un objeto con el nombre y el tiempo    

    let jugador = {
        nombre: nombre,
        tiempo: tiempo
    };

    // Agregar el objeto al principio del array
    topScore.unshift(jugador);

    // Ordenar el array por tiempo de menor a mayor
    topScore.sort((a, b) => a.tiempo - b.tiempo);

    // Si el array top tiene más de 10 elementos, eliminar el último elemento
    if (topScore.length > 10) {
        topScore.pop();
    }    

    topScore.forEach((score, index) => {
        let nombreCell = document.getElementById(`top-nombre-${index + 1}`);
        let tiempoCell = document.getElementById(`top-tiempo-${index + 1}`);
    
        nombreCell.textContent = score.nombre;
        tiempoCell.textContent = score.tiempo;
    });
    console.log(topScore);
}


