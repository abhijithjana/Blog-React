import config from'../config/config'
import { Client ,Storage,ID} from "appwrite";

export class FileService{
       client=new Client();
       bucket;
  
       constructor(){
        this.client
        .setEndpoint(config.APPWRITE_URL)
        .setProject(config.PROJECT_ID);
        this.bucket=new Storage(this.client);
       }

       async uploadFile(file){
        try {
            return  await this.bucket.createFile(config.BUCKET_ID,ID.unique(),file) ;
        } catch (error) {
            console.log("Error in uploading file ::"+error);
            return false;
        }
       }

       async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(config.BUCKET_ID,fileID);
            return true;
        } catch (error) {
            console.log("Error in fileDeleting ::"+error);
            return false;
        }
       }
    }
  const fileService=new FileService();
    export default fileService;