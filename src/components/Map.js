import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'

// Fix para ícones do Leaflet no Next.js
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Ícone personalizado para localização do usuário
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Dados mockados de recursos (em uma aplicação real, isso viria de uma API)
const resourcesData = [
  {
    id: 1,
    name: 'Centro de Referência LGBT',
    category: 'Saúde',
    position: [-23.5505, -46.6333], // São Paulo
    address: 'Rua Major Sertório, 292 - República',
    description: 'Atendimento psicológico, jurídico e social para a comunidade LGBT+',
    phone: '(11) 3333-3333'
  },
  {
    id: 2,
    name: 'Casa 1',
    category: 'Comunidade',
    position: [-23.5580, -46.6405], // São Paulo
    address: 'Rua Condessa de São Joaquim, 277 - Liberdade',
    description: 'Centro de cultura e acolhimento para jovens LGBT+',
    phone: '(11) 4444-4444'
  },
  {
    id: 3,
    name: 'ONG Aliança Nacional LGBTI',
    category: 'Apoio Legal',
    position: [-23.5489, -46.6388], // São Paulo
    address: 'Av. São Luís, 165 - República',
    description: 'Organização de defesa de direitos LGBTI',
    phone: '(11) 5555-5555'
  },
  {
    id: 4,
    name: 'Instituto Cultural LGBT',
    category: 'Cultura',
    position: [-23.5435, -46.6435], // São Paulo
    address: 'Rua Augusta, 123 - Consolação',
    description: 'Espaço cultural com programação diversa e inclusiva',
    phone: '(11) 6666-6666'
  },
  {
    id: 5,
    name: 'Ambulatório Trans',
    category: 'Saúde',
    position: [-22.9068, -43.1729], // Rio de Janeiro
    address: 'Av. Pedro II, 111 - São Cristóvão',
    description: 'Serviço de saúde especializado para pessoas trans',
    phone: '(21) 7777-7777'
  },
  {
    id: 6,
    name: 'Grupo Dignidade',
    category: 'Educação',
    position: [-25.4284, -49.2733], // Curitiba
    address: 'Rua Visconde do Rio Branco, 1000 - Centro',
    description: 'Organização que promove educação em diversidade sexual',
    phone: '(41) 8888-8888'
  }
]

export default function Map({ userLocation, selectedCategory }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="map-loading">Carregando mapa...</div>
  }

  const centerPosition = userLocation || [-23.5505, -46.6333] // São Paulo como padrão

  const filteredResources = selectedCategory === 'Todos' 
    ? resourcesData 
    : resourcesData.filter(resource => resource.category === selectedCategory)

  return (
    <MapContainer 
      center={centerPosition} 
      zoom={userLocation ? 12 : 5} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {userLocation && (
        <>
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <strong>Sua localização</strong>
            </Popup>
          </Marker>
          <Circle 
            center={userLocation} 
            radius={5000} // 5km radius
            fillColor="blue"
            fillOpacity={0.1}
            color="blue"
            weight={1}
          />
        </>
      )}
      
      {filteredResources.map(resource => (
        <Marker key={resource.id} position={resource.position}>
          <Popup>
            <div className="popup-content">
              <h3>{resource.name}</h3>
              <p><strong>Categoria:</strong> {resource.category}</p>
              <p><strong>Endereço:</strong> {resource.address}</p>
              <p><strong>Descrição:</strong> {resource.description}</p>
              <p><strong>Telefone:</strong> {resource.phone}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}