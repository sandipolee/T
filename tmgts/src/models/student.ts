import mongoose,{Schema, Document} from "mongoose";
import { string } from "zod";

export interface Student extends Document{
    registerID:string
    name:string,
    mobileNum:string,
    gender:string,
    dob:Date,
    class:string,
    cource:string,
    fathersname:string,
    mothername:string,
    travellinglocation:string,
    travellingstartdate:Date,
    profilePic:File,
    verifyedbyadmin:boolean,
    registrationDate:Date



}

const StudentSchema: Schema<Student> = new Schema({
    registerID:{
        type:String,
        required:true,
        unique:true

    },
name:{
    type:String, 
    required:true
}
})