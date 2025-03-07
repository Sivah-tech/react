import React, { useState, useTransition, useEffect } from "react";
import Modal from "react-modal";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
  category: any; // You can adjust the type according to your category structure
  onSave: (id: string, newName: string) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  mutate,
  category,
  onSave,
}) => {
  const [newName, setNewName] = useState('');
  const [isPending, startTransition] = useTransition();

  // Update the form with the category name when the modal is opened or category changes
  useEffect(() => {
    if (category) {
      setNewName(category.Name); // Set the current category name
    }
  }, [category]);

  // Handle saving the new category name
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (newName.trim()) {
      onSave(category?._id, newName);
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

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
        <div className="flex items-center justify-between mb-10">
          <h2 className="main-heading">Edit Category Information</h2>
          <button
            onClick={onClose}
            className="bg-[#3B3F88] text-white p-1 px-2 rounded-3xl"
            aria-label="Close Edit Modal"
          >
            ✖
          </button>
        </div>
        <form onSubmit={handleSave} className="grid md:flex flex-wrap gap-5">
          {/* Category ID (readonly) */}
          <div className="w-full">
            <input
              type="hidden"
              name="id"
              value={category?._id || ''}
              readOnly
              className="w-full p-2 border rounded bg-gray-200"
            />
          </div>

          {/* Category Name */}
          <div className="w-full">
            <label className="block">Name</label>
            <input
              type="text"
              name="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border rounded"
              aria-label="Category Name"
            />
          </div>

          {/* Save Button */}
          <div className="w-full">
            <button
              disabled={isPending}
              type="submit"
              className="w-full button !h-[44px] rounded-lg flex items-center justify-center"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;
