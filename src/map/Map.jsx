import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Map = () => {
     const mapContainerRef = useRef(null);
     const mapRef = useRef(null);
     const markerRef = useRef(null);
     const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_TOKEN_MAPBOX;

     // State detail alamat dan lokasi user
     const [address, setAddress] = useState('');

     // State lokasi user saat ini
     const [currentLocation, setCurrentLocation] = useState(null);

     // Fungsi untuk reverse geocoding
     const fetchAddress = async (lng, lat) => {
          const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}`);
          const data = await response.json();
          if (data?.features?.length) {
               return data.features[0].place_name;
          }
          return 'Address not found';
     };

     // Fungsi untuk membuat marker baru
     const createMarker = (lng, lat) => {
          if (markerRef.current) {
               markerRef.current.remove();
          }
          const marker = new mapboxgl.Marker()
               .setLngLat([lng, lat])
               .addTo(mapRef.current);
          markerRef.current = marker;
     };

     useEffect(() => {
          // Set token Mapbox
          mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

          // Inisialisasi Mapbox
          mapRef.current = new mapboxgl.Map({
               container: mapContainerRef.current,
               style: 'mapbox://styles/mapbox/streets-v12',
               zoom: 13
          });

          // Fungsi untuk mendapatkan lokasi user saat ini
          const getUserLocation = () => {
               if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                         const { latitude, longitude } = position.coords;
                         setCurrentLocation([longitude, latitude]);

                         // Arahkan peta dan buatkan marker
                         mapRef.current.flyTo({ center: [longitude, latitude], zoom: 14 });
                         createMarker(longitude, latitude);

                         // detail alamat user
                         const address = await fetchAddress(longitude, latitude);
                         setAddress(address);
                    }, (error) => {
                         console.error('Error getting user location:', error);
                    });
               } else {
                    console.error('Geolocation is not supported by this browser');
               }
          };

          // fungsi untuk mendapatkan lokasi user
          getUserLocation();

          // Inisialisasi Geocoder
          const geocoder = new MapboxGeocoder({
               accessToken: mapboxgl.accessToken,
               mapboxgl: mapboxgl,
               marker: false // Nonaktifkan marker default dari Geocoder
          });

          // Menambahkan Geocoder ke peta
          mapRef.current.addControl(geocoder);

          // Event ketika lokasi dipilih dari hasil pencarian Geocoder
          geocoder.on('result', async (e) => {
               const { coordinates } = e.result.geometry;
               createMarker(coordinates[0], coordinates[1]);
               mapRef.current.flyTo({ center: coordinates, zoom: 14 });
               setAddress(e.result.place_name);
          });

          // Event ketika user mengklik di peta
          mapRef.current.on('click', async (e) => {
               const { lng, lat } = e.lngLat;
               createMarker(lng, lat);
               mapRef.current.flyTo({ center: [lng, lat], zoom: 14 });

               // Ambil detail alamat
               const address = await fetchAddress(lng, lat);
               setAddress(address);
          });

          // Cleanup saat komponen dibongkar
          return () => {
               if (mapRef.current) {
                    mapRef.current.remove();
               }
          };
     }, []);

     return (
          <div>
               <div ref={mapContainerRef} className="w-full h-56"></div>

               {/* Menampilkan detail alamat user */}
               {address && (
                    <div className="mt-4">
                         <h4 className="font-bold">Detail Lokasi:</h4>
                         <p>{address}</p>
                    </div>
               )}


               {/*
                    EDITOR: NABIL
                    DESCRIPTION: melihat longitude dan latitude user, boleh dihapus karena cuma untuk debugging
               */}

               {/* {currentLocation && (
                    <div className="mt-4">
                         <h4 className="font-bold">Lokasi Saat Ini:</h4>
                         <p>Longitude: {currentLocation[0]}</p>
                         <p>Latitude: {currentLocation[1]}</p>
                    </div>
               )} */}
          </div>
     );
};

export default Map;
