import { useReducer, useState } from "react";
import toast from "react-hot-toast";

const todoReducer = (state, action) => {
    switch (action.type) {
        case "SET_TODOS":
            return action.payload;

        case "ADD_TODO":
            return [...state, action.payload];

        case "EDIT_TODO":
            return state.map(todo =>
                todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
            );

        case "DELETE_TODO":
            return state.filter(todo => todo.id !== action.payload);

        case "TOGGLE_TODO":  
            return state.map(todo =>
                todo.id === action.payload.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            );

        default:
            return state;
    }
};

const useTodoReducer1 = () => {
    const [todos, dispatch] = useReducer(todoReducer, []);
    const [loading, setLoading] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/todo");
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            dispatch({ type: "SET_TODOS", payload: data.todos });
        } catch (error) {
            console.error("Erreur :", error);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (todo) => {
        if (!todo.title || !todo.description || !todo.priority || !todo.deadline) {
            toast.error("Tous les champs sont obligatoires !");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/todo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(todo),
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            dispatch({ type: "ADD_TODO", payload: data.todo });
            toast.success("Tâche ajoutée avec succès");
            setIsOpenPopup(false);
            fetchTodos();
           
        } catch (error) {
            console.error("Frontend :", error.message);
        } finally {
            setLoading(false);
        }
    };

    const editTodo = async (todo) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/todo/${todo._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(todo),
            });
    
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Une erreur est survenue");
    
            dispatch({ type: "EDIT_TODO", payload: data.updatedTodo });
            toast.success("Tâche mise à jour avec succès");
            setIsOpenPopup(false);
            fetchTodos();
            
        } catch (error) {
            console.error("Frontend :", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const completeTodo = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/todo/${id}`, {
                method: 'PUT',
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            dispatch({ type: "TOGGLE_TODO", payload: { id } });
            toast.success('Tâche mise à jour avec succès');
            fetchTodos();
        } catch (error) {
            console.error("Erreur frontend :", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteTodo = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/todo/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            dispatch({ type: "DELETE_TODO", payload: id });
            toast.success("Tâche supprimée avec succès");
            fetchTodos();
        } catch (error) {
            console.error("Frontend :", error.message);
        } finally {
            setLoading(false);
        }
    };

    return { 
        todos, 
        loading, 
        isOpenPopup, 
        setIsOpenPopup, 
        fetchTodos, 
        addTodo, 
        editTodo, 
        deleteTodo, 
        completeTodo 
    };
};

export default useTodoReducer1;