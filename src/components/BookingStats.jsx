import React from "react";
import { Card, CardContent } from "../components/ui/card"; // Keep if you use your own Card component
import { Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function BookingStats({ bookings }) {
  // Calculate stats dynamically
  const stats = bookings.reduce(
    (acc, booking) => {
      acc.total += 1;
      if (booking.status === "confirmed") acc.confirmed += 1;
      else if (booking.status === "pending") acc.pending += 1;
      else if (booking.status === "cancelled") acc.cancelled += 1;
      return acc;
    },
    { total: 0, confirmed: 0, pending: 0, cancelled: 0 }
  );

  // Customize your cards
  const statCards = [
    {
      label: "Total Bookings",
      value: stats.total,
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Confirmed",
      value: stats.confirmed,
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Cancelled",
      value: stats.cancelled,
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}