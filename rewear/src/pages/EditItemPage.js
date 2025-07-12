// src/pages/EditItemPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddItemPage.css"; // Reusing same styles

const EditItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    tags: "",
    condition: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/items/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setForm({
            title: data.name,
            description: data.description,
            category: data.category,
            type: data.type,
            tags: data.tags,
            condition: data.condition,
            image: data.image || null,
          });
          setPreview(data.image);
        } else {
          alert("⚠️ Failed to fetch item");
        }
      } catch (err) {
        console.error("❌ Error fetching item:", err);
        alert("Network error");
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("🔐 Please log in first.");

    const formData = new FormData();
    formData.append("name", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("type", form.type);
    formData.append("tags", form.tags);
    formData.append("condition", form.condition);
    if (form.image && typeof form.image !== "string") {
      formData.append("image", form.image);
    }

    try {
      const res = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Item updated!");
        navigate("/my-listings");
      } else {
        alert("❌ Update failed: " + (data.message || data.error));
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("Network error");
    }
  };

  return (
    <div className="add-item-container">
      <form className="add-item-form" onSubmit={handleSubmit}>
        <h2>Edit Item</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="type"
          placeholder="Type"
          value={form.type}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags"
          value={form.tags}
          onChange={handleChange}
        />

        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
          required
        >
          <option value="">Select Condition</option>
          <option value="Like New">Like New</option>
          <option value="Gently Used">Gently Used</option>
          <option value="Worn but Usable">Worn but Usable</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="image-preview"
          />
        )}

        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default EditItemPage;
