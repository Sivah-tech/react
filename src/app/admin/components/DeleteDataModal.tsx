import React from 'react';
import Modal from "react-modal";

interface DeleteModalProps {
    onClose: () => void;
    isOpen: boolean;
    selectedId?: string;
    handleDelete: () => void;
    title?: string;
}

const DeleteDataModal: React.FC<DeleteModalProps> = ({ onClose, isOpen, selectedId, handleDelete, title }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Delete Details"
            className="overflow-hidden relative z-10 max-w-[638px] py-9 px-8 bg-white mx-auto rounded-[20px] w-full max-h-[90vh] overflow-custom"
            overlayClassName="w-full h-full p-3 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
            ariaHideApp={false}
        >
            <div className='delete-modal-bg flex justify-center items-center mb-[60px]'>
                {/* Add text-center to center the title */}
                <h2 className='main-heading text-center w-full'>{title}</h2>
            </div>
            <div className='grid grid-cols-[1fr,1.5fr] gap-2.5'>
                <button onClick={handleDelete} className='text-[#1657FF] border border-[#1657FF] bg-white h-[50px] py-2 rounded-[50px] text-xl font-sfproDisplaybold'>
                    {('confirm')}
                </button>
                <button onClick={onClose} className='bg-[#FF16A2] text-white h-[50px] py-2 rounded-[50px] text-xl font-sfproDisplaybold'>
                    {('cancel')}
                </button>
            </div>
        </Modal>
    );
}

export default DeleteDataModal;
