import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Icons} from '@/components/icons';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-primary" href="https://example.com">
            DairyTrack!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by exploring the following features:
        </p>

        <div className="mt-6 flex max-w-4xl sm:w-full flex-wrap justify-around gap-4">
          <Link href="/qr-scanner">
            <Card className="w-full sm:w-auto">
              <CardHeader>
                <CardTitle>QR Scanner</CardTitle>
                <CardDescription>Scan QR codes for delivery attendance.</CardDescription>
              </CardHeader>
              <CardContent>
                <Icons.qrCode className="h-6 w-6 mx-auto" />
                <Button className="w-full mt-4">
                  Go to Scanner
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin">
            <Card className="w-full sm:w-auto">
              <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>View delivery logs, reports, and analytics.</CardDescription>
              </CardHeader>
              <CardContent>
                <Icons.barChart className="h-6 w-6 mx-auto" />
                <Button className="w-full mt-4">
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/demand-forecast">
            <Card className="w-full sm:w-auto">
              <CardHeader>
                <CardTitle>Demand Forecasting</CardTitle>
                <CardDescription>Predict milk delivery demand using AI.</CardDescription>
              </CardHeader>
              <CardContent>
                <Icons.listChecks className="h-6 w-6 mx-auto" />
                <Button className="w-full mt-4">
                  View Forecast
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by DairyTrack
        </a>
      </footer>
    </div>
  );
}

