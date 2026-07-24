import MascotasList from "../components/mascotas/MascotasList";
import { useEffect, useState } from "react";
import mascotasApi from "../api/api";
import { Outlet } from "react-router-dom";

function MascotasPage() {
    const [mascotasList, setMascotasList] = useState([]);

    const fetchMascotas = async () => {
        try {
            const response = await mascotasApi.get('mascotas/');
            console.log(response.data);
            setMascotasList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addMascotas = async (mascota) => {
        try {
            const response = await mascotasApi.post('mascotas/', mascota);
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            fetchMascotas();
        }
    }

    useEffect(() => {
        fetchMascotas();
    }, [])

    return (
    <>
    <div className="container mt-4">

        <h1 className="text-center mb-4">
            Página Mascotas
        </h1>

        <MascotasList
            lista={mascotasList}
            onAdd={addMascotas}
        />

    </div>

    <Outlet />
</>
    )
}

export default MascotasPage;