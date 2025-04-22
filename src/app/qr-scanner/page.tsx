"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { logDelivery } from "@/services/delivery";
import { getCustomer } from "@/services/customer";
import { Check, XCircle } from "lucide-react";

export default function QRScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [deliveryLogged, setDeliveryLogged] = useState(false);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
  }, []);

  const handleScan = () => {
    if (!scanning) {
      setScanning(true);
      setScanResult(null);

      const canvas = document.createElement('canvas');
      const video = videoRef.current;

      if (!video) {
        toast({
          variant: 'destructive',
          title: 'Video element not found',
          description: 'Please ensure the video element is correctly loaded.',
        });
        setScanning(false);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        toast({
          variant: 'destructive',
          title: 'Could not get canvas context',
          description: 'Failed to get 2D context for the canvas.',
        });
        setScanning(false);
        return;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Placeholder QR code decoding logic (replace with actual QR code library)
      // This example simulates QR code scanning and extracts a customer ID
      const simulatedCustomerId = simulateQRCodeScan(imageData);

      if (simulatedCustomerId) {
        setScanResult(simulatedCustomerId);
        setScanning(false);
        toast({
          title: 'QR Code Scanned',
          description: `Customer ID: ${simulatedCustomerId}`,
        });
      } else {
        setScanResult(null);
        setScanning(false);
        toast({
          variant: 'destructive',
          title: 'QR Code Not Found',
          description: 'No valid QR code detected. Please try again.',
        });
      }
    }
  };

  const handleLogDelivery = async () => {
    if (scanResult) {
      try {
        const customer = await getCustomer(scanResult);
        // Get current GPS coordinates
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const delivery = {
          customerId: scanResult,
          gps: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          timestamp: new Date().toISOString(),
        };

        await logDelivery(delivery);
        setDeliveryLogged(true);
        toast({
          title: 'Delivery Logged',
          description: `Delivery logged for customer ${customer.name} at ${customer.address}.`,
        });
      } catch (error: any) {
        console.error('Error logging delivery:', error);
        toast({
          variant: 'destructive',
          title: 'Delivery Log Failed',
          description: error.message || 'Failed to log delivery. Please try again.',
        });
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'No Customer ID',
        description: 'Please scan a QR code to get the customer ID before logging delivery.',
      });
    }
  };

  // Simulate QR code scanning and return a customer ID
  const simulateQRCodeScan = (imageData: ImageData): string | null => {
    // In a real application, this would use a QR code scanning library to
    // decode the image data and extract the customer ID from the QR code.
    // For this simulation, we'll just check if the image data is valid
    // and return a dummy customer ID if it is.
    if (imageData && imageData.data.length > 0) {
      return 'customer123'; // Replace with actual QR code decoding logic
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>QR Scanner</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {hasCameraPermission ? (
            <>
              <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted />
              <Button onClick={handleScan} disabled={scanning}>
                {scanning ? 'Scanning...' : 'Scan QR Code'}
              </Button>
            </>
          ) : (
            <Alert variant="destructive">
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera access to use this feature.
              </AlertDescription>
            </Alert>
          )}

          {scanResult && (
            <Alert>
              <AlertTitle>Scan Result</AlertTitle>
              <AlertDescription>
                Customer ID: {scanResult}
                {deliveryLogged && <Check className="ml-2 text-green-500 inline-block" />}
              </AlertDescription>
            </Alert>
          )}

          <Button onClick={handleLogDelivery} disabled={!scanResult || deliveryLogged}>
            {deliveryLogged ? 'Delivery Logged' : 'Log Delivery'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
