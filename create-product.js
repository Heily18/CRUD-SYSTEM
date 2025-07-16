document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.product-form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const precioRegular = parseFloat(document.getElementById('precio-regular').value);
        const precio = parseFloat(document.getElementById('precio').value);
        const descripcion = document.getElementById('descripcion').value;
        const estado = document.getElementById('estado').value;
        
        try {
            // Crear objeto con los datos del producto
            const producto = {
                nombre: nombre,
                precioRegular: precioRegular,
                precio: precio,
                descripcion: descripcion,
                estado: estado,
                fechaCreacion: new Date()
            };
            
            // Guardar en Firestore
            await db.collection("productos").add(producto);
            
            alert('Producto creado exitosamente!');
            form.reset();
            
        } catch (error) {
            console.error("Error al crear el producto: ", error);
            alert('Error al crear el producto. Por favor, intenta de nuevo.');
        }
    });
}); 