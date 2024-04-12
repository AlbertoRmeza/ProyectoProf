// Arreglos para inicializar valores de Ingresos y Egresos

const ingresos = [
    new Ingresos("Sueldo", 10000.00)
];

const egresos = [
    new Egresos ("Vacaciones", 3500.00)
]

// Función cargarCabecero

let cargarCabecero = () =>{
    let presupuesto = totalIngresos()-totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    // document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingreso").innerHTML = formatoMoneda(totalIngresos());
    document.getElementById("egreso").innerHTML = formatoMoneda(totalEgresos());
}

// Función totalIngresos

let totalIngresos = () =>{
    let totalIngresos = 0;
    for(let ingreso of ingresos){
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
}

let totalEgresos = () =>{
    let totalEgresos = 0;
    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

// Formato moneda

const formatoMoneda = (valor) =>{
    // return valor.toLocateString("es-MX", {style: "currency", currency: "MXN"});
    let moneda = valor.toLocaleString("es-MX",{style:"currency", currency:"MXN"});
    return moneda;
}

// Formato porcentaje

const formatoPorcentaje = (valor) => {
    // return valor.toLocateString("es-MX", {style: "percent", minimumFractionDigits:2});
    let porcent = valor.toLocaleString("es-MX",{style:"percent", minimumFractionDigits:2});
    return porcent;
}

// Funciones para los Ingresos

const cargarIngresos = () =>{
    let ingressosHtml = "";
    for (ingreso of ingresos){
        ingressosHtml += crearIngresos(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingressosHtml;
}

const crearIngresos = (ingreso) =>{
    let ingresosTempleate = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingresos.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button type="button" class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline" onclick=eliminarIngreso(${ingreso.id})"></ion-icon>
                    </button>
                </div>
            </div>
        </div>`
    return ingresosTempleate;
}

const eliminarIngreso = (id) => {
    let ingresoEliminar = ingresos.findIndex(ingresos => ingresos.id === id);
    ingresos.splice(ingresoEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

// Funciones para los Egresos van en esta otra sección

const cargarEgresos = () =>{
    let egresosHTML = "";
    for (egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) =>{
    let egresosTempleate = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egresos.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button type="button" class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline" onclick=eliminarEgreso(${egreso.id})"></ion-icon>
                    </button>
                </div>
            </div>
        </div>`
    return egresosTempleate;
}

const eliminarEgreso = (id) => {
    let egresoEliminar = egresos.findIndex(egresos => egresos.id === id);
    egreso.splice(egresoEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}


// Función para agregarDato

const agregarDato = () => {
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];
    console.log(descripcion)
    if(descripcion.value !== "" &&  valor.value !== ""){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingresos(descripcion.value, valor.value)) // Forma corta
            cargarCabecero();
            cargarIngresos();
        }else if(tipo.value === 'egreso'){
            let nuevoEgresos = new Egresos(descripcion.value, valor.value) // Forma larga
            egresos.push(nuevoEgresos);
            cargarCabecero();
            cargarEgresos();
        }
    }else{
        alert("Favor de llenar todos los campos");
    }
}

// Función para cargar la app 

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

