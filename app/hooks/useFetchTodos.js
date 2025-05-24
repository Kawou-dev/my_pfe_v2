"use client"
import React, { useState, useEffect, useCallback } from 'react';

const useFetchTodos = () => {
    const [loading, setLoading] = useState(false);
    const [todos, setTodos] = useState([]);

    // Pourquoi le useCallback ?
    //1- pour eviter le re-render unitile car à chaque fois le component parent se render le fils aussi.
    //2-stocke la fetchTodo en memoire donc evite les requettes api repétés

    const fetchTodo = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/todo');
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setTodos(data.todos);
        } catch (error) {
            console.log("Error fetching todos:", error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodo();
    }, [fetchTodo]);

    return { loading, todos, fetchTodo };
};

export default useFetchTodos;
