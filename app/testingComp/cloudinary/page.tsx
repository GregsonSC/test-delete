"use client";
import React, { useState } from "react";

export function HomePageCloudinary() {
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("WEBDESIGN");
  const [publicationDate, setPublicationDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!file) {
        throw new Error("Please select an image.");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("resume", resume);
      formData.append("content", content);
      formData.append("topic", topic);
      formData.append("publicationDate", publicationDate);
      formData.append("imageUrl", file); 

      const res = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error creating blog.");
      }

      setSuccess(true);
      setTitle("");
      setResume("");
      setContent("");
      setTopic("WEBDESIGN");
      setPublicationDate("");
      setFile(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full p-2 border rounded-md"
        />

        <input
          type="text"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Resume"
          required
          className="w-full p-2 border rounded-md"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
          className="w-full p-2 border rounded-md h-40"
        />

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        >
          <option value="WEBDESIGN">Web Design</option>
          <option value="DIGITALMARKETING">Digital Marketing</option>
          <option value="GRAPHICDESIGN">Graphic Design</option>
        </select>

        <input
          type="date"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">Blog created!</p>}
      </form>
    </div>
  );
}
