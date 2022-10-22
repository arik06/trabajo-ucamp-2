const formularioUI = document.querySelector("#formulario");
const listaProductosUI =  document.getElementById("listaProductos");
let arrayProductos = [];

    

const CrearItem = (producto) => {
   let item = {
    producto:producto,
    precio: 200.00
   }
arrayProductos.push(item);
return item;
}

const GuardarDB = () => {
localStorage.setItem('carrito', JSON.stringify(arrayProductos));

AgregarDB();
}

const AgregarDB = () => {
listaProductosUI.innerHTML = '';

arrayProductos = JSON.parse (localStorage.getItem('carrito'))

if(arrayProductos === null){
    arrayProductos = [];
}else{
    arrayProductos.forEach(element => {
   listaProductosUI.innerHTML += `<div class="alert alert-warning" role="alert"><i class="material-icons float-left mr-1">shopping_cart</i><b>${element.producto}</b> - ${element.precio}<span class="float-end"><i class="material-icons">price_check</i><i class="material-icons">delete_outline</i></span>
</div>`
    });

}
}

const EliminarDB =  (producto) => {
let indexArray;
    arrayProductos.forEach((element, index )=> {
        
       if(element.producto === producto ) {
        indexArray =  index;
       }
       
    });
    arrayProductos.splice(indexArray, 1);
    GuardarDB();
}

const EditarDB =  (producto) =>{

    let indexArray = arrayProductos.findIndex((element)=>element.producto === producto );
    console.log(arrayProductos[indexArray]);
    arrayProductos[indexArray].precio = true;
    GuardarDB();
}

formularioUI.addEventListener("submit" , (e) => {
    e.preventDefault();
    let productoUI =  document.querySelector("#producto").value;
 
    CrearItem(productoUI);
    GuardarDB();
    formularioUI.reset();
});
document.addEventListener('DOMContentLoaded', AgregarDB);

listaProductosUI.addEventListener('click', (e) =>{

e.preventDefault();

if(e.target.innerHTML === 'price_check' || e.target.innerHTML === "delete_outline"){
    let texto = e.path[2].childNodes[1].innerHTML;
    if(e.target.innerHTML === 'delete_outline'){

        EliminarDB(texto);
    }
    if(e.target.innerHTML === 'price_check'){

        EditarDB(texto);
    }
}
});