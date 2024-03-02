import axios from 'axios';

export interface ApiResponse {
  heading: string;
  information: string;
  confidence:string ,
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
        }
      },
    });
    const responseData: ApiResponse = response.data;
    if (responseData) {
      return responseData; 
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}


export default FetchApi


