import mascotasApi from "../../api/api";
import { useEffect, useState } from "react";
import ComentarioForm from "../comentarios/ComentarioForm";

import { useParams, useNavigate } from "react-router-dom";

function MascotasDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);
    const [fetchError, setFetchError] = useState(false);
    const [mascota, setMascota] = useState(null);

    const [choices, setChoices] = useState(null);

    const [estadoSeleccionado, setEstadoSeleccionado] = useState("");

    const fetchMascotaDetail = async () => {
        try {
            const response = await mascotasApi.get(`mascotas/${id}/`);

            console.log(response.data);

            setMascota(response.data);
            setEstadoSeleccionado(response.data.estado);
        } catch (error) {
            console.log(error);
            setFetchError(true);
        }
    }
    const fetchChoices = async () => {
        try {

            const response = await mascotasApi.get("choices/");
            console.log(response.data);

            setChoices(response.data);

        } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);
            }
        }   
    



    useEffect(() => {
        fetchMascotaDetail();
        fetchChoices();
    },  []);



    



    const addComentario = async (comentario) => {
        try {

            const response = await mascotasApi.post(
                `mascotas/${id}/comentar/`,
                comentario
            );

            console.log(response.data);
            
            await fetchMascotaDetail();

        } catch (error) {
            if (error.response?.status === 404) {
                alert("Error 404. La mascota ya no existe o ya fue eliminada.");
                navigate("/mascotas");
                return;
            }
            console.log(error.response?.status);
            console.log(error.response?.data);
        }
    }  




    const deleteComentario = async (comentarioId) => {
        if (!window.confirm("¿Está seguro de eliminar este comentario?")) {
        return;
        }
        try {

            await mascotasApi.delete(`comentarios/${comentarioId}/`);

            await fetchMascotaDetail();

        } catch (error) {

            console.log(error.response?.status);
            console.log(error.response?.data);

        }
    }

    const actualizarEstado = async () => {
        try {

            await mascotasApi.patch(`mascotas/${id}/`, {
            estado: estadoSeleccionado
        });

        await fetchMascotaDetail();

    } catch  (error) {
        if (error.response?.status === 404) {
            alert("Error 404. La mascota ya no existe o ya fue eliminada.");
            navigate("/mascotas");
            return;
        }

    console.log(error.response?.status);
    console.log(error.response?.data);
}
}


//eliminar mascota dentro de details mascot
    const deleteMascota = async () => {
        if (!window.confirm("¿Está seguro de eliminar esta mascota?")) {
            return;
        }

        try {
            await mascotasApi.delete(`mascotas/${id}/`);
            navigate("/mascotas");

        } catch (error) {

            if (error.response?.status === 404) {
                alert("Error 404. La mascota ya no existe o ya fue eliminada.");
                navigate("/mascotas");
                return;
            }

            alert("Ocurrió un error al eliminar la mascota.");

            console.log(error.response?.status);
            console.log(error.response?.data);
        }
    }
    

    return (
    <div className="container mt-5 mb-5">

        {fetchError ? (

            <div className="alert alert-danger text-center">
                <h4>404 - Mascota no encontrada</h4>
            </div>

        ) : (

            <div className="card shadow p-4">

                <div className="row align-items-center">

                    <div className="col-md-5 text-center">

                        <img
                            src={mascota?.imagen}
                            alt={mascota?.nombre}
                            className="img-fluid rounded"
                            style={{
                                maxHeight: "450px",
                                objectFit: "contain"
                            }}
                        />

                    </div>

                    <div className="col-md-7">

                        <h2 className="mb-3">
                            {mascota?.nombre}
                        </h2>

                        <p className="mb-4">
                            {mascota?.descripcion}
                        </p>

                        <div className="row">

                            <div className="col-sm-6 mb-3">
                                <strong>Edad:</strong><br />
                                {mascota?.edad}
                            </div>

                            <div className="col-sm-6 mb-3">
                                <strong>Raza:</strong><br />
                                {mascota?.raza || "Sin información"}
                            </div>

                            <div className="col-sm-6 mb-3">
                                <strong>Estado:</strong><br />
                                {
                                mascota?.estado === "en_adopcion"
                                    ? "En adopción"
                                    : mascota?.estado
                                }
                            <select
                                className="form-select mt-2"
                                value={estadoSeleccionado}
                                onChange={(e) => setEstadoSeleccionado(e.target.value)}
                            >
                                {choices?.estado?.map((estado) => (
                                    <option
                                        key={estado.value}
                                        value={estado.value}
                            >
                                        {estado.label}
                                    </option>
                                ))}
                            </select>

                            <button
                                className="btn btn-primary btn-sm mt-2"
                                onClick={actualizarEstado}
                            >
                                Actualizar estado
                            </button>
                            <button
                                className="btn btn-danger btn-sm mt-2 ms-2"
                                onClick={deleteMascota}
                            >
                                Eliminar mascota    
                            </button>

                            </div>

                            <div className="col-sm-6 mb-3">
                                <strong>Sexo:</strong><br />
                                {mascota?.sexo}
                            </div>

                            <div className="col-sm-6 mb-3">
                                <strong>Tamaño:</strong><br />
                                {mascota?.tamano}
                            </div>

                        </div>
                                        <hr className="my-4" />

                <h3>Comentarios</h3>

                {
                    mascota?.comentarios?.length > 0 ? (

                        mascota.comentarios.map((comentario) => (

                            <div key={comentario.id} className="card mb-3">

                                <div className="card-body">

                                    <strong>Autor: </strong>{comentario.autor}

                                    <p className="mt-2 mb-0">
                                        {comentario.contenido}
                                    </p>
                                    <button
                                        className="btn btn-danger btn-sm mt-3"
                                        onClick={() => deleteComentario(comentario.id)}
                                    >
                                        Eliminar
                                    </button>

                                </div>

                            </div>

                        ))

                    ) : (

                        <p>No existen comentarios para esta mascota..</p>

                    )
                }
                <hr className="my-4" />

                <ComentarioForm
                onAdd={addComentario} />

                    </div>

                </div>

            </div>

        )}

    </div>
);
}

export default MascotasDetail;