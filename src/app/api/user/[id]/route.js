import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import UserModel from "../../../../../schema/User";


export const DELETE = async (req, {params}) => {
 
    await connectDB()
    const id = params.id;
    console.log(id);
    try {
        const userDelete = await UserModel.findByIdAndDelete(id)
        if(!userDelete){
            return NextResponse.json({message:`User whit ID ${id} its not exist`}, {status:404})
        }
        return NextResponse.json({data: userDelete}, {status:202} ,`User with ID ${id} has been deleted`) 

    } catch (error) {
        console.error(error)
    }
}

export const  GET = async(req, {params}) => {
    await connectDB()
    const id = params.id;
    
    try {
        const data = await UserModel.findById(id)
        return NextResponse.json({data: data}, {status:200})
    } catch (error) {
        console.error(error)
    }
}

export const POST = async (req, { params }) => {
  await connectDB();
  const id = params.id;

  try {
    const user = await UserModel.findById(id);
    const body = await req.json()
    if (user) {
      const newTodo = {
        title: body.title,
        body: body.body,
      };

      user.todo.push(newTodo);
      await user.save();
      console.log(newTodo);
      // Return the newly added todo details directly from the newTodo object
      return NextResponse.json({ data: user }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "No existe ningún usuario con ese ID" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
};