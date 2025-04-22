"use client";
import React, { useState } from "react";

export function HomePageCloudinary() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [resume, setResume] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [topic, setTopic] = useState<string>("WEBDESIGN");
  const [publicationDate, setPublicationDate] = useState<string>("");

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData();
          if (file) {
            formData.append("file", file);
          }

          // Subir imagen a Cloudinary
          const response = await fetch("/api/Cloudinary/upload", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
          const uploadedImageUrl = data.url;
          setImageUrl(uploadedImageUrl);

          // Enviar datos del blog
          const blogData = {
            title,
            resume,
            content,
            topic: topic,
            publicationDate,
            imageUrl: uploadedImageUrl,
          };          

          const response2 = await fetch("/api/blog", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(blogData),
          });

          const result = await response2.json();
          console.log("Blog guardado:", result);
        }}
      >
        <input
          type="file"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              setFile(files[0]);
            }
          }}
        />

        <div>
          <label>Title</label>
          <input
            placeholder="Title of Blog"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Resumen</label>
          <input
            placeholder="Resumen of Blog"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </div>

        <div>
          <label>Content</label>
          <input
            placeholder="Content of Blog"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <label>Category of Blog</label>
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="WEBDESIGN">Web Design</option>
            <option value="DIGITALMARKETING">Digital Marketing</option>
            <option value="GRAPHICDESIGN">Graphic Design</option>
          </select>
        </div>

        <div>
          <label>Publication Date</label>
          <input
            type="date"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
        </div>

        <button type="submit">Enviar</button>
      </form>

      {imageUrl && <img src={imageUrl} alt="Uploaded image" />}
    </div>
  );
}
