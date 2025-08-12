import { useAtom } from "jotai";
import { toDoState, type IToDo, categoriesState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
    const [, setToDos] = useAtom(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setToDos((oldTodos) => {
            const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
            const oldTodo = oldTodos[targetIndex];
            return oldTodos.map((todo, index) =>
                index === targetIndex
                    ? { ...oldTodo, category: name as IToDo["category"] }
                    : todo
            );
        });
    };
    const [categories] = useAtom(categoriesState);
    return (
        <li>
            <span>{text}</span>
            {categories
                .filter((c) => c !== category)
                .map((c) => (
                    <button key={c} name={c} onClick={onClick}>
                        {c}
                    </button>
                ))}
        </li>
    );
}

export default ToDo;
