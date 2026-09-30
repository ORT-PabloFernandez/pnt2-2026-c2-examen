'use client';

import { useEffect, useState } from 'react';
import './airbnblist.css';

const API_URL =  'https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net';

export default function AirbnbList() {
    const [airbnbs, setAirbnbs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const loadAirbnbs = async () => {
        try {
            const token = localStorage.getItem('authToken');

            const response = await fetch(
                `${API_URL}/api/listings?pageSize=100&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Error');
            }

            const data = await response.json();

            setAirbnbs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAirbnbs();
    }, []);

    if (loading) {
        return (
            <div>
                <p className="loading-text">Cargando</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <p className="error-message">{error}</p>
            </div>
        );
    }

    return (
        <div className="airbnb-page">
            <div className="airbnb-container">
                <div className="airbnb-header">
                    <h1 className="airbnb-title">Airbnb List</h1>
                    <p className="airbnb-subtitle">
                        Mostrando los primeros 100
                    </p>
                </div>

                <div className="airbnb-grid">
                    {airbnbs.map((airbnb) => (
                        <div key={airbnb._id} className="airbnb-card">
                            <div>
                                {airbnb.images?.picture_url ? (
                                    <img
                                        src={airbnb.images.picture_url}
                                        alt={airbnb.name}
                                        className="airbnb-image"
                                    />
                                ) : (
                                    <div className="airbnb-image-placeholder"></div>
                                )}
                            </div>

                            <div className="airbnb-content">
                                <h3 className="airbnb-name">{airbnb.name}</h3>

                                <p>
                                    {airbnb.summary || 'Sin descripcion'}
                                </p>

                                <a className="" href={airbnb.listing_url} >
                                    Ver publicacion
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}