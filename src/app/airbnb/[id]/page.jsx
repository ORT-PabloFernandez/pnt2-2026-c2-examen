"use client";

import { use, useEffect, useState } from "react";


export default function AirbnbDetalle() {
    const [item, setItem] = useState(null);

    useEffect(() => {
        setItem(JSON.parse(localStorage.getItem('detalle')));
    }, []);

    if (!item) return <p>Cargando...</p>;

    return (
        <div>
            <img src={item.image.picture_url}/>
            <h1>{item.name}</h1>
            <p>{item.summary}</p>
            <a href={item.listing_url}>Ver en Airbnb</a>
        </div>
    );
}