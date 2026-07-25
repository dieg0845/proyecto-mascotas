import { useNavigate } from "react-router-dom";
import MascotasForm from "../components/mascotas/MascotasForm";
import mascotasApi from "../api/api";
function NuevaMascotaPage() {
    const navigate = useNavigate();

    const addMascotas = async (mascota) => {
    try {

        const response = await mascotasApi.post("mascotas/", mascota);

        console.log(response.data);

        navigate("/mascotas");

    } catch (error) {

        console.log(error.response?.status);
        console.log(error.response?.data);

    }
}
    return (
        <div className="container mt-4">

            <h1 className="text-center mb-4">
                Nueva Mascota
            </h1>

            <MascotasForm onAdd={addMascotas} />

        </div>
    );
}

export default NuevaMascotaPage;