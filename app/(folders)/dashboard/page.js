"use client"
import Dashboard from "@/app/components/Dashboard";
import TodoList from "@/app/components/TodoList";
import VacanceList from "@/app/components/VacanceList";
import { fetchTodos } from "@/app/controllers/FetchTodo"
import useFetchTodos from "@/app/hooks/useFetchTodos";
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast";

const Page = () => {

 


   
    return (
        //   <div className="flex flex-col gap-5 ml-5    ">
        //         <h1>Dashboard</h1>
        //           {/* <TodoList  />
        //           <VacanceList  />
        //           <Toaster /> */}
        //   </div>
        <div className="">
            <Dashboard />
            <Toaster />
        </div>
    );
};

export default Page;






 // const [todos, setTodos] = useState([]); 

    // const display = async () => {
    //     try {
    //         const data = await fetchTodos(); // ✅ Attendre la promesse
    //         setTodos(data); // ✅ Mettre à jour les tâches
    //         console.log(data);
    //     } catch (error) {
    //         console.error("Erreur lors du fetch :", error);
    //     }
    // };

    // useEffect(() => {
    //     display();
    // }, []);
{/* <div className="flex flex-col gap-5">
<h1>Dashboard</h1>
<h1>All your tasks</h1>

{todos.map((task, index) => (
    <div key={index}>
        <h1>{task.title}</h1>
    </div>
))}
</div> */}