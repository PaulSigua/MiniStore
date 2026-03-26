import { useForm } from "react-hook-form";
import type { UserRegister } from "../../../core/types/auth";
import { createuser } from "./create-user.config";
import Button from "../../animations/tailwind/Button";
import { useUser } from "../../../core/hooks/user.hook";

export const CreateUser = ({ onSuccess }: { onSuccess: () => void }) => {
  const { user: tokenUser } = useUser();
  const { register, handleSubmit } = useForm<UserRegister>();

  const onSubmit = async (data: UserRegister) => {
    try {
      await createuser(data, tokenUser);
      onSuccess();
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          className="glass-input"
          type="text"
          {...register("username", { required: true })}
          placeholder="Nombre de usuario"
        />
        <input
          className="glass-input"
          type="email"
          {...register("email", { required: true })}
          placeholder="Correo"
        />
        <input
          className="glass-input"
          type="password"
          {...register("password", { required: true })}
          placeholder="Contraseña"
        />
        <select
          className="glass-input"
          {...register("role", { required: true })}
        >
          <option value="admin">Admin</option>
          <option value="empleado">Empleado</option>
          <option value="cliente">Cliente</option>
        </select>

        <Button type="submit" text="Listo" />
      </form>
    </div>
  );
};
