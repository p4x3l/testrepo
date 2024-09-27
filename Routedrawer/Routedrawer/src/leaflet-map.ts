export class LeafletMap {
    private map: L.Map;
  
    constructor(mapId: string, center: [number, number], zoom: number) {
      // Initialize the map
      this.map = L.map(mapId).setView(center, zoom);
  
      // Load OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
    }
  
    addMarker(lat: number, lng: number, color: string) {
      const markerIcon = L.icon({
        iconUrl: `https://via.placeholder.com/15/${color}/000000?text=+`,
        iconSize: [15, 15],
        iconAnchor: [7.5, 7.5]
      });
      L.marker([lat, lng], { icon: markerIcon }).addTo(this.map);
    }
  
    drawRoute(segments: Array<Array<{ longitude: number, latitude: number }>>) {
      segments.forEach(segment => {
        const latlngs = segment.map(loc => [loc.latitude, loc.longitude] as [number, number]);
        const polyline = L.polyline(latlngs, { color: 'blue' }).addTo(this.map);
  
        // Add a blue marker at the start of the segment
        const start = segment[0];
        this.addMarker(start.latitude, start.longitude, '008000');
  
        // Add a green marker at the end of the segment
        const end = segment[segment.length - 1];
        this.addMarker(end.latitude, end.longitude, 'FF0000');
  
        // Fit map bounds to the polyline
        this.map.fitBounds(polyline.getBounds());
      });
    }
  }
  