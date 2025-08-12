import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface IToDo {
    text: string;
    id: number;
    category: string;
}

export const categoriesState = atomWithStorage<string[]>("categories", [
    "TO_DO",
    "DOING",
    "DONE",
]);

export const categoryState = atomWithStorage<string>("category", "TO_DO");

export const toDoState = atomWithStorage<IToDo[]>("todos", []);

export const toDoSelector = atom((get) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
});
