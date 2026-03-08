import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import { X, Save } from "lucide-react";
import { motion } from "framer-motion";

export default function BookingForm({ booking, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(
    booking || {
      name: "",
      email: "",
      phone: "",
      service: "",
      booking_date: "",
      status: "pending",
      notes: "",
    }
  );

  // Update form fields dynamically
  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">
              {booking ? "Edit Booking" : "New Booking"}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Client name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="client@example.com"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {/* Service */}
              <div>
                <Label htmlFor="service">Service *</Label>
                <Input
                  id="service"
                  value={formData.service}
                  onChange={(e) => handleChange("service", e.target.value)}
                  placeholder="e.g., Consultation, Meeting"
                  required
                />
              </div>

              {/* Date & Time */}
              <div>
                <Label htmlFor="booking_date">Date & Time *</Label>
                <Input
                  id="booking_date"
                  type="datetime-local"
                  value={formData.booking_date}
                  onChange={(e) => handleChange("booking_date", e.target.value)}
                  required
                />
              </div>

              {/* Status */}
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Any special requests or notes..."
                className="h-24"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-slate-900 hover:bg-slate-800">
                <Save className="h-4 w-4 mr-2" />
                {booking ? "Update" : "Create"} Booking
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
