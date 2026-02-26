// Lógica provisional para el sistema de filtros (luego se modificará)
const [searchTerm, setSearchTerm] = useState("");
const [categoriaFiltro, setCategoriaFiltro] = useState("TODAS");

const jobsFiltrados = jobs.filter(job => {
    const matchSearch = job.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategoria = categoriaFiltro === "TODAS" || job.categoria === categoriaFiltro;
    return matchSearch && matchCategoria;
});