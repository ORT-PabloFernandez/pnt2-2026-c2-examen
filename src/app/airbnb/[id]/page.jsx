"use client";

import { useEffect, useState } from "react";
import '../../components/airbnb/airbnblist.css'

export default function AirbnbDetalle() {
    const [item, setItem] = useState(null);

    useEffect(() => {
        setItem(JSON.parse(localStorage.getItem('detalle')));
    }, []);

    if (!item) return <p>Cargando...</p>;

    return (
        <div className="airbnb-detail-container">
            <div className="airbnb-detail-image">
            <img src={item.images.picture_url}/>
            </div>
            <h1 className="airbnb-detail-title">{item.name}</h1>
            <p className="airbnb-detail-summary">{item.summary}</p>
            <a href={item.listing_url}>Ver en Airbnb</a>
        </div>
    );
}