import React from "react";
import { Card, CardContent } from "@/components/ui/card"; 
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Clock, Mail, Phone, MoreVertical, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

// Status styles configuration
const STATUS_STYLES = {
  confirmed: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200", label: "Confirmed" },
  pending: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200", label: "Pending" },
  cancelled: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200", label: "Cancelled" },
};

export default function BookingCard({ booking, onStatusChange, onEdit, onDelete }) {
  const status = STATUS_STYLES[booking.status] || STATUS_STYLES.pending;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                {booking.name.charAt(0).toUpperCase()}
              </div>

              {/* Name & Status */}
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{booking.name}</h3>
                <Badge className={`${status.bg} ${status.text} ${status.border} border mt-1`}>
                  {status.label}
                </Badge>
              </div>
            </div>

            {/* Dropdown Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(booking)}>Edit Booking</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange(booking, "confirmed")}>Mark as Confirmed</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange(booking, "pending")}>Mark as Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange(booking, "cancelled")}>Mark as Cancelled</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(booking)} className="text-red-600">Delete Booking</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Details */}
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{booking.service}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>{format(new Date(booking.booking_date), "MMMM d, yyyy")}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>{format(new Date(booking.booking_date), "h:mm a")}</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-500" />
              <span className="text-sm">{booking.email}</span>
            </div>

            {booking.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{booking.phone}</span>
              </div>
            )}

            {booking.notes && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 italic">"{booking.notes}"</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
