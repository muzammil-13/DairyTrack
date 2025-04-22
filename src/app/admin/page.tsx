"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Input } from "@/components/ui/input";

// Dummy data for delivery logs
const deliveryLogs = [
  { date: "2024-07-15", customerId: "A123", quantity: 10 },
  { date: "2024-07-16", customerId: "B456", quantity: 15 },
  { date: "2024-07-17", customerId: "C789", quantity: 8 },
  { date: "2024-07-18", customerId: "A123", quantity: 12 },
  { date: "2024-07-19", customerId: "B456", quantity: 18 },
  { date: "2024-07-20", customerId: "C789", quantity: 7 },
];

// Dummy data for analytics
const analyticsData = [
  { name: "July 15", deliveries: 5, revenue: 500 },
  { name: "July 16", deliveries: 8, revenue: 800 },
  { name: "July 17", deliveries: 6, revenue: 600 },
  { name: "July 18", deliveries: 9, revenue: 900 },
  { name: "July 19", deliveries: 7, revenue: 700 },
  { name: "July 20", deliveries: 10, revenue: 1000 },
];

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDeliveryLogs = deliveryLogs.filter((log) =>
    log.customerId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Search by Customer ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Delivery Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-collapse border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 p-2">Date</th>
                      <th className="border border-gray-200 p-2">Customer ID</th>
                      <th className="border border-gray-200 p-2">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDeliveryLogs.map((log, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-2">{log.date}</td>
                        <td className="border border-gray-200 p-2">{log.customerId}</td>
                        <td className="border border-gray-200 p-2">{log.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Deliveries</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="deliveries" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Revenue</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
