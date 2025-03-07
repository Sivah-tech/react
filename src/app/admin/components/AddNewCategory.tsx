import React, { ChangeEvent, FormEvent, useState, useTransition } from "react";
import Modal from "react-modal";
import Image from "next/image"; // Import Image for Next.js

import { mutate } from "swr";
import { addNewCategory } from "@/services/admin/admin-dashboard-service";
import { toast } from "sonner";

interface AddNewCategoryOptions {
  isOpen: any;
  onClose: any;
  mutate: any;
}
const AddNewCategory: React.FC<AddNewCategoryOptions> = ({ isOpen, onClose, mutate }) => {

  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<any>({
    Name: "",
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement & { files: FileList };
    setFormData({
      ...formData,
      [name]: name === "phoneNumber" ? value : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let updatedFormData = { ...formData }
    startTransition(async () => {
      try {
        const response = await addNewCategory(`/admin/categories/`, updatedFormData);
        
        // Check if the response indicates a successful operation
        if (response?.success) {
          onClose();        // Close the modal or whatever operation you perform after success
          mutate();         // Re-fetch or update the data
          toast.success(response?.message);  // Show the success message
        } else {
          // If the response is unsuccessful, show the error message
          toast.error(response?.message || "Failed to add User Data");
        }
      } catch (error) {
        console.error("An error occurred", error);
        toast.error("An error occurred");
      }
      
      
    });
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Category Details"
      className="modal max-w-[1081px] mx-auto rounded-[20px] w-full max-h-[90vh] overflow-auto overflow-custom"
      overlayClassName="w-full h-full p-3 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
      ariaHideApp={false}
    >
      <div className="bg-white rounded-lg p-8 relative">
        <div className="flex items-center justify-between mb-10 ">
          <h2 className="main-heading">{('Add Category information')}</h2>
          <button
            onClick={onClose}
            className="bg-[#3B3F88] text-white p-1 px-2 rounded-3xl"
          >✖
          </button>
        </div>
        <div className=" fomm-wrapper">
          <form onSubmit={handleSubmit} className="grid md:flex flex-wrap gap-5">
            <div className="w-full">
              <label className="block">
                {('Name')}
              </label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
    
            <div className="w-full">
              <button
                disabled={isPending}
                type="submit"
                className="w-full button !h-[44px] rounded-lg flex items-center justify-center"
              >
                {('Save Details')}
              </button>
            </div>

          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddNewCategory;
