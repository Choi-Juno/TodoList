import CreateToDo from "./CreateToDo";
import { useAtom, useAtomValue } from "jotai";
import {
    categoryState,
    toDoSelector,
    type IToDo,
    categoriesState,
} from "../atoms";
import ToDo from "./ToDo";
import { useForm } from "react-hook-form";

interface IForm {
    category: string;
}
function TodoList() {
    const toDos = useAtomValue(toDoSelector);
    const [, setCategory] = useAtom(categoryState);
    const [categories, setCategories] = useAtom(categoriesState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as IToDo["category"]);
    };
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const onSubmit = (data: IForm) => {
        const newCategory = data.category.trim();
        if (!newCategory) return;
        if (categories.includes(newCategory)) return;
        setCategories([...categories, newCategory]);
        setCategory(newCategory);
        setValue("category", "");
    };
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <select onInput={onInput}>
                    {categories.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
                <input
                    {...register("category")}
                    placeholder="add new category"
                />
                <button type="submit">Add</button>
            </form>
            <CreateToDo />
            <hr />
            {toDos?.map((todo) => (
                <ToDo key={todo.id} {...todo}></ToDo>
            ))}
        </div>
    );
}

export default TodoList;
