function mostrarMensagem(){
    alert("A tecnologia sustentável ajuda o agro a produzir mais sem prejudicar o meio ambiente!");
}

let agua = 0;
let energia = 0;
let co2 = 0;

function animarContador(){

    if(agua < 5000){
        agua += 50;
        document.getElementById("agua").innerHTML = agua;
    }

    if(energia < 3000){
        energia += 30;
        document.getElementById("energia").innerHTML = energia;
    }

    if(co2 < 1200){
        co2 += 12;
        document.getElementById("co2").innerHTML = co2;
    }
}

setInterval(animarContador, 50);