"use client";
import {useState} from 'react';
// import { Response } from 'node-fetch';

// interface CustomResponse extends Response {
//     json: () => Promise<any>;
// }

export default function ContactForm() {
    const [fullname,setfullname] = useState("");
    const [email,setemail] = useState("");
    const [message,setmessage] = useState("");
    const [error,seterror] = useState([]);

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        // console.log("Fullname: ",fullname);
        // console.log("Email: ",email);
        // console.log("Message: ",message);

        const res= await fetch("api/contact", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                fullname,
                email,
                message,
            })
        });

        const {msg} = await res.json();
        seterror(msg);
        console.log(error);

    }
    return(
        <>
        <form onSubmit={handleSubmit} className="py-4 mt-4 border-t flex flex-col gap-5">
            <div>
                <label htmlFor="fullname"> Full Name </label>
                <input onChange={(e) => setfullname(e.target.value)} 
                value={fullname}
                type="text" id="fullname" placeholder="John"/>
            </div>
            
            <div>
                <label htmlFor="email"> Email</label>
                <input onChange={(e) => setemail(e.target.value)} 
                value={email} type="text" id="email" placeholder="john@gmail.com"/>
            </div>

            <div>
                <label htmlFor="message"> Message </label>
                <textarea onChange={(e) => setmessage(e.target.value)} 
                value={message} className="h-32" id="message" placeholder = "Enter the message" />
            </div>

            <button className="bg-green-700 p-3 text-white font-bold" type="submit"> Submit</button>
        </form>

        <div className="bg-slate-100 flex flex-col">
            <div className="text-red-600 px-5 py-2"> Error message</div>
        </div>
        </>
    )
}
