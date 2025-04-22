/**
 * Represents a customer with a unique ID.
 */
export interface Customer {
  /**
   * The unique identifier for the customer.
   */
  customerId: string;
  /**
   * The name of the customer.
   */
  name: string;
  /**
   * The address of the customer.
   */
  address: string;
}

/**
 * Asynchronously retrieves customer information by ID.
 *
 * @param customerId The ID of the customer to retrieve.
 * @returns A promise that resolves to a Customer object.
 */
export async function getCustomer(customerId: string): Promise<Customer> {
  // TODO: Implement this by calling an API.
  return {
    customerId: customerId,
    name: 'Jane Doe',
    address: '123 Highland',
  };
}
