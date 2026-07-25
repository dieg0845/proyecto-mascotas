import { Link } from "react-router-dom";

function Inicio() {
    return (
        <div
            style={{
                backgroundImage:
                    "url('https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_1280.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                className="text-center"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.45)",
                    padding: "50px",
                    borderRadius: "15px",
                    color: "white",
                }}
            >
                <h1 className="display-4 fw-bold">
                    Bienvenido a Mascotas App
                </h1>

                <p className="lead mt-3">
                    Encuentra, publica y ayuda a reunir mascotas con sus familias.
                </p>

                <Link
                    to="/mascotas"
                    className="btn btn-light"
                >
                    Ingresar
                </Link>
            </div>
        </div>
    );
}

export default Inicio;