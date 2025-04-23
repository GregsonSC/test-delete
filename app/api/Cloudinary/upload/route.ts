//https://www.youtube.com/watch?v=_Xkdn1QpPG0&t=1768s
import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { uploadImageToCloudinary } from "../../utils/cloudinary";

// Configuration
cloudinary.config({
  cloud_name: "deimspwc6",
  api_key: "597296641252981",
  api_secret: "hV-zb_wBxhTvjhk3KPoJhTBs15E",
});

//"Handler for POST requests (image upload)."
export async function POST(request: Request) {
  try {
    //Extracts the form data sent in the request.
    const data = await request.formData();
    const file = data.get("file");

    //"Validates that a file has been provided and that it is a valid instance of File."
    if (!file || !(file instanceof File)) {
      return NextResponse.json("No valid image file provided.", {
        status: 400,
      });
    }

    // Converts the file into a byte buffer so it can be processed by Cloudinary.
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

   const result =await uploadImageToCloudinary(buffer);
    // Returns a JSON response with the message and the secure URL of the uploaded image.
    return NextResponse.json({
      message: "Image uploaded.",
      url: result.secure_url,
    });
  } catch (error) {
    // Global error handling: logs the error to the console and responds with a 500 error.
    console.error("Error uploading image to Cloudinary.:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
