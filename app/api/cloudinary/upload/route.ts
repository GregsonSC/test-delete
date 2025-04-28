//https://www.youtube.com/watch?v=_Xkdn1QpPG0&t=1768s
import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: "deimspwc6",
  api_key: "597296641252981",
  api_secret: "hV-zb_wBxhTvjhk3KPoJhTBs15E",
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
    const file = formData.get("imageUrl");

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
    // return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
