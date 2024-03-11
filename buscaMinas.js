let fila=0;
let columna=0;
let bombas=0;
// let miPanel = Array(fila).fill(0).map(() => Array(columna).fill(0));

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

    for (let valor of miPanel){

        juegoId.innerHTML+= `<div>${valor}</div>`;
    }    
    
}

function pintarBombas(){
    
    while (bombas!=0){        
        
        f=aleatorio(fila);
        c=aleatorio(columna);
                
        if (miPanel[f][c]!="B"){

            miPanel[f][c]="B";
            bombas--;
        }                
        
    }
    
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



