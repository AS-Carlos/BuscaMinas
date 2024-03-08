// Panel
function tamano(){

    let juegoId=document.getElementById("juego");
    juegoId.innerHTML="";
    let tamano=document.getElementById("tamano").value;    
    
    console.log(tamano);

    switch (tamano){

        case "pequeno":
            alto=9;
            ancho=9;
            break;
        case "mediano":
            alto=14;
            ancho=14;
            break;
        case "grande":
            alto=19;
            ancho=19;
            break;
        default:
            alto=9;
            ancho=9;
            break;         

            
    }
    console.log(alto, ancho);
    dibujarPanel(alto, ancho);
}

function dibujarPanel(alto, ancho){

    this.alto=alto;
    this.ancho=ancho;

    miPanel = Array(alto).fill(0).map(() => Array(ancho).fill(0));

    let juegoId=document.getElementById("juego");

    for (let valor of miPanel){

        juegoId.innerHTML+= `<div>${valor}</div>`;
    }
    
    
    
}


