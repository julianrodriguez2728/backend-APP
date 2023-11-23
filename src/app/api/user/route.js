import connectDB from "../../../../lib/db";
import { NextResponse } from "next/server";
import UserModel from "../../../../schema/User";

export const  GET = async() => {
    await connectDB() 
    try {
        const data = await UserModel.find({}) 
        return NextResponse.json({data: data}, {status:200})
    } catch (error) {
        console.error(error)
    }
}

export const POST = async(req, res) => {
    await connectDB()
    try {
        const body = await req.json()       
        const data = await UserModel.find({})

        const dataMaping = data?.map((element) =>{
            if(element){
                return element.name
            }
        });
        
        const findData = dataMaping.some(e => e === body.name)
        console.log(findData);
        if(findData === true){
            const dataUserLogin = data?.find((element)=>{
                return element.name === body.name
            })
            return NextResponse.json({data: dataUserLogin}, {status:200})
        }
        const newStudent = await UserModel.create(body)
        return NextResponse.json({data: newStudent}, {status:201})
    } catch (error) {
        return NextResponse.error(error)
    }
}