
function Inicio() {
    return (
        <div className="container text-center mt-5">

            <h1 className="mb-4">Bienvenido a Mascotas App</h1>

            <img
                src="https://img.magnific.com/vector-gratis/portada-facebook-cuidado-mascotas-diseno-plano_23-2149641135.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Mascotas"
                className="img-fluid rounded shadow"
            />

            <div className="mt-4">
                <a href="/mascotas" className="btn btn-primary">
                    Ingresar
                </a>
            </div>

        </div>
    );
}

export default Inicio;