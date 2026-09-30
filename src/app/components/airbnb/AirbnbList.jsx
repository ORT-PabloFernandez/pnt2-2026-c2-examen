"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function AirbnbList() {
    const [listings, setListings] = useState([]);
    const [page, setPage] = useState(1);
    const router = useRouter();

    useEffect(() => {
        cargarListings();
    }, [page])


    async function cargarListings() {
        const token = localStorage.getItem('authToken');
        const url = 'https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings?pageSize=100&page=' + page;

        const res = await fetch(url, {
            headers: { Authorization: 'Bearer ' + token },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
            setListings(data);
        }
    }

    setFavoritos(nuevos);
    localStorage.setItem('favoritos', JSON.stringify(nuevos))
}

function verDetalle(item) {
    localStorage.setItem('detalle', JSON.stringify(item));
}

function agregarFavorito(item) {
    const guardados = JSON.parse(localStorage.getItem('favoritos')) || [];
    const nuevos = guardados.concat(item.id);
    localStorage.setItem('favoritos', JSON.stringify(nuevos));
    console.log('Agregado a Favoritos')
}

return (
    <div>
        <h1>Airbnb</h1>

        {listings && listings.map((item) =>
            <div key={item.id}>
                <img src={item.image.picture_url} />
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
                <a href={item.listing_url}>Ver en Airbnb</a>
                <button onClick={() => agregarFavorito(item)}>Favorito</button>
                <button onClick={() => verDetalle(item)}>Ver Detalle</button>
            </div>
        )}

        <button onClick={() => setPage(page - 1)}>Anterior</button>
        <button onClick={() => setPage(page + 1)}>Siguiente</button>

    </div>
)

