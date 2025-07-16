document.addEventListener('DOMContentLoaded', function() {
    const productsTable = document.getElementById('products-table');
    const productsTbody = document.getElementById('products-tbody');
    const loading = document.getElementById('loading');
    const noProducts = document.getElementById('no-products');
    
    // Escuchar cambios en tiempo real
    db.collection("productos").orderBy("fechaCreacion", "desc")
      .onSnapshot((querySnapshot) => {
        const productos = [];
        querySnapshot.forEach((doc) => {
            productos.push({
                id: doc.id,
                ...doc.data()
            });
        });
        loading.style.display = 'none';
        if (productos.length === 0) {
            noProducts.style.display = 'block';
            productsTable.style.display = 'none';
        } else {
            noProducts.style.display = 'none';
            productsTable.style.display = 'table';
            mostrarProductos(productos);
        }
      }, (error) => {
        console.error("Error al obtener productos: ", error);
        loading.textContent = 'Error al cargar productos';
      });

    function mostrarProductos(productos) {
        productsTbody.innerHTML = '';
        productos.forEach(producto => {
            const row = document.createElement('tr');
            // Formatear fecha
            let fecha = 'N/A';
            if (producto.fechaCreacion && producto.fechaCreacion.toDate) {
                fecha = producto.fechaCreacion.toDate().toLocaleDateString('es-ES');
            } else if (producto.fechaCreacion && producto.fechaCreacion.seconds) {
                fecha = new Date(producto.fechaCreacion.seconds * 1000).toLocaleDateString('es-ES');
            }
            // Formatear precios
            const precioRegular = producto.precioRegular ? `$${producto.precioRegular.toFixed(2)}` : 'N/A';
            const precio = producto.precio ? `$${producto.precio.toFixed(2)}` : 'N/A';
            // Clase para el estado
            const estadoClass = producto.estado === 'activo' ? 'estado-activo' : 'estado-inactivo';
            row.innerHTML = `
                <td>${producto.nombre || 'N/A'}</td>
                <td>${precioRegular}</td>
                <td>${precio}</td>
                <td>${producto.descripcion || 'N/A'}</td>
                <td><span class="${estadoClass}">${producto.estado || 'N/A'}</span></td>
                <td>${fecha}</td>
            `;
            productsTbody.appendChild(row);
        });
    }
}); 