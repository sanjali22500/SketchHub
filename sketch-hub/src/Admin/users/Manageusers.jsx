import React, { useEffect, useState } from "react";
import "./Manageusers.css";
import AdminSidebar from "../AdminSidebar";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Manageusers() {
  const [profilePic, setProfilePic] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    address: "",
    password: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost/project_6BCA/server/fetch_users.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUsers(data.users);
        } else {
          console.error("Failed to load users");
        }
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch("http://localhost/project_6BCA/server/delete_users.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setUsers(users.filter((user) => user.id !== id));
          } else {
            alert("Failed to delete user");
          }
        });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AdminSidebar />
      <button className="add-user-btn" onClick={() => setShowAddForm(true)}>
        Add New User
      </button>
      <div className="manage-users-container">
        <div className="admin-users-box">
          <h2>Manage Users</h2>

          <div className="users-search">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="users-table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Profile</th>
                  <th>NAME</th>
                  <th>E-MAIL ADDRESS</th>
                  <th>ROLE</th>
                  <th>Created_at</th>
                  <th>Phone No.</th>
                  <th>Address</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <img
                        src={`http://localhost/project_6BCA/uploads/${user.profile_pic}`}
                        alt="Profile"
                        width="40"
                        height="40"
                        className="user-img"
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.created_at}</td>
                    <td>{user.phone || "N/A"}</td>
                    <td>{user.address || "N/A"}</td>
                    <td>
                      <button
                        className="adminusers-btn edit"
                        onClick={() => handleEdit(user)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="adminusers-btn delete"
                        onClick={() => handleDelete(user.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editUser && (
            <div className="edit-form2">
              <h3>Edit User</h3>
              <input
                type="text"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
                placeholder="Name"
              />
              <input
                type="email"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                placeholder="Email"
              />
              <input
                type="text"
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: e.target.value })
                }
                placeholder="Role"
              />
              <input
                type="text"
                value={editUser.phone || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, phone: e.target.value })
                }
                placeholder="Phone"
              />
              <input
                type="text"
                value={editUser.address || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, address: e.target.value })
                }
                placeholder="Address"
              />
              <button
                onClick={() => {
                  fetch("http://localhost/project_6BCA/server/edit_users.php", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({
                      id: editUser.id,
                      name: editUser.name,
                      email: editUser.email,
                      role: editUser.role,
                      phone: editUser.phone || "",
                      address: editUser.address || "",
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.status === "success") {
                        alert("User updated");
                        setUsers((prevUsers) =>
                          prevUsers.map((u) =>
                            u.id === editUser.id ? editUser : u
                          )
                        );
                        setEditUser(null);
                      } else {
                        alert("Update failed");
                      }
                    });
                }}
              >
                Save
              </button>
              <button onClick={() => setEditUser(null)}>Cancel</button>
            </div>
          )}
        </div>
      </div>
      {showAddForm && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Add New User</h3>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="Email"
            />
            <input
              type="text"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              placeholder="Role"
            />
            <input
              type="text"
              value={newUser.phone}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
              placeholder="Phone"
            />
            <input
              type="text"
              value={newUser.address}
              onChange={(e) =>
                setNewUser({ ...newUser, address: e.target.value })
              }
              placeholder="Address"
            />
            <input
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              placeholder="Password"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />

            <button
              onClick={() => {
                const formData = new FormData();
                for (const key in newUser) {
                  formData.append(key, newUser[key]);
                }
                if (profilePic) {
                  formData.append("profile_pic", profilePic);
                }

                fetch("http://localhost/project_6BCA/server/add_user.php", {
                  method: "POST",
                  body: formData,
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.status === "success") {
                      alert("User added successfully!");
                      setUsers([
                        ...users,
                        {
                          ...newUser,
                          id: data.id,
                          created_at: new Date().toISOString(),
                        },
                      ]);
                      setShowAddForm(false);
                      setNewUser({
                        name: "",
                        email: "",
                        role: "",
                        phone: "",
                        address: "",
                        password: "",
                      });
                      setProfilePic(null);
                    } else {
                      alert("Failed to add user.");
                    }
                  });
              }}
            >
              Add
            </button>
            <button onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
