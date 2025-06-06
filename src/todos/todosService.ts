import type { Todo } from "./todoTypes";

const TODOS_STORAGE_KEY = "todoList";

export const getTodoList = (): Todo[] => {
    const raw = localStorage.getItem(TODOS_STORAGE_KEY) ?? "[]";
    return JSON.parse(raw);
};

export const clearTodoList = () => {
    localStorage.removeItem(TODOS_STORAGE_KEY);
};

export const clearCompleted = () => {
    const todoList = getTodoList();
    const newList = todoList.filter((item) => !item.completed);
    saveTodoList(newList);
    return newList;
};

export const markAllCompleted = () => {
    const todoList = getTodoList();
    const newList = todoList.map((item) =>
        item.completed
            ? item
            : { ...item, completed: true, completedAt: Date.now() },
    );
    saveTodoList(newList);
    return newList;
};

export const saveTodoList = (todoList: Todo[]) => {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todoList));
};

export const addTodo = (text: string): Todo[] => {
    const todoList = getTodoList();
    const newTodo: Todo = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        completedAt: null,
    };

    todoList.unshift(newTodo);
    saveTodoList(todoList);
    return todoList;
};

export const getTodoIndex = (id: string) => {
    const todoList = getTodoList();
    return todoList.findIndex((item) => item.id === id);
};

export const editTodo = (id: string, text: string): Todo[] => {
    const todoList = getTodoList();

    const newTodoList = todoList.map((item) =>
        item.id === id ? { ...item, text } : item,
    );

    saveTodoList(newTodoList);
    return newTodoList;
};

export const toggleTodoCheck = (id: string): Todo[] => {
    const todoList = getTodoList();
    const newTodoList = todoList.map((item) =>
        item.id === id
            ? {
                  ...item,
                  completed: !item.completed,
                  completedAt: !item.completed ? Date.now() : null,
              }
            : item,
    );

    saveTodoList(newTodoList);
    return newTodoList;
};

export const removeTodo = (id: string): Todo[] => {
    const todoList = getTodoList();
    const newList = todoList.filter((item) => item.id !== id);
    saveTodoList(newList);
    return newList;
};
