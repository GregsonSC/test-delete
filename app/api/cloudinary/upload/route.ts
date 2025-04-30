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
export async function createImage(formData: FormData) {
  try {
    //Extracts the form data sent in the request.
    const possibleKeys = ["imageUrl", "url", "imageurl"];

    // Busca el primer archivo válido entre las posibles claves
    let file: File | null = null;
    for (const key of possibleKeys) {
      const item = formData.get(key);
      if (item instanceof File) {
        file = item;
        break;
      }
    }

    //"Validates that a file has been provided and that it is a valid instance of File."
    if (!file || !(file instanceof File)) {
      console.error("The file does not exist.");
      return undefined;
    }

    // Converts the file into a byte buffer so it can be processed by Cloudinary.
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // result = url
    const result = await uploadImageToCloudinary(buffer);

    // Returns a URL of the uploaded image.
    return result.secure_url;
  } catch (error) {
    // Global error handling: logs the error to the console and responds with a 500 error.
    console.error("Error uploading image to Cloudinary.:", error);    
  }
}