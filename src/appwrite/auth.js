import config from'../config/config'
import { Client, Account, ID } from "appwrite";

class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(config.APPWRITE_URL)
            .setProject(config.PROJECT_ID);
        this.account=new Account(this.client);
                    
    }

    async createaccount({email,password,name}){
            try {
               const user=await this.account.create(ID.unique(),email,password,name)
               if(user)
                  return this.login(email,password)
               else
                  return user;
            } catch (error) {
                console.log("Error in creating account ::"+error);
            }
    }


    async login({email,password}){
            try {
                return this.account.createEmailSession(email,password);
            } catch (error) {
                console.log("Error in Logout ::"+error);
            }
            return null;
    }

    async getCurrentUser(){
        try {
            return this.account.get();
        } catch (error) {
            console.log("Error in Logout ::"+error);
        }
        return null;
}



    async logout(){
        try {
           await this.account.deleteSessions();
        } catch (error) {
            console.log("Error in Logout ::"+error);
        }
        
    }

}
const authService=new AuthService();
export default authService;