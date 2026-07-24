import { useEffect, useState } from "react";
import mascotasApi from "../../api/api";

function MascotasForm({ onAdd }) {
    const [estados, setEstados] = useState([]);
    const [tipoMascota, setTipoMascota] = useState([]);
    const [sexo, setSexo] = useState([]);
    const [tamano, setTamano] = useState([]);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [edad, setEdad] = useState("");
    const [raza, setRaza] = useState("");
    const [selectedEstado, setEstado] = useState("");
    const [selectedTipoMascota, setTipoMascotaSeleccionada] = useState("");
    const [selectedSexo, setSexoSeleccionado] = useState("");
    const [selectedTamano, setTamanoSeleccionado] = useState("");
    const [imagen, setImagen] = useState(null);

    const fetchChoices = async () => {
        try {
            const response = await mascotasApi.get("choices/");
            console.log(response.data.estado);
            setEstados(response.data.estado);
            setTipoMascota(response.data.tipo_animal);
            setSexo(response.data.sexo);
            setTamano(response.data.tamano);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchChoices();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(nombre, descripcion, edad, raza, selectedEstado, selectedTipoMascota, selectedSexo, selectedTamano, imagen);
        console.log(imagen);
        
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("edad", edad);
        formData.append("raza", raza);
        formData.append("estado", selectedEstado);
        formData.append("tipo_animal", selectedTipoMascota);
        formData.append("sexo", selectedSexo);
        formData.append("tamano", selectedTamano);
        formData.append("imagen", imagen);

        onAdd(formData);
    }

    return (
    <div className="row justify-content-center">
        <div className="col-lg-10">

            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="card p-4 shadow-sm"
            >

                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        className="form-control"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        rows="1"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                </div>

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Edad</label>
                        <input
                            className="form-control"
                            type="number"
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Raza</label>
                        <input
                            className="form-control"
                            type="text"
                            value={raza}
                            onChange={(e) => setRaza(e.target.value)}
                        />
                    </div>

                </div>

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Estado</label>
                        <select
                            className="form-select"
                            value={selectedEstado}
                            onChange={(e) => setEstado(e.target.value)}
                        >
                            <option value="">Sin estado</option>
                            {
                                estados.map(e => (
                                    <option value={e.value} key={e.value}>
                                        {e.label}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Tipo Animal</label>
                        <select
                            className="form-select"
                            value={selectedTipoMascota}
                            onChange={(e) => setTipoMascotaSeleccionada(e.target.value)}
                        >
                            <option value="">Sin estado</option>
                            {
                                tipoMascota.map(e => (
                                    <option value={e.value} key={e.value}>
                                        {e.label}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                </div>

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Sexo</label>
                        <select
                            className="form-select"
                            value={selectedSexo}
                            onChange={(e) => setSexoSeleccionado(e.target.value)}
                        >
                            <option value="">Sin estado</option>
                            {
                                sexo.map(e => (
                                    <option value={e.value} key={e.value}>
                                        {e.label}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Tamaño</label>
                        <select
                            className="form-select"
                            value={selectedTamano}
                            onChange={(e) => setTamanoSeleccionado(e.target.value)}
                        >
                            <option value="">Sin estado</option>
                            {
                                tamano.map(e => (
                                    <option value={e.value} key={e.value}>
                                        {e.label}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                </div>

                <div className="mb-4">
                    <label className="form-label">Imagen</label>
                    <input
                        className="form-control"
                        type="file"
                        onChange={(e) => setImagen(e.target.files[0])}
                    />
                </div>

                <button
                    className="btn btn-success w-100"
                    type="submit"
                >
                    Guardar
                </button>

            </form>

        </div>
    </div>
);
}

export default MascotasForm;