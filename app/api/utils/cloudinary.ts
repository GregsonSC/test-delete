// lib/cloudinary.ts
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: "deimspwc6",
  api_key: "597296641252981",
  api_secret: "hV-zb_wBxhTvjhk3KPoJhTBs15E",
});

export async function uploadImageToCloudinary(buffer: Buffer): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (error, result) => {
        if (error || !result) {
          return reject(error);
        }
        resolve(result);
      })
      .end(buffer);
  });
}
