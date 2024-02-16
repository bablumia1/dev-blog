import React, { ChangeEvent, useEffect, useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import axios, { AxiosResponse } from "axios";
import { NextPage } from "next";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const Users: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchAllUsers = () => {
    axios
      .get("/api/user")
      .then(({ data }: AxiosResponse<{ users: User[] }>) => {
        setUsers(data.users);
      })
      .catch((err) => console.log(err));
  };

  const makeAdmin = (userId: string) => {
    axios
      .put(`/api/user/${userId}`, { role: "admin" })
      .then(() => {
        fetchAllUsers();
      })
      .catch((err) => console.log(err));
  };

  const updateUserRole = (userId: string, newRole: string) => {
    const formData = new FormData();
    formData.append("role", newRole);
    axios
      .patch(`/api/user/${userId}`, formData)
      .then(() => {
        fetchAllUsers();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>, userId: string) => {
    const newRole = e.target.value;
    updateUserRole(userId, newRole);
  };

  return (
    <AdminLayout>
      <table className="min-w-full bg-white border border-gray-300 dark:bg-gray-900">
        <thead className="bg-gray-100 border-b dark:bg-gray-900">
          <tr>
            <th className="px-4 py-2 border-r">Name</th>
            <th className="px-4 py-2 border-r">Email</th>
            <th className="px-4 py-2 border-r">Role</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-4 py-2 border-r">{user.name}</td>
              <td className="px-4 py-2 border-r">{user.email}</td>
              <td className="px-4 py-2 border-r">{user.role}</td>
              <td className="px-4 py-2">
                {user.role !== "admin" && (
                  <button
                    className="px-2 py-1 text-white bg-blue-500 rounded"
                    onClick={() => makeAdmin(user._id)}
                  >
                    Make Admin
                  </button>
                )}{" "}
                <div className="flex items-center">
                  <div className="relative">
                    <select
                      className="block w-full px-2 py-1 pr-8 leading-tight text-gray-700 bg-white border border-gray-300 rounded appearance-none cursor-pointer focus:outline-none focus:shadow-outline"
                      value={user.role}
                      onChange={(e) => handleChange(e, user._id)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                      <svg
                        className="w-4 h-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5 8l5 5 5-5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default Users;
