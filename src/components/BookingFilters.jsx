import React from "react";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Search, Filter } from "lucide-react";

export default function BookingFilters({ filters = {}, onFilterChange }) {
  // Handle updating filter values
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search Field */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by name, email, or service..."
          value={filters.search || ""}
          onChange={(e) => handleChange("search", e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Status Filter */}
      <Select
        value={filters.status || "all"}
        onValueChange={(value) => handleChange("status", value)}
      >
        <SelectTrigger className="w-full sm:w-40 flex items-center">
          <Filter className="h-4 w-4 mr-2 text-gray-500" />
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
