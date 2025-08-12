import { useForm } from "react-hook-form";

// function TodoList() {
//     const [todo, setTodo] = useState("");
//     const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//         const {
//             currentTarget: { value },
//         } = event;
//         setTodo(value);
//     };
//     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         console.log(todo);
//     };
//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input
//                     value={todo}
//                     onChange={onChange}
//                     placeholder="Write a to do"
//                 />
//                 <button>Add</button>
//             </form>
//         </div>
//     );
// }

interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    password1: string;
    extraError?: string;
}

function TodoList() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com",
        },
    });
    const onValid = (data: IForm) => {
        if (data.password !== data.password1) {
            setError(
                "password1",
                { message: "Password are not the same" },
                { shouldFocus: true }
            );
        }
        // setError("extraError", { message: "Server offline" });
    };
    console.log(errors);
    return (
        <div>
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={handleSubmit(onValid)}
            >
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9]+@naver\.com$/,
                            message: "Only naver.com emails are allowed",
                        },
                    })}
                    placeholder="Email"
                />
                <span>{errors?.email?.message as string}</span>
                <input
                    {...register("firstName", {
                        required: "First Name is required",
                        validate: {
                            noNico: (value) =>
                                value.includes("nico")
                                    ? "No nicos allowed"
                                    : true,
                            noNick: (value) =>
                                value.includes("nick")
                                    ? "No nicks allowed"
                                    : true,
                        },
                    })}
                    placeholder="First Name"
                />
                <span>{errors?.firstName?.message as string}</span>
                <input
                    {...register("lastName", {
                        required: "Last Name is required",
                    })}
                    placeholder="Last Name"
                />
                <span>{errors?.lastName?.message as string}</span>
                <input
                    {...register("username", {
                        required: "Username is required",
                        minLength: {
                            value: 10,
                            message: "Username must be at least 10 characters",
                        },
                    })}
                    placeholder="Username"
                />
                <span>{errors?.username?.message as string}</span>
                <input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 5,
                            message: "Password must be at least 5 characters",
                        },
                    })}
                    placeholder="Password"
                />
                <span>{errors?.password?.message as string}</span>
                <input
                    {...register("password1", {
                        required: "Password is required",
                        minLength: {
                            value: 5,
                            message: "Your password is too short.",
                        },
                    })}
                    placeholder="Password1"
                />
                <span>{errors?.password1?.message as string}</span>
                <button>Add</button>
                <span>{errors?.extraError?.message as string}</span>
            </form>
        </div>
    );
}

export default TodoList;
