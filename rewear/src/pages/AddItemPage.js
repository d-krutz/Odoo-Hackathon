// src/pages/AddItemPage.js
import React, { useState } from "react";
import "./AddItemPage.css";

const AddItemPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    tags: "",
    condition: "",
    imageFiles: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, imageFiles: files }));

    // Generate preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("⚠️ Please login first.");

    const formData = new FormData();
    formData.append("name", form.title); // Assuming backend expects `name`
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("type", form.type);
    formData.append("tags", form.tags);
    formData.append("condition", form.condition);

    for (const file of form.imageFiles) {
      formData.append("images", file);
    }

    try {
      const res = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Item submitted successfully!");
        setForm({
          title: "",
          description: "",
          category: "",
          type: "",
          tags: "",
          condition: "",
          imageFiles: [],
        });
        setPreviewImages([]);
      } else {
        alert("❌ Submission failed: " + (data.message || data.error));
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("Network error occurred");
    }
  };

  return (
    <div className="add-item-container">
      <form className="add-item-form" onSubmit={handleSubmit}>
        <h2>Add New Item</h2>

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
          placeholder="Category (e.g., Premium Wear)"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="type"
          placeholder="Type (e.g., T-shirt)"
          value={form.type}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
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
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required
        />

        {previewImages.length > 0 && (
          <div className="image-preview-container">
            {previewImages.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Preview ${idx}`}
                className="image-preview"
              />
            ))}
          </div>
        )}

        <button type="submit">Submit Item</button>
      </form>
    </div>
  );
};

export default AddItemPage;
