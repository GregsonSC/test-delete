//https://www.youtube.com/watch?v=_Xkdn1QpPG0&t=1768s
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//Function Upload the image to Cloudinary.
async function uploadImageToCloudinary(buffer: Buffer): Promise<UploadApiResponse> {
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
export async function createImage(file: File) {
  try {
    if (!file || !(file instanceof File)) {
      console.error("Invalid file input.");
      return undefined;
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const result = await uploadImageToCloudinary(buffer);

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
  }
}
