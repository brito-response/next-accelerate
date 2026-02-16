export const formLoginTemplate = () => `
"use client";

import { startTransition } from "react";
import { signIn, signOut } from "next-auth/react";
import { useId, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { hiddenPaths } from "./hidenpath";
import { ButtonGeneric } from "@/components/ButtonGeneric";

type TypeLoginData = { email: string; password: string; };

export const FormLogin: React.FC = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const idEmail = useId();
  const idPassword = useId();
  const { register, handleSubmit, formState: { errors } } = useForm<TypeLoginData>();

  const [state, setState, isPending] = useActionState(
    async (prevState: any, data: TypeLoginData) => {
      try {
        const response = await signIn("credentials", { redirect: false, ...data, callbackUrl: "/manager" });

        if (response?.status === 401) {
          toast.error("invalid credentials");
          return { success: false };
        }

        if (response?.url) {
          window.location.href = response.url;
        }

        return { success: true };
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "error authenticating"
        );
        return { success: false };
      }
    },
    { success: false }
  );

  const onSubmitForm = (data: TypeLoginData) => {
    startTransition(() => { setState(data); });
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (!mounted) {
    return <div style={{ height: 35 }} />;
  }

  const isHidden = hiddenPaths.some((path) => pathname.startsWith(path));
  if (isHidden) { return <ButtonGeneric label="Sair" onClick={handleLogout} />; };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="w-full flex flex-col items-center gap-3 lg:gap-3">
      {/* Email */}
      <div className="flex flex-col lg:flex-row lg:items-center max-h-8.75 gap-2">
        <label htmlFor={idEmail} className="text-sm font-semibold text-(--text-color)">e-mail:</label>
        <input id={idEmail} type="text" {...register("email", { required: "Este campo é obrigatório" })}
          className="min-h-7.5 max-w-30 lg:max-w-30 text-(--text-color) px-3 border border-gray-300 rounded-full outline-none text-sm bg-(--bg-color) caret-(--text-color) text-center transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full lg:w-auto"
        />
        {errors.email && (
          <span className="text-red-600 text-sm mt-2">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col lg:flex-row lg:items-center max-h-8.75 gap-2">
        <label htmlFor={idPassword} className="text-sm font-semibold text-(--text-color)">password:</label>
        <input id={idPassword} type="password" {...register("password", { required: "Este campo é obrigatório" })}
          className="min-h-7.5 max-w-30 lg:max-w-30 text-(--text-color) px-3 border border-gray-300 rounded-full outline-none text-sm bg-(--bg-color) caret-(--text-color) text-center transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full lg:w-auto"
        />
        {errors.password && (
          <span className="text-red-600 text-sm mt-2">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Submit */}
      <div className="mt-2 lg:mt-0">
        <ButtonGeneric type="submit" label={isPending ? "Entrando..." : "Entrar"} disabled={isPending} className={\`w-full lg:w-auto justify-center \${isPending ? "opacity-70 cursor-not-allowed" : ""}\`} />
      </div>

      {/* Forgot password */}
      <div className="h-full flex flex-col justify-center items-center mt-2 lg:mt-0 text-sm">
         <Link href="/cadastro" className="text-blue-700 cursor-pointer">cadastre-se</Link>
        <Link href="/forgotpassword" className="text-blue-700 cursor-pointer">esqueceu sua senha?</Link>
      </div>
    </form>
  );
};
`;