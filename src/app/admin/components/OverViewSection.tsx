"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { dashboardService } from "@/services/admin/admin-dashboard-service"; // Assuming this service fetches the dashboard data

// Define the fetch function for useSWR
const fetchDashboardData = async () => {
  try {
    const response = await dashboardService(`/admin/dashboard`);
    return response.data; // Adjust based on your actual response structure
  } catch (error) {
    throw new Error("Error fetching dashboard data");
  }
};

const OverViewSection: React.FC = () => {
  // Use SWR hook to fetch the dashboard data
  const { data, error, isLoading } = useSWR('dashboardData', fetchDashboardData);

  // Loading state
  if (isLoading) {
    return <div className="p-7 bg-white rounded-2xl">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="p-7 bg-white rounded-2xl">Error loading dashboard data</div>;
  }

  const userCount = data?.data?.totalusers || 0;
  
  // Assuming the data contains a 'userCount' field, you can adjust this based on your actual data structure
  
//   const userCount = data?.totalusers || 0;

  return (
    <div className="p-3 md:p-7 bg-white rounded-2xl flex flex-col items-center justify-between">
      <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>

      {/* User Count Card */}
      <div className="w-full max-w-sm p-5 bg-[#E87223] text-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Total Users</h3>
        <p className="text-4xl font-bold">{userCount}</p>
      </div>
    </div>
  );
};

export default OverViewSection;
