import axios from 'axios';

interface ApiResponse {
  heading: string;
  information: string;
  // Add other properties based on the actual response structure
}

async function FetchApi(image: File): Promise<ApiResponse | void> {
  try {
    const data = new FormData();
    const host = "http://localhost:8000/api/predict";
    data.append('file', image);
    const response = await axios.post(host, data, {
      onUploadProgress: (progressEvent) => {
        if (progressEvent && progressEvent.total) {
          const loaded = (progressEvent.loaded / progressEvent.total) * 100;
          console.log(`Upload Progress: ${Math.round(loaded)}%`);
        }
      },
    });
    const responseData: ApiResponse = response.data;
    if (responseData) {
      console.log('Response Data:', responseData);
      return responseData; 
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export default FetchApi;
