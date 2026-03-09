import React, { useState, useEffect } from "react";
import { Plus, Calendar } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

import BookingCard from "../components/BookingCard";
import BookingFilters from "../components/BookingFilters";
import BookingForm from "../components/BookingForm";
import BookingStats from "../components/BookingStats";

const supabase = createClient(
  "https://kbssnjhvznsluvjypogi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtic3Nuamh2em5zbHV2anlwb2dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMzE3MTksImV4cCI6MjA4ODYwNzcxOX0.C__8jlgj3jR5bqU1hFpIpajdi71Eiw_O5C6laENu0xY"
);

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [filters, setFilters] = useState({ search: "", status: "all" });
  const [loading, setLoading] = useState(true);

  // FETCH
  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching:", error);
    else setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // CREATE / UPDATE
  const handleSubmit = async (data) => {
    if (editingBooking) {
      const { error } = await supabase
        .from("bookings")
        .update({
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service,
          booking_date: data.booking_date,
          status: data.status,
          notes: data.notes,
        })
        .eq("id", editingBooking.id);

      if (error) console.error("Error updating:", error);
    } else {
      const { error } = await supabase.from("bookings").insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        booking_date: data.booking_date,
        status: data.status || "pending",
        notes: data.notes,
      }]);

      if (error) console.error("Error creating:", error);
    }

    await fetchBookings();
    setShowForm(false);
    setEditingBooking(null);
  };

  // STATUS CHANGE
  const handleStatusChange = async (booking, newStatus) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("id", booking.id);

    if (error) console.error("Error updating status:", error);
    else await fetchBookings();
  };

  // EDIT
  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setShowForm(true);
  };

  // DELETE
  const handleDelete = async (booking) => {
    if (window.confirm("Delete this booking?")) {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", booking.id);

      if (error) console.error("Error deleting:", error);
      else await fetchBookings();
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
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">BizHub Bookings</h1>
            <p className="text-gray-600 mt-1">
              Manage your appointments and reservations
            </p>
          </div>

          <button
            onClick={() => {
              setEditingBooking(null);
              setShowForm(!showForm);
            }}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg"
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
              key={editingBooking?.id || "new"}
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
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading BizHub Bookings...</div>
        ) : filteredBookings.length === 0 ? (
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