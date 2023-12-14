import connectdb from "@/app/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import ContactModel from "@/components/Contact";
import mongoose, { Error as MongooseError, Document} from "mongoose";
import { NextResponse } from "next/server";

interface IError extends MongooseError.ValidationError {
    errors: {
        [key: string]: MongooseError.ValidatorError | MongooseError.CastError;
    }
}

interface RequestBody {
    fullname: string;
    email: string;
    message: string;
}

export default async function POST(req:NextApiRequest,res:NextApiResponse) {
    // const {fullname, email, message} = await req.json();

    // console.log("fn:",fullname);
    // console.log("Email:",email);

    try {
        // const newUser = await Contact.create
        await connectdb();

        const { fullname, email,message }: RequestBody = req.body;
        const newContact = await await ContactModel.create({
            fullname,email,message
        });

        return res.json({
            msg: ["Message sent succcessfully"],
            success: true,
            data: newContact,
        });
    } catch(error) {
        if(error instanceof mongoose.Error.ValidationError) {
            let errorList = [];
            for(let e in error.errors){
                errorList.push(error.errors[e].message);
            }
        }
    }

    return NextResponse.json({ msg: ["Hi from the contact route"] });
    
}
