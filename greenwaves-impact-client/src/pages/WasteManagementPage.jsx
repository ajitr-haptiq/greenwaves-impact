import React, { useState } from "react";
import axios from "axios";

function WasteManagementPage() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      file.type.startsWith("image/") &&
      file.size <= 5 * 1024 * 1024
    ) {
      setImage(file);
      setError(null);
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError(
        file && file.size > 5 * 1024 * 1024
          ? "File size must be less than 5MB."
          : "Please upload a valid image file."
      );
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setError("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:4001/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "An error occurred while processing the image. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-68px)] bg-gradient-to-b from-green-300 to-green-400 px-4 pt-[100px]">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800">
            Join the GreenWave: Manage Your Waste Responsibly
          </h1>
          <p className="mt-4 text-lg text-gray-900 max-w-2xl mx-auto">
            Every small action matters! Take control of your waste, reduce your
            impact on the planet, and contribute to a greener tomorrow. Upload
            your waste image and get instant suggestions on how to recycle or
            reuse it effectively.
          </p>
        </div>

        <div className="bg-white bg-opacity-50 rounded-xl shadow-lg max-w-lg mx-auto p-6 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-green-700 text-center">
            AI Waste Management
          </h2>

          <div className="my-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full border border-gray-300 p-2 rounded-lg"
              disabled={loading}
              aria-label="Upload an image to identify waste type and recycling options"
            />
            <p className="text-sm text-gray-600 mt-2">
              Supported formats: JPG, JPEG, PNG. Max file size: 5MB.
            </p>
          </div>

          {error && (
            <div className="my-4 p-3 bg-red-100 text-red-600 rounded-md">
              {error}
            </div>
          )}

          {imagePreview && (
            <div className="my-4">
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !imagePreview}
            className={`w-full p-3 rounded-lg text-white mt-4 ${
              loading || !imagePreview
                ? "bg-green-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Processing..." : "Upload Image"}
          </button>

          {result && (
            <div className="mt-8 bg-green-50 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-800">
                Detected Object: {result.Name}
              </h3>
              <p className="mt-2 text-gray-800">
                <strong>How to Recycle:</strong> {result.HowToRecycle}
              </p>
              <p className="text-gray-800">
                <strong>How to Upcycle:</strong> {result.HowToUpcycle}
              </p>
              <p className="text-gray-800">
                <strong>Harmful for Nature (%):</strong>{" "}
                {result.HarmfulPercentage}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WasteManagementPage;
