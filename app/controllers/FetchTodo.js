export const fetchTodos = async () => {
    try {
        const res = await fetch("/api/todo");
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data.todos; 
    } catch (error) {
        console.error("Erreur de récupération des tâches :", error);
        return [];
    }
};
