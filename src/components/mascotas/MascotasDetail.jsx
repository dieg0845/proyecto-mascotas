import { useParams } from "react-router-dom";
import mascotasApi from "../../api/api";
import { useEffect, useState } from "react";

function MascotasDetail() {
    const { id } = useParams();
    console.log(id);
    const [fetchError, setFetchError] = useState(false);
    const [mascota, setMascota] = useState(null);

    const fetchMascotaDetail = async () => {
        try {
            const response = await mascotasApi.get(`mascotas/${id}/`);
            console.log(response.data);
            setMascota(response.data);
        } catch (error) {
            console.log(error);
            setFetchError(true);
        }
    }

    useEffect(() => {
        fetchMascotaDetail();
    }, []);

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
                                {mascota?.estado}
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

                    </div>

                </div>

            </div>

        )}

    </div>
);
}

export default MascotasDetail;