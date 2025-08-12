import { useAtom, useAtomValue } from "jotai";
import { useForm } from "react-hook-form";
import { categoryState, toDoState } from "../atoms";

interface IForm {
    todo: string;
}

function CreateToDo() {
    const { register, handleSubmit, setValue } = useForm<IForm>();
    const [, setTodos] = useAtom(toDoState);
    const category = useAtomValue(categoryState);
    const onSubmit = (data: IForm) => {
        setTodos((oldTodos) => [
            { text: data.todo, category: category, id: Date.now() },
            ...oldTodos,
        ]);
        setValue("todo", "");
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register("todo", {
                    required: "Please write a To Do",
                })}
                placeholder="Write a to do"
            />
            <button>Add</button>
        </form>
    );
}

export default CreateToDo;
