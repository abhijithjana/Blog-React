import config from'../config/config'
import { Client, Databases,Query } from "appwrite";

export class DatabasesService{
       client=new Client();
       bucket;
       databases;
       constructor(){
        this.client
        .setEndpoint(config.APPWRITE_URL)
        .setProject(config.PROJECT_ID);
        this.databases=new Databases(this.client);
       }

     async createpost({title,content,slug,featureImage,status,userId}){
            try {
                return await this.databases.createDocument(config.DATABASE_ID,config.COLLECTION_ID,slug,
                    {
                        title,
                        content,
                        status,
                        featureImage,
                        userId
                    })
            } catch (error) {
                console.log("Error in creating post::"+error); 
            }
     }


     async updatepost(slug,{title,content,featureImage,status}){
        try {
            return this.databases.updateDocument(config.DATABASE_ID,config.COLLECTION_ID,slug,
                {
                    title,
                    content,
                    featureImage,
                    status
                })
        } catch (error) {
            console.log("Error in updateting post::"+error); 
        }
 }


 async deletepost(slug){
    try {
      await this.databases.deleteDocument(config.DATABASE_ID,config.COLLECTION_ID,slug)

      return true;
    } catch (error) {
        console.log("Error in deleting post::"+error);
        return false; 
    }
}

 async getpost(slug){
    try {
      return await this.databases.getDocument(config.DATABASE_ID,config.COLLECTION_ID,slug)
      
    } catch (error) {
        console.log("Error in geting post::"+error);
        return false; 
    }
}

 async getposts(query=[Query.equal("status","active")]){
    try {
      await this.databases.listDocuments(config.DATABASE_ID,config.COLLECTION_ID,
        query
        )

      return true;
    } catch (error) {
        console.log("Error in getting all post::"+error);
        return false; 
    }
}
}

export default databasesService=new DatabasesService();
