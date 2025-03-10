"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState, useTransition } from "react";
import { EditButtonIcon } from "@/utils/svgicons";
import { useParams } from "next/navigation";
import { getSingleUser, updateSingleUser } from "@/services/admin/admin-dashboard-service";
import useSWR from "swr";
import { toast } from "sonner";
import ReactLoading from "react-loading";
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
  const { id } = useParams();
  const { data, error, mutate, isLoading } = useSWR(`/admin/user/${id}`, getSingleUser);
  const customerData = data?.data?.data;
  const [formData, setFormData] = useState<any>({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    profilePic: "",
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (customerData?.user) {
      setFormData({
        fullName: customerData.user.fullName || "",
        phoneNumber: customerData.user.phoneNumber || "",
        email: customerData.user.email || "",
        address: customerData.user.address || "",
        profilePic: customerData?.user?.profilePic || "",
      });
    }
  }, [customerData]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let updatedFormData = { ...formData };
    startTransition(async () => {
      try {
        const response = await updateSingleUser(`/admin/user/${id}`, updatedFormData);
        console.log("response",response);
        if (response?.success) {
          toast.success("User details updated successfully", { position: "bottom-right" });
          mutate(); // Re-fetch updated data
          router.push(`/admin/users`);
        } else {
          toast.error("Failed to update user data");
        }
      } catch (error) {
        console.error("Error occurred", error);
        toast.error("An error occurred while updating user details");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <ReactLoading type={"spin"} color={"#1657FF"} height={"50px"} width={"50px"} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8">
        <h2 className="text-2xl font-semibold text-[#3C3F88] text-center mb-6">User Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1657FF] focus:outline-none"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1657FF] focus:outline-none"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Home Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1657FF] focus:outline-none"
                placeholder="Enter home address"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 bg-[#1657FF] text-white font-semibold rounded-md hover:bg-[#0f46c7] focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
