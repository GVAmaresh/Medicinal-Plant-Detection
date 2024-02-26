import {create} from 'zustand';

interface ImageStore {
  information: string;
  addImage: (image: File) => Promise<void>;
}

export const useImageStore = create<ImageStore>((set) => ({
  information: '',
  addImage: async (image) => {
    try {
        if (!image) {
            console.error('No image selected');
            return;
          }
          const formData = new FormData();
          formData.append('file_upload', image);
          formData.append('fileName', "Medicine")
          console.log(formData.get('fileName'));
          console.log(formData.get('file_upload'));
          const response = await fetch('http://localhost:8000/api/predict', {
            method: 'POST',
            body: formData,
          });  
      if(response.ok){
        console.log("Image Upload Successfully")
      }else{
        console.error('Failed to fetch data:', response.status, response.statusText);
        return;
      }
      const information = await response.json();
      console.log(information);
      set({ information });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
}));
