import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { profileForm, User } from "../types";
import { updateUserProfile } from "../api/DevTreeApi";
import { toast } from "sonner";

export default function ProfileView() {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<User>(["user"]);

  if (!data) {
    throw new Error("User data is not available");
  }

  console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<profileForm>({
    defaultValues: { handle: data.handle, description: data.description },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onError: (error) => {
      toast.error(error.message);
      console.log("Error al actualizar el perfil", error.message);
    },
    onSuccess: (data) => {
      console.log("se actualizo correctamente");
      toast.success(data);
    },
  });

  const handleUserProfileForm = (formData: profileForm) => {
    updateProfileMutation.mutate(formData);
  };

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfileForm)}
      noValidate
    >
      <legend className="text-2xl text-slate-800 text-center">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          {...register("handle", { required: "El handle es requerido" })}
        />
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register(
            "description",

            { required: "La descripcion es requerido" }
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={() => {}}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Guardar Cambios"
      />
    </form>
  );
}
