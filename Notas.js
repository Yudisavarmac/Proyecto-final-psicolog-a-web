document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("addButton");
    const saveButton = document.getElementById("saveButton");
    const emotionSelect = document.getElementById("emotionSelect");
    const intensityInput = document.getElementById("intensityInput");
    const noteInput = document.getElementById("noteInput");
    const dateInput = document.getElementById("dateInput");
    const notesContainer = document.getElementById("notesContainer");

    let notes = [];
    let editIndex = -1;

    // Cargar las notas desde localStorage si existen
    if (localStorage.getItem('notes')) {
        notes = JSON.parse(localStorage.getItem('notes'));
        updateUI();
    }

    // Mostrar formulario para añadir registro
    addButton.addEventListener("click", () => {
        emotionSelect.style.display = "block";
        intensityInput.style.display = "block";
        noteInput.style.display = "block";
        dateInput.style.display = "block";
        saveButton.style.display = "block";
        clearForm();
    });

    // Guardar registro
    saveButton.addEventListener("click", () => {
        const emotion = emotionSelect.value;
        const intensity = intensityInput.value;
        const note = noteInput.value;
        const date = dateInput.value;

        if (!emotion || !intensity || !note || !date) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const newNote = { emotion, intensity, note, date };

        if (editIndex === -1) {
            notes.push(newNote);
        } else {
            notes[editIndex] = newNote;
            editIndex = -1;
        }

        // Guardar las notas en localStorage
        localStorage.setItem('notes', JSON.stringify(notes));

        updateUI();
        clearForm();
    });

    // Actualizar interfaz con las notas
    function updateUI() {
        notesContainer.innerHTML = ""; // Limpiar contenedor

        notes.forEach((note, index) => {
            const noteCard = document.createElement("div");
            noteCard.className = "col-md-4 mb-3";

            // Aquí aplicamos el estilo del cuadro "Describe tu emoción"
            noteCard.innerHTML = `
                <div class="myTextArea text-light p-3" style="height: auto;">
                    <h5>${note.emotion}</h5>
                    <p>Intensidad: ${note.intensity}</p>
                    <p>Nota: ${note.note}</p>
                    <p>Fecha: ${note.date}</p>
                    <div class="d-flex justify-content-between mt-2">
                        <button class="myButton btn-sm" onclick="editNote(${index})">Editar</button>
                        <button class="myButton btn-sm" onclick="deleteNote(${index})">Eliminar</button>
                    </div>
                </div>
            `;
            notesContainer.appendChild(noteCard);
        });
    }

    // Limpiar formulario
    function clearForm() {
        emotionSelect.value = "";
        intensityInput.value = "";
        noteInput.value = "";
        dateInput.value = "";
    }

    // Editar nota
    window.editNote = (index) => {
        const note = notes[index];
        emotionSelect.value = note.emotion;
        intensityInput.value = note.intensity;
        noteInput.value = note.note;
        dateInput.value = note.date;
        editIndex = index;

        emotionSelect.style.display = "block";
        intensityInput.style.display = "block";
        noteInput.style.display = "block";
        dateInput.style.display = "block";
        saveButton.style.display = "block";
    };

    // Eliminar nota
    window.deleteNote = (index) => {
        if (confirm("¿Estás seguro de eliminar este registro?")) {
            notes.splice(index, 1);
            // Guardar las notas actualizadas en localStorage
            localStorage.setItem('notes', JSON.stringify(notes));
            updateUI();
        }
    };
});