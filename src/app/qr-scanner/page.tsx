"use client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function QRScannerPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card>
        <CardHeader>
          <CardTitle>QR Scanner</CardTitle>
        </CardHeader>
        <CardContent>
          <p>QR Scanner functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
