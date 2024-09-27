
import { LeafletMap } from './leaflet-map';

export class MapView {
  private leafletMap: LeafletMap;
  private currentSegmentIndex: number = 0;
  private routes: Array<Array<{ Longitude: number, Latitude: number }>> = [];
  private showInput: boolean = true; // Controls visibility of the input field
  private inputText: string = ''; // For storing user input

  attached() {
    // Initialize the Leaflet map
    this.leafletMap = new LeafletMap('map', [51.505, -0.09], 5);

    // Draw the route based on the array of segments (routes)
    //this.leafletMap.drawRoute(this.routes);
  }

  commitLocations() {
    try {
      // Parse the inputText as JSON to get the route segments
      const parsedRoutes = JSON.parse(this.inputText);

      // Check if the parsed data is valid (an array of arrays)
      if (Array.isArray(parsedRoutes) && parsedRoutes.every(segment => Array.isArray(segment))) {
        this.routes = parsedRoutes;
        this.showInput = false; // Hide the input form once data is committed
        this.leafletMap = new LeafletMap('map', [51.505, -0.09], 5);
      } else {
        alert('Invalid format! Please paste the data in correct format.');
      }
    } catch (e) {
      alert('Failed to parse the input! Please ensure it is valid JSON.');
    }
  }

  drawNextSegment() {
    if (this.currentSegmentIndex < this.routes.length) {
      // Draw the current segment
      const segment = this.routes[this.currentSegmentIndex];
      this.leafletMap.drawRoute([segment]);

      // Increment the segment index for next button press
      this.currentSegmentIndex++;
    } else {
      alert('All segments have been drawn.');
    }
  }
}
