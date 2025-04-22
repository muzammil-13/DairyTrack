import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Admin dashboard content will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
