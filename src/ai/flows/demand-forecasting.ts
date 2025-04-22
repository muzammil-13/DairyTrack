'use server';
/**
 * @fileOverview Demand forecasting AI agent.
 *
 * - forecastDemand - A function that handles the demand forecasting process.
 * - ForecastDemandInput - The input type for the forecastDemand function.
 * - ForecastDemandOutput - The return type for the forecastDemand function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ForecastDemandInputSchema = z.object({
  historicalData: z
    .string()
    .describe(
      'Historical delivery data, including date, customer ID, and quantity delivered.'
    ),
});
export type ForecastDemandInput = z.infer<typeof ForecastDemandInputSchema>;

const ForecastDemandOutputSchema = z.object({
  forecast: z
    .string()
    .describe('The forecasted milk delivery demand, with estimated quantities.'),
  confidenceLevel: z
    .string()
    .describe('The confidence level of the forecast (e.g., High, Medium, Low).'),
  optimizationRecommendations: z
    .string()
    .describe(
      'Recommendations for optimizing delivery routes and minimizing waste based on the forecast.'
    ),
});
export type ForecastDemandOutput = z.infer<typeof ForecastDemandOutputSchema>;

export async function forecastDemand(input: ForecastDemandInput): Promise<ForecastDemandOutput> {
  return forecastDemandFlow(input);
}

const prompt = ai.definePrompt({
  name: 'forecastDemandPrompt',
  input: {
    schema: z.object({
      historicalData: z
        .string()
        .describe(
          'Historical delivery data, including date, customer ID, and quantity delivered.'
        ),
    }),
  },
  output: {
    schema: z.object({
      forecast: z
        .string()
        .describe('The forecasted milk delivery demand, with estimated quantities.'),
      confidenceLevel: z
        .string()
        .describe(
          'The confidence level of the forecast (e.g., High, Medium, Low).'
        ),
      optimizationRecommendations: z
        .string()
        .describe(
          'Recommendations for optimizing delivery routes and minimizing waste based on the forecast.'
        ),
    }),
  },
  prompt: `You are an AI assistant specialized in demand forecasting for milk deliveries.

  Analyze the following historical delivery data to predict future demand. Provide a clear forecast, a confidence level for the forecast, and recommendations for optimizing delivery routes and minimizing waste.

  Historical Data:
  {{historicalData}}

  Forecast:
  Confidence Level:
  Optimization Recommendations:`,
});

const forecastDemandFlow = ai.defineFlow<
  typeof ForecastDemandInputSchema,
  typeof ForecastDemandOutputSchema
>(
  {
    name: 'forecastDemandFlow',
    inputSchema: ForecastDemandInputSchema,
    outputSchema: ForecastDemandOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
