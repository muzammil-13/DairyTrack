/**
 * Represents GPS coordinates.
 */
export interface GPSCoordinates {
  /**
   * The latitude.
   */
  latitude: number;
  /**
   * The longitude.
   */
  longitude: number;
}

/**
 * Represents delivery information.
 */
export interface Delivery {
  /**
   * The customer ID.
   */
  customerId: string;
  /**
   * The GPS coordinates of the delivery.
   */
  gps: GPSCoordinates;
  /**
   * The timestamp of the delivery.
   */
  timestamp: string;
}

const STORAGE_KEY = 'dairy_track_delivery_logs';

/**
 * Logs delivery information.
 *
 * @param delivery The delivery information to log.
 * @returns A promise that resolves when the delivery information has been logged.
 */
export async function logDelivery(delivery: Delivery): Promise<void> {
  // TODO: In a real implementation, try to send to Firebase first.
  // If that fails (offline), fall back to localStorage.
  
  try {
    // Simulate saving to local storage for offline support (MVP)
    const existingLogsJson = localStorage.getItem(STORAGE_KEY);
    const existingLogs: Delivery[] = existingLogsJson ? JSON.parse(existingLogsJson) : [];
    const newLogs = [...existingLogs, delivery];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLogs));
    console.log('Delivery logged locally:', delivery);
  } catch (error) {
    console.error('Failed to log delivery locally:', error);
    throw error;
  }
}

/**
 * Retrieves all logged deliveries.
 *
 * @returns A promise that resolves to an array of Delivery objects.
 */
export async function getDeliveryLogs(): Promise<Delivery[]> {
  try {
    const existingLogsJson = localStorage.getItem(STORAGE_KEY);
    return existingLogsJson ? JSON.parse(existingLogsJson) : [];
  } catch (error) {
    console.error('Failed to retrieve delivery logs:', error);
    return [];
  }
}
