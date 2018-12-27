class categoria {
    constructor(id,nombre){
        this.id = id ;
        this.nombre = nombre;
    }
}
class producto{
        constructor(id,nombre, categoria,precio,cantidad,imagen){
            this.id = id;
            this.nombre = nombre;
            this.categoria = categoria;
            this.precio = precio;
            this.cantidad = cantidad;
            this.imagen = imagen;

        }
}
arrayListCategoria = [];
arrayListProducto = [];

function cargarCategoria(){

    let objCategoria1 = new categoria("1","Categoria1");
    let objCategoria2 = new categoria("1","Categoria2");
    let objCategoria3 = new categoria("1","Categoria3");
    let objCategoria4 = new categoria("1","Categoria4");

    arrayListCategoria.push(objCategoria1);
    arrayListCategoria.push(objCategoria2);
    arrayListCategoria.push(objCategoria3);
    arrayListCategoria.push(objCategoria4);

    for(iterador in arrayListCategoria){
        let opcion = $("<option>");
        opcion.text(arrayListCategoria[iterador].nombre);
        $('select').append(opcion);
    }
}
cargarCategoria();

var codigo = 1;

$('#imagen').on('change', function(ev) {
    var f = ev.target.files[0];
    var fr = new FileReader();
    
    fr.onload = function(ev2) {
        console.dir(ev2);
        $('#i').attr('src', ev2.target.result);
    };
    
    fr.readAsDataURL(f);

})

 document.getElementsByName('entrada')[0].value = codigo;
$('#formulario').submit(function(e){
    $('button').text("Registrar");
    
        var arrayEntrada =  $('[name="entrada"]');
        id = arrayEntrada[0].value;
        nombre = arrayEntrada[1].value;
        categoria = arrayEntrada[2].value;
        precio = arrayEntrada[3].value;
        cantidad = arrayEntrada[4].value;
        imagen = arrayEntrada[5].src;
        var objproducto = new producto(id,nombre,categoria,precio,cantidad,imagen);
        console.log(imagen);
        for (let index = 0; index <= arrayListProducto.length-1; index++) {
            if(objproducto.id == arrayListProducto[index].id) 
            {
                arrayListProducto[index].id = id;
                arrayListProducto[index].nombre = nombre;
                arrayListProducto[index].categoria = categoria;
                arrayListProducto[index].precio = precio;
                arrayListProducto[index].cantidad = cantidad;
                arrayListProducto[index].imagen = imagen;
                limpiarInputs();
                    mostrarenTabla();
                    e.preventDefault();
                    return;
            }
        }
        arrayListProducto.push(objproducto);
        mostrarenTabla();   
        limpiarInputs();
        e.preventDefault();
})

function mostrarenTabla(){

    $('tbody').text("");
    for(var i = 0; i<= arrayListProducto.length-1; i++){
        console.log("asdsadas" + arrayListProducto[i].imagen);
        var tr=  document.createElement('tr');
        var td1 =   document.createElement('td');
        var td2 =   document.createElement('td');
        var td3 =   document.createElement('td');
        var td4 =   document.createElement('td');
        var td5 =   document.createElement('td');
        var td6 =   document.createElement('td');
        var td7=   document.createElement('td');
        td1.innerHTML = arrayListProducto[i].id;
        td2.innerHTML = arrayListProducto[i].nombre;
        td3.innerHTML = arrayListProducto[i].categoria;
        td4.innerHTML = arrayListProducto[i].precio;
        td5.innerHTML = arrayListProducto[i].cantidad;
        td6.innerHTML='<img src= '+ arrayListProducto[i].imagen+ ' style=" height:80px ; width: 100px" />';
        td7.innerHTML = '<input type="button" id="btnEditar" onclick= editarProducto('+arrayListProducto[i].id+  ') class="btn btn-warning" value="Editar" />  <input type="button" onclick=eliminarProducto('+ arrayListProducto[i].id + ') class="btn btn-danger" value="Eliminar" /> ';
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        tr.append(td6);
        tr.append(td7);
        $('#tbody').append(tr);
        limpiarInputs();
        }
}
function eliminarProducto(codPro){
     for (let index = 0; index <= arrayListProducto.length-1; index++) {
        if(codPro == arrayListProducto[index].id){
            arrayListProducto.splice(index,1);
                console.log(codPro);
             
                mostrarenTabla();  
                 limpiarInputs();
        }
     }
}

function editarProducto(codPro){
    $('button').text("guardar");

        for (let index = 0; index <= arrayListProducto.length-1; index++) {
            console.log("entra" + codPro);

            if(arrayListProducto[index].id == codPro){
                    var arrayEntrada =  $('[name="entrada"]');
                    arrayEntrada[0].value = arrayListProducto[index].id;
                    arrayEntrada[1].value = arrayListProducto[index].nombre;
                    arrayEntrada[2].value = arrayListProducto[index].categoria;
                    arrayEntrada[3].value = arrayListProducto[index].precio;
                    arrayEntrada[4].value = arrayListProducto[index].cantidad;
            }  
        }
}
function limpiarInputs(){
    var arrayEntrada =  $('[name="entrada"]');
    arrayEntrada[0].value = parseInt(arrayListProducto[arrayListProducto.length-1].id)+1;
    arrayEntrada[1].value="";
    arrayEntrada[2].value="";
    arrayEntrada[3].value="";
    arrayEntrada[4].value="";
}