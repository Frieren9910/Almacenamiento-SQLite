const agregarTarea = async () => {
    const descripcion = document.querySelector('#nuevaTarea').value;
    if (descripcion.trim() === '') {
        alert('Por favor, ingresa una descripción para la tarea');
        return;
    }
    const response = await fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descripcion }),
    });
    const tarea = await response.json();
    agregarTareaALista(tarea);
};

const agregarTareaALista = (tarea) => {
    // Crear el elemento <li> para la tarea
    const li = document.createElement('li');
    li.textContent = tarea.descripcion;  // Solo mostramos la descripción de la tarea

    // Crear el botón de eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.onclick = () => eliminarTarea(tarea.id, li);  // Llamamos a eliminarTarea con el id de la tarea

    li.appendChild(btnEliminar);

    const listaTareas = document.querySelector('#listaTareas');
    listaTareas.appendChild(li);
};

const obtenerTareas = async () => {
    const response = await fetch('http://localhost:3000/tareas');
    const data = await response.json();
    data.tareas.forEach((tarea) => agregarTareaALista(tarea));
};

// Llama a obtenerTareas cuando cargue la página
document.addEventListener('DOMContentLoaded', obtenerTareas);

const eliminarTarea = async (id, liElemento) => {
    const response = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    
    if (data.message === 'Tarea eliminada correctamente') {
        liElemento.remove();
    } else {
        alert('Error al eliminar la tarea');
    }
};