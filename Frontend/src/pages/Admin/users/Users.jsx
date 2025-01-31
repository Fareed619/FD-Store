import styled from "styled-components";

import { AdminWrappr } from "../admin.style";
import { MdDeleteForever } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../../redux/api/admin/usersApiSlice";

import { useEffect, useState } from "react";
import LoaderComponent from "../../../components/Loader";
import ModalComponent from "../../../components/ModalComponent";
import { toast } from "react-toastify";
import AdminTopComponent from "../AdminTopComponent";
import { devices } from "../../../../utils/styledConstants";
const Users = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [showModal, setShowModal] = useState(false);
  const [updateUsername, setUpdateUsername] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [updateUser] = useUpdateUserMutation();

  const updateSpecificUser = ({ _id, username, email }) => {
    setUpdateUsername(username);
    setUpdateEmail(email);
    setUserId(_id);
  };

  const deleteUserHandler = async (id) => {
    if (window.confirm("Are You Sure you Want To Delete A User ?")) {
      try {
        const deletedUser = await deleteUser(id).unwrap();
        if (deletedUser.error) {
          throw new Error(deletedUser.error?.message);
        }
        toast.success("User Deleted");
        refetch();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const updateUserInformation = async (e) => {
    e.preventDefault();
    const userData = {
      _id: userId,
      username: updateUsername,
      email: updateEmail,
    };

    try {
      const updatedUser = await updateUser(userData).unwrap();
      if (updatedUser.error) {
        throw new Error(updatedUser.error?.message);
      }
      refetch();
      toast.success("User Updated");
      setShowModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    refetch();
  }, [users]);

  if (isLoading) {
    return (
      <AdminWrappr>
        {" "}
        <LoaderComponent />;
      </AdminWrappr>
    );
  }
  if (isError) {
    return (
      <AdminWrappr>
        <h1>{error.message}</h1>
      </AdminWrappr>
    );
  }
  return (
    <AdminWrappr>
      <AdminTopComponent content="Users" addition="list" />

      <Table className="users-table">
        <thead className="users-table-thead">
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>IsAdmin</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="tbody-users">
          {users?.users?.map((user) => (
            <tr key={user._id} className="users-tbody-tr">
              <td data-cell="id">{user._id}</td>
              <td data-cell="name">{user.username}</td>
              <td data-cell="email">{user.email}</td>
              <td data-cell="isAdmin">{user.isAdmin ? "Yes" : "No"}</td>
              <td data-cell="actions" className="users-delete-td">
                <RiEdit2Fill
                  className="edit-icon-users"
                  onClick={() => {
                    setShowModal(true);
                    updateSpecificUser({
                      _id: user._id,
                      username: user.username,
                      email: user.email,
                    });
                  }}
                />
                {user.isAdmin ? null : (
                  <MdDeleteForever
                    className="delete-icon-users"
                    onClick={() => {
                      deleteUserHandler(user._id);
                    }}
                  />
                )}
              </td>
              <hr className="users-hr" />
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalComponent
        showModal={showModal}
        setShowModal={setShowModal}
        updateUsername={updateUsername}
        setUpdateUsername={setUpdateUsername}
        updateEmail={updateEmail}
        setUpdateEmail={setUpdateEmail}
        updateUserInformation={updateUserInformation}
      />
    </AdminWrappr>
  );
};

export default Users;

export const Table = styled.table`
  width: 90%;
  margin: auto;
  margin-top: 3rem;
  .users-table-thead {
    tr {
      font-size: 20px;
      th {
        text-align: start;
      }
    }
  }

  .tbody-users {
    color: rgba(255, 255, 255, 0.819);
    font-size: 18px;

    .users-tbody-tr {
      width: 100%;
      height: 70px;

      .users-hr {
        display: none;
      }

      td {
        width: fit-content;
      }

      .users-delete-td {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: start;
        height: 70px;
        font-size: 25px;
        .edit-icon-users {
          color: rgb(218, 165, 32);
          cursor: pointer;
        }
        .delete-icon-users {
          color: rgba(255, 0, 0, 0.899);
          cursor: pointer;
        }
      }
    }
  }

  @media ${devices.md} {
    .tbody-users {
      .users-tbody-tr {
        .users-hr {
          display: block;
          margin: 1rem 0;
        }
      }
    }
    th {
      display: none;
    }
    td {
      display: block;
    }
    td::before {
      content: attr(data-cell) " : ";
      font-size: 20px;
      font-weight: 600;
      color: white;
    }
    .users-delete-td {
      height: 20px !important;
    }
  }

  @media (768px <= width < 1024px) {
    width: 100%;
    margin-left: 2rem;
  }
`;
