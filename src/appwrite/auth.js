import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService{ //this is a class
    client= new Client();
    account;

    // This is a better code practice. This is automatically called when a new object is made.
    constructor(){
        this.client.setEndpoint(config.endPoint).setProject(config.projectId);
        this.account=new Account(this.client);
    }

    // method to create account
    //Reusable and better method to create account. This method creates the account.
    //since this is an async function, the next step only executes after the account is made.
    //returns a promise.

    async createAccount({userId,email,password}){
        try {
            const userAccount= await this.account.create(userId,email, password);
            if (userAccount) {
                //Call another method to login directly
                return this.login({email,password});
            } else {
                return userAccount; //handle whatever value gotten later
            }
        } catch (error) {
            console.error("Appwrite service :: create Account :: error",error)
            return error
        }
    }

    // method to login
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            console.error("Appwrite service :: login :: error",error)
            return error
        }
    }

    // method to get user status
    async getUser(){
        try {
            return await this.account.get();
        } catch (error) {
           console.error("Appwrite service :: getUser :: error",error)
        }
        // what if account not found? the value is null. Also if there is error in try catch then this automatically returns null value 
        return null;
    }

    //method to logout
    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite service :: logout :: error",error)
            return error
        }
    }
} 

const authService= new AuthService() //this is an object

export default authService