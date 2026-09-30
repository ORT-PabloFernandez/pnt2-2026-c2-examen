"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import './airbnblist.css';

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

function verDetalle(item) {
    localStorage.setItem('detalle', JSON.stringify(item));
    router.push('/airbnb/' + item._id);
}

function agregarFavorito(item) {
    const guardados = JSON.parse(localStorage.getItem('favoritos')) || [];
    const nuevos = guardados.concat(item.id);
    localStorage.setItem('favoritos', JSON.stringify(nuevos));
    console.log('Agregado a Favoritos')
}

return (
    <div className="airbnb-container">
        <h1 className="airbnb-title">Airbnb</h1>
        <div className="airbnb-grid">
        {listings && listings.map((item) =>
            <div key={item.id} className="airbnb-card">
                <div className="airbnb-image-container">
                <img src={item.images.picture_url} />
                </div>
                <h3 className="airbnb-name">{item.name}</h3>
                <p className="airbnb-summary">{item.summary}</p>
                <a href={item.listing_url}>Ver en Airbnb</a>
                <button className="favorite-button" onClick={() => agregarFavorito(item)}>Favorito</button>
                <button className="back-button" onClick={() => verDetalle(item)}>Ver Detalle</button>
            </div>
        )}
        </div>

        <button className="back-button" onClick={() => setPage(page - 1)}>Anterior</button>
        <button className="back-button" onClick={() => setPage(page + 1)}>Siguiente</button>

    </div>
)
}
