import React, { useState, useEffect } from "react";
import "./UserDashboard.css";
import pfp from "../../images/pfp.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../component/Navbar";
import UserSidebar from "../../component/UserSidebar";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem("user_id");

    // Redirect if user is not logged in
    if (!userId) {
      navigate("/login", { replace: true });
      return;
    }

    fetch(`http://localhost/Project_6BCA/server/fetch_users.php?id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUser(data.user);
          setEditData(data.user);
          setProfilePicPreview(data.user.profile_pic);
        } else {
          console.error("Failed to load user data", data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching user data", err);
      });
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveClick = async () => {
    const formData = new FormData();
    formData.append("id", editData.id);
    formData.append("name", editData.name);
    formData.append("email", editData.email);
    formData.append("phone", editData.phone);
    formData.append("role", editData.role);
    formData.append("address", editData.address);
    if (profilePicFile) {
      formData.append("profile_pic", profilePicFile);
    }

    try {
      const response = await fetch("http://localhost/Project_6BCA/server/edit_users.php", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.status === "success") {
        setUser({ ...editData, profile_pic: data.profile_pic });
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Error updating profile");
      }
    } catch (error) {
      alert("Something went wrong while saving profile.");
    }
  };

  const handleRemovePic = async () => {
    if (window.confirm("Are you sure you want to remove your profile picture?")) {
      const formData = new FormData();
      formData.append("id", user.id);

      try {
        const res = await fetch("http://localhost/Project_6BCA/server/remove_profile_pic.php", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.status === "success") {
          alert("Profile picture removed.");
          setProfilePicPreview(null);
          setProfilePicFile(null);
          setUser((prev) => ({ ...prev, profile_pic: null }));
          setEditData((prev) => ({ ...prev, profile_pic: null }));
        } else {
          alert("Failed to remove profile picture.");
        }
      } catch (error) {
        alert("Error while removing picture.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <UserSidebar />
      <div className="dashboard-container">
        <div className="dashboard-box">
          {/* 👤 User Profile */}
          <div className="user-profile-container">
            {!isEditing ? (
              <div className="profile-card">
                <div className="profile-image">
                  <img
                    src={
                      user?.profile_pic
                        ? `http://localhost/Project_6BCA/uploads/${user.profile_pic}`
                        : pfp
                    }
                    alt="Profile"
                  />
                </div>
                <div className="profile-details">
                  <h2>{user?.name}</h2>
                  <h4>Email: {user?.email}</h4>
                  <h4>Phone: {user?.phone}</h4>
                  <h4>Posts</h4>
                  <p>{user?.total_uploads || 0}</p>
                  <button
                    className="edit-profile-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="edit-form">
                <h2>Edit Profile</h2>
                <div className="profile-image">
                  <img
                    src={
                      profilePicPreview
                        ? profilePicPreview.startsWith("blob:")
                          ? profilePicPreview
                          : `http://localhost/Project_6BCA/uploads/${profilePicPreview}`
                        : pfp
                    }
                    alt="Preview"
                    className={profilePicPreview ? "image-preview" : ""}
                  />
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                  {user?.profile_pic && (
                    <button className="remove-pic-btn" onClick={handleRemovePic}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </div>
                <div className="profile-details">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name || ""}
                    onChange={handleInputChange}
                  />
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email || ""}
                    onChange={handleInputChange}
                  />
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={editData.phone || ""}
                    onChange={handleInputChange}
                  />
                  <label>Address:</label>
                  <textarea
                    rows={5}
                    name="address"
                    value={editData.address || ""}
                    onChange={handleInputChange}
                  ></textarea>
                  <div className="edit-form-actions">
                    <button onClick={handleSaveClick} className="save-btn">
                      Save Changes
                    </button>
                    <button onClick={() => setIsEditing(false)} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 🖼️ Recent Uploads */}
          <div className="recent-uploads">
            <h3>Your Recent Sketches</h3>
            <div className="thumbnail-container">
              {(user?.recent_uploads || []).slice(0, 3).map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost/Project_6BCA/server/${img.path}`}
                  alt="Sketch"
                  className="thumbnail"
                />
              ))}
              {(!user?.recent_uploads || user.recent_uploads.length === 0) && (
                <p>No recent uploads yet. Start uploading your artwork!</p>
              )}
            </div>
          </div>

          {/* ⚡ Quick Actions */}
          <div className="quick-actions">
            <NavLink to="/upload">
              <button>Upload Sketch</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
