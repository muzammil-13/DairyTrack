"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  forecastDemand,
  ForecastDemandOutput,
} from "@/ai/flows/demand-forecasting";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export default function DemandForecastingPage() {
  const [historicalData, setHistoricalData] = useState("");
  const [forecastResult, setForecastResult] = useState<ForecastDemandOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await forecastDemand({ historicalData });
      setForecastResult(result);
      toast({
        title: "Demand Forecast Generated",
        description: "The demand forecast has been successfully generated.",
      });
    } catch (error: any) {
      console.error("Error generating forecast:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to generate demand forecast.",
      });
      setForecastResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Demand Forecasting</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="historicalData">Historical Delivery Data</Label>
              <Textarea
                id="historicalData"
                placeholder="Enter historical delivery data (date, customer ID, quantity)"
                value={historicalData}
                onChange={(e) => setHistoricalData(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Generating Forecast..." : "Generate Forecast"}
            </Button>
          </form>

          {forecastResult && (
            <div className="mt-4">
              <Alert>
                <AlertTitle>Forecast Result</AlertTitle>
                <AlertDescription>
                  <p className="font-bold">Forecast:</p>
                  <p>{forecastResult.forecast}</p>
                  <p className="font-bold mt-2">Confidence Level:</p>
                  <p>{forecastResult.confidenceLevel}</p>
                  <p className="font-bold mt-2">Optimization Recommendations:</p>
                  <p>{forecastResult.optimizationRecommendations}</p>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
