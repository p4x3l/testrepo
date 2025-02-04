export class RouteAnalysis {
  private showInput: boolean = true;
  private inputText: string = '';
  private routes: RoutesReportItem[] = [];

  commitJson() {
    try {
      // Parse the inputText as JSON to get the route segments
      const parsedRoutes = JSON.parse(this.inputText) as RouteReport;

      // Check if the parsed data is valid (an array of arrays)
      if (parsedRoutes) {
        this.routes = parsedRoutes.routes;
        this.showInput = false; // Hide the input form once data is committed
      } else {
        alert('Invalid format! Please paste the data in correct format.');
      }
    } catch (e) {
      alert('Failed to parse the input! Please ensure it is valid JSON.');
    }
  }
}

interface RouteReport {
  generated: string;
  routes: RoutesReportItem[];
}

interface RoutesReportItem {
  routeId: string;
  routeName: string;
  numberOfTrips: number;
  plannedPassangers: number;
  actualPassangers: number;
  vehicle: string;
  vehicleSeats: number;
  students: RouteStudentReportItem[];
}

interface RouteStudentReportItem {
  id: string
  numberOfTrips: number;
}