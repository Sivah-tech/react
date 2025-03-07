"use client";
import { AddIcon, EditIcon, NextLabel, PreviousLabel, DeleteIcon } from '@/utils/svgicons';
import React, { useState } from 'react';
import AddNewClient from '../components/AddNewClient';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/navigation';
import DeleteDataModal from '../components/DeleteDataModal';
import useSWR from 'swr';
import { getAllUsers ,deleteUsers} from '@/services/admin/admin-dashboard-service';
import ReactLoading from 'react-loading';
import { toast } from 'sonner';

const Page: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState('page=1&limit=10');
  const { data, error, mutate, isLoading } = useSWR(`/admin/users?${query}`, getAllUsers);
  const usersData = data?.data?.data;
  const total = data?.data?.total ?? 0;
  const rowsPerPage = 10; // You might want to adjust the value to your actual needs.

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectedProfilePic, setSelectedProfilePic] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`);
  };

  const openDeleteModal = (id: string) => {
    setIsDeleteModalOpen(true);
    setSelectedId(id);
  };

  const handleDelete = async () => {
    try {
      console.log("hlo");
      const response = await deleteUsers(`/admin/user/${selectedId}`);
      if (response.success) {
        toast.success('user deleted successfully');
        mutate();
        setIsDeleteModalOpen(false);
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the user');
    }
  };

  const openProfile = (id: string) => {
    router.push(`/admin/profile/${id}`);
  };

  const addNewClient = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex gap-2.5 justify-end">
        {/* <SearchBar setQuery={setQuery} /> */}
        <button className="!rounded-[3px] !h-[37px] button !px-4" onClick={addNewClient}><AddIcon className="w-4 h-4" />Add New Client</button>
      </div>
      <div className="table-common overflo-custom mt-[20px] box-shadow">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center">
                  <ReactLoading type="spin" color="#26395e" height="20px" width="20px" />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="text-center text-red-500">
                  Error loading data.
                </td>
              </tr>
            ) : usersData?.length > 0 ? (
              usersData.map((row: any) => (
                <tr key={row?._id}>
                  <td>{row?.fullName}</td>
                  <td>{row?.email}</td>
                  <td>{row?.address}</td>
                  <td>
                    <div className="flex items-center gap-[6px]">
                      <button onClick={() => openProfile(row?._id)}>
                        <EditIcon />
                      </button>

                      <button onClick={() => openDeleteModal(row?._id)}><DeleteIcon /> </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="text-right mt-4">
        <ReactPaginate
          previousLabel={<PreviousLabel />}
          nextLabel={<NextLabel />}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(total / rowsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'inline-flex mt-[34px] gap-1'}
          pageClassName={'text-[#3C3F88] border border-{#F1F1F1} bg-white rounded-full'} // anchor tag
          pageLinkClassName={'grid place-items-center h-10 w-10 inline-block'}
          activeClassName={'!bg-[#1657FF] active rounded-full text-white'} // active anchor
          previousClassName={'leading-[normal]'}
          previousLinkClassName={'grid place-items-center h-10 w-10 inline-block border border-{#F1F1F1} bg-white rounded-full'}
          nextLinkClassName={'grid place-items-center h-10 w-10 inline-block border border-{#F1F1F1} bg-white rounded-full'}
          disabledClassName={'opacity-50 cursor-not-allowed'}
        />
      </div>
      <DeleteDataModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete User?"
        handleDelete={handleDelete}
      />
      <AddNewClient
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mutate={mutate}
      />
    </div>
  );
};

export default Page;
