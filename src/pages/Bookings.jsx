import React, { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import BookingCard from "../components/BookingCard";
import BookingFilters from "../components/BookingFilters";
import BookingForm from "../components/BookingForm";
import BookingStats from "../components/BookingStats";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [filters, setFilters] = useState({ search: "", status: "all" });

  // CREATE / UPDATE
  const handleSubmit = (data) => {
    if (editingBooking) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === editingBooking.id ? { ...data, id: b.id } : b
        )
      );
    } else {
      setBookings((prev) => [
        ...prev,
        {
          ...data,
          id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`, // Safe unique ID
          status: "pending",
          createdAt: new Date(),
        },
      ]);
    }

    setShowForm(false);
    setEditingBooking(null);
  };

  // STATUS CHANGE
  const handleStatusChange = (booking, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === booking.id ? { ...b, status: newStatus } : b))
    );
  };

  // EDIT
  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setShowForm(true);
  };

  // DELETE
  const handleDelete = (booking) => {
    if (window.confirm("Delete this booking?")) {
      setBookings((prev) => prev.filter((b) => b.id !== booking.id));
    }
  };

  // FILTERING
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      !filters.search ||
      booking.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      booking.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
      booking.service?.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.status === "all" || booking.status === filters.status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
            <p className="text-gray-600 mt-1">
              Manage your appointments and reservations
            </p>
          </div>

          <button
            onClick={() => {
              setEditingBooking(null);
              setShowForm(!showForm);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus className="h-5 w-5" />
            New Booking
          </button>
        </div>

        {/* Stats */}
        <BookingStats bookings={bookings} />

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <BookingForm
              key={editingBooking?.id || "new"} // Ensures form resets for new booking
              booking={editingBooking}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingBooking(null);
              }}
            />
          )}
        </AnimatePresence>

        {/* Filters */}
        <BookingFilters filters={filters} onFilterChange={setFilters} />

        {/* Bookings Grid */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed">
            <Calendar className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No bookings found
            </h3>
            <p className="mt-2 text-gray-600">
              {filters.search || filters.status !== "all"
                ? "Try adjusting your filters"
                : "Create your first booking to get started"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onStatusChange={handleStatusChange}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
