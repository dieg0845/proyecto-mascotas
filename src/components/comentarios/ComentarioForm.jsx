import { useState } from "react";



function ComentarioForm({ onAdd }) {
    const [autor, setAutor] = useState("");
    const [contenido, setContenido] = useState("");

    const [errores, setErrores] = useState({});




    const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevosErrores = {};
    if (!autor.trim()) {
    nuevosErrores.autor = "El autor es obligatorio";
}
    if (!contenido.trim()) {
    nuevosErrores.contenido = "El comentario es obligatorio";
}
    if (Object.keys(nuevosErrores).length > 0) {
    setErrores(nuevosErrores);
    return;
}
    setErrores({});


    await onAdd({
        autor,
        contenido
    });
    //para limpiar el from
    setAutor("");
    setContenido("");
}

    return (
        <>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label">
                Autor
            </label>

        <input
        className="form-control"
        type="text"
        value={autor}
        onChange={(e) => {
            setAutor(e.target.value);

            if (errores.autor) {
                setErrores({
                    ...errores,
                autor: ""
                });
            }
        }}
        />
        {errores.autor && (
            <small className="text-danger">
                {errores.autor}
            </small>
    )
}
        </div>

        <div className="mb-3">
            <label className="form-label">
                Comentario
            </label>

            <textarea
            className="form-control"
            rows="1,5"
            value={contenido}
            onChange={(e) => {
                setContenido(e.target.value);

                if (errores.contenido) {
                    setErrores({
                        ...errores,
                        contenido: ""
                    });
                }
            }}
            />
            {errores.contenido && (
                <small className="text-danger">
                    {errores.contenido}
                </small>)}
            </div>

            <button
                className="btn btn-success"
                type="submit"
            >
                Agregar comentario
            </button>
        </form>
        </>
    );
}

export default ComentarioForm;