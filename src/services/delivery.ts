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

/**
 * Logs delivery information.
 *
 * @param delivery The delivery information to log.
 * @returns A promise that resolves when the delivery information has been logged.
 */
export async function logDelivery(delivery: Delivery): Promise<void> {
  // TODO: Implement this by calling an API.
  console.log('Delivery logged', delivery);
}
