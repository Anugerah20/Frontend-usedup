import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Map = () => {
     const mapContainerRef = useState(null); // kontainer peta
     const mapRef = useState(null); // Instance peta
     const markerRef = useState(null); // Untuk marker
     const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_TOKEN_MAPBOX; // Token Mapbox

     // State detail alamat
     const [address, setAddress] = useState('');

     useEffect(() => {

          // Set token Mapbox
          mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

          // Inisialisasi Mapbox
          mapRef.current = new mapboxgl.Map({
               container: mapContainerRef.current,
               style: 'mapbox://styles/mapbox/streets-v12',
               center: [106.827183, -6.175394], // Koordinat awal peta (longitude, latitude)
               zoom: 13
          });

          // Inisialisasi Geocoder (untuk pencarian lokasi)
          const geocoder = new MapboxGeocoder({
               accessToken: mapboxgl.accessToken,
               mapboxgl: mapboxgl,
               marker: false // Menonaktifkan marker bawaan dari Geocoder
          });

          // Menambahkan Geocoder ke peta
          mapRef.current.addControl(geocoder);

          // Event listener ketika lokasi dipilih dari hasil pencarian Geocoder
          geocoder.on('result', (e) => {
               const { geometry } = e.result;

               // Jika marker sudah ada hapus marker sebelumnya
               if (markerRef.current) {
                    markerRef.current.remove();
               }

               // Tambahkan marker di lokasi yang dipilih
               const marker = new mapboxgl.Marker()
                    .setLngLat(geometry.coordinates) // Koordinat dari hasil pencarian
                    .addTo(mapRef.current); // Tambahkan marker ke peta

               markerRef.current = marker;

               // Arahkan peta ke lokasi yang dipilih
               mapRef.current.flyTo({
                    center: geometry.coordinates,
                    zoom: 14
               });


               // Reset address state
               setAddress('');

               // Debugging: output koordinat ke console
               // console.log('Koordinat dari hasil pencarian: ', geometry.coordinates);
          });

          // Trigger ketika pengguna mengklik di peta
          mapRef.current.on('click', async (e) => {
               const { lng, lat } = e.lngLat;

               // Jika marker sudah ada, hapus marker sebelumnya
               if (markerRef.current) {
                    markerRef.current.remove();
               }

               // Tambahkan marker di lokasi yang diklik
               const marker = new mapboxgl.Marker()
                    .setLngLat([lng, lat]) // Set marker ke posisi klik
                    .addTo(mapRef.current); // Tambahkan marker ke peta

               markerRef.current = marker;

               // Arahkan peta ke lokasi yang diklik (opsional)
               mapRef.current.flyTo({
                    center: [lng, lat],
                    zoom: 14
               });

               // Call reverse geocoding API to get address
               const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}`);

               const data = await response.json();

               // Debugging: output koordinat lnt & lat
               // console.log('Koordinat dari lng & lat: ', [lng, lat]);

               // Conditional statement untuk mengambil detail alamat
               // Extract address from the API response
               if (data && data.features && data.features.length > 0) {
                    setAddress(data.features[0].place_name);
               } else {
                    setAddress('Address not found');
               }

          });

          // Clean up saat komponen dibongkar
          return () => {
               if (mapRef.current) {
                    mapRef.current.remove();
               }
          };
     }, []);

     return (
          <div>
               <div ref={mapContainerRef} className="w-full h-56"></div>

               {/* Display the address */}
               {address && (
                    <div className="mt-4">
                         <h4 className="font-bold">Detail Alamat:</h4>
                         <p>{address}</p>
                    </div>
               )}
          </div>
     );

};

export default Map;
