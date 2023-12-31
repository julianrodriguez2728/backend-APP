import { NextResponse } from "next/server";
import connectDB from "../../../../../../lib/db";
import UserModel from "../../../../../../schema/User";


export const GET = async (req, { params }) => {
    await connectDB();
    const {id, todoId} = params;
    console.log(id, todoId);
    try {
      // Assuming UserModel.todo is an array of todos
      const user = await UserModel.findById(id);
      if(user){
        const userFound = user.todo.find((element)=> element.id === todoId)
        console.log(userFound);
        return NextResponse.json({ data: userFound }, { status: 200 });
      }
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
  };


  export const DELETE = async (req, { params }) => {
    await connectDB();
    const { id, todoId } = params;
  
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { $pull: { todo: { _id: todoId } } },
        { new: true }
      );
  
      if (updatedUser) {
        return NextResponse.json({ data: updatedUser }, { status: 200 });
      }
  
      return NextResponse.json({ deleting: 'Task not found' }, { status: 404 });
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  };
  export const PUT = async(req,{params}) => {
    await connectDB()
    const user = await UserModel.findById(params.id);
    try {
      const body = await req.json();

      console.log(body);
      const todoUpdate = user?.todo.find((todo)=> todo.id === params.todoId)
      if(todoUpdate){
        if(body.title){
          todoUpdate.title = body.title;
        }
        if(body.body){
          todoUpdate.body = body.body;
        }
        if(body.complete){
          todoUpdate.complete = body.complete;
        }
        await user.save()
      }

      return NextResponse.json({data: user}, {status:200})
      
    } catch (error) {
      return NextResponse.json({error: error}, {status:400})
    }
  }