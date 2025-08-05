import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export const MapContainer = ({ latitude, longitude }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBaIJr8CHXwczff6Y90YjupUOzHYbL3xDo",
  });

  const mapStyles = {
    height: "200px",
    width: "100%",
    borderRadius: "0.5rem",
    marginTop: "0.5rem",
  };

  const defaultCenter = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={mapStyles} zoom={15} center={defaultCenter}>
      <Marker position={defaultCenter} />
    </GoogleMap>
  );
};
