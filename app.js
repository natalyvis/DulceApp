function mostrarRegistro() {

    document.querySelector("main").style.display = "none";

    document.querySelector("header").style.display = "none";

    document.querySelector(".boton-salir").style.display = "none";

    document.querySelector(".seccion-registro").style.display = "block";


    // Preparar formulario para registrar un producto nuevo

    if (indiceProductoEditando === null) {

        document.querySelector("#registro h2").textContent =
            "📦 Registrar producto";

        document.getElementById("botonGuardar").textContent =
            "💾 GUARDAR PRODUCTO";

    }

}


function calcularCostos() {

    const categoria = document.getElementById("categoria").value;
    const producto = document.getElementById("producto").value;
    const cantidad = Number(document.getElementById("cantidad").value);
    const costo = Number(document.getElementById("costo").value);
    const precio = Number(document.getElementById("precio").value);

    if (producto === "" || cantidad <= 0 || costo <= 0 || precio <= 0) {

        document.getElementById("resultado").innerHTML = `
            <p>⚠️ Por favor, completa todos los datos correctamente.</p>
        `;

        return;
    }

    const costoUnitario = costo / cantidad;

    const ganancia = precio - costoUnitario;

    const gananciaTotal = ganancia * cantidad;

    const margen = (ganancia / precio) * 100;

    document.getElementById("resultado").innerHTML = `

        <h3>📊 Resultados</h3>

        <p>
            <strong>📂 Categoría:</strong>
            ${categoria}
        </p>

        <p>
            <strong>📦 Producto:</strong>
            ${producto}
        </p>

        <p>
            <strong>📦 Cantidad:</strong>
            ${cantidad} unidades
        </p>

        <p>
            <strong>💵 Costo total:</strong>
            Bs ${costo.toFixed(2)}
        </p>

        <p>
            <strong>🏷️ Precio de venta:</strong>
            Bs ${precio.toFixed(2)}
        </p>

        <hr>

        <p>
            <strong>💰 Costo unitario:</strong>
            Bs ${costoUnitario.toFixed(2)}
        </p>

        <p>
            <strong>📈 Ganancia por unidad:</strong>
            Bs ${ganancia.toFixed(2)}
        </p>

        <p>
            <strong>📊 Ganancia total estimada:</strong>
            Bs ${gananciaTotal.toFixed(2)}
        </p>

        <p>
            <strong>📊 Margen de ganancia:</strong>
            ${margen.toFixed(2)}%
        </p>

    `;

    document.getElementById("botonGuardar").style.display = "block";

}

function guardarProducto() {

    const categoria = document.getElementById("categoria").value;
    const producto = document.getElementById("producto").value;
    const cantidad = Number(document.getElementById("cantidad").value);
    const costo = Number(document.getElementById("costo").value);
    const precio = Number(document.getElementById("precio").value);

    if (producto === "" || cantidad <= 0 || costo <= 0 || precio <= 0) {

        alert("⚠️ Por favor, completa todos los datos correctamente.");

        return;
    }

    const costoUnitario = costo / cantidad;
    const ganancia = precio - costoUnitario;
    const gananciaTotal = ganancia * cantidad;
    const margen = (ganancia / precio) * 100;

    let productos = JSON.parse(localStorage.getItem("productos")) || [];


    // =====================================
    // EDITAR PRODUCTO EXISTENTE
    // =====================================

    if (indiceProductoEditando !== null) {

        productos[indiceProductoEditando].categoria = categoria;
        productos[indiceProductoEditando].producto = producto;
        productos[indiceProductoEditando].cantidad = cantidad;
        productos[indiceProductoEditando].costo = costo;
        productos[indiceProductoEditando].costoUnitario = costoUnitario;
        productos[indiceProductoEditando].precio = precio;
        productos[indiceProductoEditando].ganancia = ganancia;
        productos[indiceProductoEditando].gananciaTotal = gananciaTotal;
        productos[indiceProductoEditando].margen = margen;

        // Mantener la fecha original
        if (!productos[indiceProductoEditando].fecha) {

            const fecha = new Date();

            productos[indiceProductoEditando].fecha =
                fecha.toLocaleDateString("es-ES", {
                    month: "long",
                    year: "numeric"
                });

        }

        localStorage.setItem(
            "productos",
            JSON.stringify(productos)
        );

        alert("✅ Producto actualizado correctamente.");

        indiceProductoEditando = null;

        // Restaurar formulario
        document.querySelector("#registro h2").textContent =
            "📦 Registrar producto";

        document.getElementById("botonGuardar").style.display = "none";

        // Volver a consultar productos
        mostrarConsulta();

        return;
    }


    // =====================================
    // REGISTRAR PRODUCTO NUEVO
    // =====================================

    const fecha = new Date();

    const opcionesFecha = {
        month: "long",
        year: "numeric"
    };

    const mesAnio =
        fecha.toLocaleDateString("es-ES", opcionesFecha);


    const nuevoProducto = {

        categoria: categoria,
        producto: producto,
        cantidad: cantidad,
        costo: costo,
        costoUnitario: costoUnitario,
        precio: precio,
        ganancia: ganancia,
        gananciaTotal: gananciaTotal,
        margen: margen,
        fecha: mesAnio

    };


    productos.push(nuevoProducto);

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

    alert("✅ Producto guardado correctamente.");

    document.getElementById("botonGuardar").style.display = "none";

    document.getElementById("producto").value = "";
document.getElementById("cantidad").value = "";
document.getElementById("costo").value = "";
document.getElementById("precio").value = "";

document.getElementById("resultado").innerHTML = "";

}


function volverInicio() {

    document.querySelector("main").style.display = "grid";

    document.querySelector("header").style.display = "block";

    document.querySelector(".boton-salir").style.display = "block";

    document.querySelector(".seccion-registro").style.display = "none";

    document.querySelector(".seccion-consulta").style.display = "none";

    document.querySelector(".seccion-historial").style.display = "none";

    document.querySelector(".seccion-rentabilidad").style.display = "none";

    document.querySelector(".seccion-guia").style.display = "none";

}

function mostrarConsulta() {

    document.querySelector("main").style.display = "none";

    document.querySelector("header").style.display = "none";

    document.querySelector(".boton-salir").style.display = "none";

    document.querySelector(".seccion-registro").style.display = "none";

    document.querySelector(".seccion-consulta").style.display = "block";

    mostrarProductos();
}

function mostrarProductos() {

    const lista = document.getElementById("listaProductos");

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    const filtro = document.getElementById("filtroCategoria").value;


    if (productos.length === 0) {

        lista.innerHTML = `
            <div class="sin-productos">
                <p>📦 No hay productos registrados.</p>
            </div>
        `;

        return;
    }


    lista.innerHTML = "";


    productos.forEach((producto, indice) => {

        if (filtro !== "Todas" && producto.categoria !== filtro) {
            return;
        }


        let resultado;
        let icono;


        if (producto.ganancia > 0) {

            resultado = "Ganancia";
            icono = "📈";

        } else if (producto.ganancia < 0) {

            resultado = "Pérdida";
            icono = "📉";

        } else {

            resultado = "Sin ganancia";
            icono = "⚖️";

        }


        lista.innerHTML += `

            <div class="tarjeta-producto">

                <h3>
                    ${icono} ${producto.producto}
                </h3>

                <p>
                    <strong>Categoría:</strong>
                    ${producto.categoria}
                </p>

                <p>
                    <strong>Cantidad:</strong>
                    ${producto.cantidad} unidades
                </p>

                <p>
                    <strong>Costo total:</strong>
                    Bs ${producto.costo.toFixed(2)}
                </p>

                <p>
                    <strong>Costo unitario:</strong>
                    Bs ${producto.costoUnitario.toFixed(2)}
                </p>

                <p>
                    <strong>Precio de venta:</strong>
                    Bs ${producto.precio.toFixed(2)}
                </p>

                <hr>

                <p>
                    <strong>${icono} ${resultado} por unidad:</strong>
                    Bs ${Math.abs(producto.ganancia).toFixed(2)}
                </p>

                <p>
                    <strong>Margen:</strong>
                    ${producto.margen.toFixed(2)}%
                </p>

                <p class="fecha-producto">
                    📅 ${producto.fecha || "Fecha no registrada"}
                </p>

                <<div class="acciones-producto">

    <button
        class="boton-editar"
        onclick="editarProducto(${indice})"
    >
        ✏️ Editar
    </button>

    <button
        class="boton-eliminar"
        onclick="eliminarProducto(${indice})"
    >
        🗑️ Eliminar
    </button>

</div>

            </div>

        `;

    });

}

function mostrarHistorial() {

    document.querySelector("main").style.display = "none";

    document.querySelector("header").style.display = "none";

    document.querySelector(".boton-salir").style.display = "none";

    document.querySelector(".seccion-registro").style.display = "none";

    document.querySelector(".seccion-consulta").style.display = "none";

    document.querySelector(".seccion-historial").style.display = "block";

    cargarMesesHistorial();

    mostrarHistorialProductos();
}

function cargarMesesHistorial() {

    const selector = document.getElementById("filtroMes");

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Obtener los meses registrados
    const meses = [...new Set(
        productos
            .map(producto => producto.fecha)
            .filter(fecha => fecha)
    )];

    selector.innerHTML = `
        <option value="Todos">📅 Todos los meses</option>
    `;

    meses.forEach(mes => {

        selector.innerHTML += `
            <option value="${mes}">
                📅 ${mes}
            </option>
        `;

    });
}

function mostrarHistorialProductos() {

    const lista = document.getElementById("listaHistorial");

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    const filtroMes = document.getElementById("filtroMes").value;

    const filtroCategoria =
        document.getElementById("filtroHistorialCategoria").value;


    // Filtrar por mes
    if (filtroMes !== "Todos") {

        productos = productos.filter(
            producto => producto.fecha === filtroMes
        );

    }


    // Filtrar por categoría
    if (filtroCategoria !== "Todas") {

        productos = productos.filter(
            producto => producto.categoria === filtroCategoria
        );

    }


    // Si no hay resultados
    if (productos.length === 0) {

        lista.innerHTML = `
            <div class="sin-historial">
                <p>📦 No hay registros para los filtros seleccionados.</p>
            </div>
        `;

        return;
    }


    lista.innerHTML = "";


    // Mostrar productos
    productos.forEach(producto => {

        let resultado;
        let icono;

        if (producto.ganancia > 0) {

            resultado = "Ganancia";
            icono = "📈";

        } else if (producto.ganancia < 0) {

            resultado = "Pérdida";
            icono = "📉";

        } else {

            resultado = "Sin ganancia";
            icono = "⚖️";

        }


        lista.innerHTML += `

            <div class="tarjeta-historial">

                <h3>
                    ${icono} ${producto.producto}
                </h3>

                <p>
                    <strong>📂 Categoría:</strong>
                    ${producto.categoria}
                </p>

                <p>
                    <strong>📦 Cantidad:</strong>
                    ${producto.cantidad} unidades
                </p>

                <p>
                    <strong>💵 Costo total:</strong>
                    Bs ${producto.costo.toFixed(2)}
                </p>

                <p>
                    <strong>💰 Costo unitario:</strong>
                    Bs ${producto.costoUnitario.toFixed(2)}
                </p>

                <p>
                    <strong>🏷️ Precio de venta:</strong>
                    Bs ${producto.precio.toFixed(2)}
                </p>

                <hr>

                <p>
                    <strong>${icono} ${resultado} por unidad:</strong>
                    Bs ${Math.abs(producto.ganancia).toFixed(2)}
                </p>

                <p>
                    <strong>📊 Margen:</strong>
                    ${producto.margen.toFixed(2)}%
                </p>

                <p class="fecha-producto">
                    📅 ${producto.fecha || "Fecha no registrada"}
                </p>

            </div>

        `;

    });
}

function mostrarRentabilidad() {

    document.querySelector("main").style.display = "none";

    document.querySelector("header").style.display = "none";

    document.querySelector(".boton-salir").style.display = "none";

    document.querySelector(".seccion-registro").style.display = "none";

    document.querySelector(".seccion-consulta").style.display = "none";

    document.querySelector(".seccion-historial").style.display = "none";

    document.querySelector(".seccion-rentabilidad").style.display = "block";

    calcularRentabilidad();

    cargarMesesRentabilidad();
}

function calcularRentabilidad() {

    const resumen = document.getElementById("resumenRentabilidad");
    const detalle = document.getElementById("detalleRentabilidad");

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    const filtroCategoria =
        document.getElementById("filtroRentabilidadCategoria").value;

    const filtroMes =
        document.getElementById("filtroRentabilidadMes").value;


    // Filtrar por categoría

    if (filtroCategoria !== "Todas") {

        productos = productos.filter(
            producto => producto.categoria === filtroCategoria
        );

    }


    // Filtrar por mes

    if (filtroMes !== "Todos") {

        productos = productos.filter(
            producto => producto.fecha === filtroMes
        );

    }


    // Si no existen productos

    if (productos.length === 0) {

        resumen.innerHTML = `
            <div class="sin-rentabilidad">
                <p>📦 No hay productos que coincidan con los filtros.</p>
            </div>
        `;

        detalle.innerHTML = "";

        return;
    }


    // Variables para los cálculos

    let costoTotal = 0;
    let gananciaTotal = 0;
    let productosGanancia = 0;
    let productosPerdida = 0;


    // Recorrer productos

    productos.forEach(producto => {

        costoTotal += producto.costo;
        gananciaTotal += producto.gananciaTotal;


        if (producto.ganancia > 0) {

            productosGanancia++;

        } else if (producto.ganancia < 0) {

            productosPerdida++;

        }

    });


    // Calcular margen general

    const margenGeneral =
        ((gananciaTotal / (costoTotal + gananciaTotal)) * 100);


    // Mostrar resumen

    resumen.innerHTML = `

        <div class="tarjetas-resumen">

            <div class="tarjeta-resumen">
                <span>📦</span>
                <small>Productos</small>
                <strong>${productos.length}</strong>
            </div>

            <div class="tarjeta-resumen">
                <span>💵</span>
                <small>Costo total</small>
                <strong>Bs ${costoTotal.toFixed(2)}</strong>
            </div>

            <div class="tarjeta-resumen">
                <span>💰</span>
                <small>Ganancia estimada</small>
                <strong>Bs ${gananciaTotal.toFixed(2)}</strong>
            </div>

            <div class="tarjeta-resumen">
                <span>📊</span>
                <small>Margen general</small>
                <strong>${margenGeneral.toFixed(2)}%</strong>
            </div>

            <div class="tarjeta-resumen">
                <span>📈</span>
                <small>Con ganancia</small>
                <strong>${productosGanancia}</strong>
            </div>

            <div class="tarjeta-resumen">
                <span>📉</span>
                <small>Con pérdida</small>
                <strong>${productosPerdida}</strong>
            </div>

        </div>

    `;


    // ================================
    // MOSTRAR DETALLE POR CATEGORÍAS
    // ================================

    detalle.innerHTML = "";


    // Crear grupos por categoría

    const categorias = {};

    productos.forEach(producto => {

        if (!categorias[producto.categoria]) {

            categorias[producto.categoria] = [];

        }

        categorias[producto.categoria].push(producto);

    });


    // Iconos de las categorías

    const iconosCategoria = {

        "Galletas": "🍪",
        "Dulces": "🍬",
        "Líquidos": "🥤",
        "Snacks": "🍿",
        "Otros": "📦"

    };


    // Mostrar cada categoría

    Object.keys(categorias).forEach(categoria => {

        const iconoCategoria =
            iconosCategoria[categoria] || "📦";


        detalle.innerHTML += `

            <div class="grupo-categoria-rentabilidad">

                <h3>
                    ${iconoCategoria} ${categoria}
                </h3>

                <div class="productos-categoria">

        `;


        // Mostrar productos de esa categoría

        categorias[categoria].forEach(producto => {

            let icono;
            let resultado;


            if (producto.ganancia > 0) {

                icono = "📈";
                resultado = "Ganancia";

            } else if (producto.ganancia < 0) {

                icono = "📉";
                resultado = "Pérdida";

            } else {

                icono = "⚖️";
                resultado = "Sin ganancia";

            }


            detalle.innerHTML += `

                <div class="detalle-rentabilidad">

                    <h4>
                        ${icono} ${producto.producto}
                    </h4>

                    <p>
                        <strong>Costo unitario:</strong>
                        Bs ${producto.costoUnitario.toFixed(2)}
                    </p>

                    <p>
                        <strong>Precio de venta:</strong>
                        Bs ${producto.precio.toFixed(2)}
                    </p>

                    <p class="estado-ganancia">
                        ${icono} ${resultado}:
                        Bs ${Math.abs(producto.ganancia).toFixed(2)}
                        por unidad
                    </p>

                    <p>
                        <strong>Margen:</strong>
                        ${producto.margen.toFixed(2)}%
                    </p>

                    <p>
                        <strong>📅 Fecha:</strong>
                        ${producto.fecha || "Fecha no registrada"}
                    </p>

                </div>

            `;

        });


        detalle.innerHTML += `

                </div>

            </div>

        `;

    });

}

function mostrarGuia() {

    document.querySelector("main").style.display = "none";

    document.querySelector("header").style.display = "none";

    document.querySelector(".boton-salir").style.display = "none";

    document.querySelector(".seccion-registro").style.display = "none";

    document.querySelector(".seccion-consulta").style.display = "none";

    document.querySelector(".seccion-historial").style.display = "none";

    document.querySelector(".seccion-rentabilidad").style.display = "none";

    document.querySelector(".seccion-guia").style.display = "block";

}

function confirmarBorrado() {

    const confirmar = confirm(
        "⚠️ ¿Estás segura de que deseas eliminar todos los productos registrados?\n\nEsta acción no se puede deshacer."
    );

    if (!confirmar) {
        return;
    }

    localStorage.removeItem("productos");

    alert("✅ Todos los datos fueron eliminados correctamente.");

    // Limpiar las pantallas
    document.getElementById("listaProductos").innerHTML = "";

    document.getElementById("listaHistorial").innerHTML = "";

    document.getElementById("resumenRentabilidad").innerHTML = "";

    document.getElementById("detalleRentabilidad").innerHTML = "";

}

function cargarMesesRentabilidad() {

    const selector = document.getElementById("filtroRentabilidadMes");

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    const meses = [...new Set(
        productos
            .map(producto => producto.fecha)
            .filter(fecha => fecha)
    )];

    selector.innerHTML = `
        <option value="Todos">📅 Todos los meses</option>
    `;

    meses.forEach(mes => {

        selector.innerHTML += `
            <option value="${mes}">
                📅 ${mes}
            </option>
        `;

    });
}

let indiceProductoEditando = null;


function editarProducto(indice) {

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    const producto = productos[indice];

    if (!producto) {
        alert("⚠️ No se encontró el producto.");
        return;
    }

    indiceProductoEditando = indice;

    // Abrir pantalla de registro
    mostrarRegistro();

    // Cambiar título
    document.querySelector("#registro h2").textContent =
        "✏️ Editar producto";

    // Cargar datos
    document.getElementById("categoria").value = producto.categoria;
    document.getElementById("producto").value = producto.producto;
    document.getElementById("cantidad").value = producto.cantidad;
    document.getElementById("costo").value = producto.costo;
    document.getElementById("precio").value = producto.precio;

    // Mostrar botón para guardar cambios
    document.getElementById("botonGuardar").style.display = "block";

    document.getElementById("botonGuardar").textContent =
        "💾 GUARDAR CAMBIOS";

    document.getElementById("resultado").innerHTML = `
        <p>✏️ Editando: <strong>${producto.producto}</strong></p>
    `;
}

function eliminarProducto(indice) {

    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];

    const producto = productos[indice];

    if (!producto) {
        alert("⚠️ No se encontró el producto.");
        return;
    }

    const confirmar = confirm(
        `⚠️ ¿Deseas eliminar "${producto.producto}"?\n\nEsta acción no se puede deshacer.`
    );

    if (!confirmar) {
        return;
    }

    productos.splice(indice, 1);

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

    alert("✅ Producto eliminado correctamente.");

    mostrarProductos();
}

function salirDeLaApp() {

    const confirmar = confirm(
        "🚪 ¿Deseas salir de Dulce Costos?"
    );

    if (confirmar) {

        document.body.innerHTML = `
            <div class="pantalla-salida">

                <h1>🪙 DULCEAPP</h1>

                <h2>¡Hasta pronto!</h2>

                <p>La aplicación se ha cerrado.</p>

            </div>
        `;

    }

}