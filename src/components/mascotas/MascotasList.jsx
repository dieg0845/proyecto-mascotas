
import { Link } from "react-router-dom";
import MascotasForm from "./MascotasForm";


function MascotasList({ lista, onAdd }) {



    return (
<>  
    <div className="row justify-content-center">
        <div className="col-lg-10">
            <h2 className="mb-4">
                Lista Mascotas
            </h2>
        </div>
    </div>

    <MascotasForm onAdd={onAdd} />

    <div className="row mt-4">

        {
            lista.map(m => (

                <div className="col-md-4 mb-4" key={m.id}>
                    {/*card h-100 shadow-sm*/}
                    <div className="text-center p-4">

                        <img
                            src={m.imagen}
                            className="card-img-top p-2"
                            alt={m.nombre}
                            style={{ height: "280px", objectFit: "contain", backgroundColor: "#f8f9fa" }}
                        />

                        <div className="card-body">

                            <h5 className="card-title">
                                {m.nombre}
                            </h5>

                            <p className="card-text">
                                {m.descripcion}
                            </p>

                            <p>
                                <strong>Edad:</strong> {m.edad}
                            </p>

                            <p>
                                <strong>Raza:</strong> {m.raza}
                            </p>

                            <Link
                                className="btn btn-primary"
                                to={`${m.id}`}
                            >
                                Ver mascota
                            </Link>

                        </div>

                    </div>

                </div>

            ))
        }

    </div>
</>
    )
}

export default MascotasList;