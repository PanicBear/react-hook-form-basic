import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
    resetField,
  } = useForm<LoginForm>({ mode: "onChange" });
  const onValid = (data: LoginForm) => {
    console.log("inputs validated");
    setError("username", { message: "Duplicated username" });
    // reset();
    resetField("email");
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  console.log(errors);
  setValue("username", "clarko");

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            value: 5,
            message: "The username should be longer than 5 chars",
          },
        })}
        type="text"
        placeholder="Username"
      />
      {errors.username?.message}
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "No gmails allowed",
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email) ? "border-red-500" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
