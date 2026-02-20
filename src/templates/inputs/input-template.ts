export const inputTemplate = () => `
  "use client";
  import { useFormContext, Controller } from 'react-hook-form';

  interface InputProps {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    ishidden?: boolean;
    pattern?: RegExp;
    placeholder?: string;
    asDate?: boolean;
    multiline?: boolean;
  }

  export const InputCustom: React.FC<InputProps> = ({ name, label, type = "text", required, pattern, placeholder, asDate, ishidden, multiline = false }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
      <div className="flex flex-col gap-2">
        {!ishidden && (
          <label htmlFor={name} className="text-sm font-medium text-[--text-label]">
            {label}:
          </label>
        )}

        <Controller
          control={control}
          name={name}
          rules={{
            required: !ishidden && required ? "Campo obrigatório" : false,
            pattern: pattern ? { value: pattern, message: "Formato inválido" } : undefined,
          }}
          render={({ field }) => {
            const value = asDate && typeof field.value === "string" ? field.value.split("T")[0] : field.value ?? "";
            const baseClasses = "w-full p-2 px-3 mt-1 border shadow-sm outline-none transition-all focus:border-blue-300 focus:ring-1 focus:ring-blue-300";
            const errorClass = errors[name] ? "border-red-400" : "border-gray-300";

            if (multiline) {
              return (
                <textarea {...field} id={name} rows={5} placeholder={placeholder} value={value} onChange={field.onChange} className={\`\${baseClasses} \${errorClass} rounded-xl resize-y min-h-30\`}/>
              );
            }

            return (
              <input {...field} id={name} type={type} placeholder={ishidden ? "" : placeholder} hidden={ishidden} aria-hidden={ishidden} value={value} onChange={(e) => {
                  if (asDate) {
                    const v = e.target.value;
                    if (!v) {
                      field.onChange(null);
                      return;
                    }
                    const date = new Date(v);
                    if (isNaN(date.getTime())) return;

                    field.onChange(date.toISOString());
                  } else {
                    field.onChange(e);
                  }
                }}
                className={\`\${baseClasses} \${errorClass} rounded-full\`}
              />
            );
          }}
        />
        {errors[name]?.message && (
          <p className="text-sm text-red-500">
            {errors[name]?.message as string}
          </p>
        )}
      </div>
    );
  };
`;

export const inputFormHelperTestUnitTemplate = () => `
import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";

export function renderWithForm(ui: ReactNode) {
    const Wrapper = ({ children }: { children: ReactNode }) => {
        const methods = useForm();

        return (
            <form onSubmit={methods.handleSubmit(() => { })}>
                <FormProvider {...methods}>
                    {children}
                    <button type="submit">submit</button>
                </FormProvider>
            </form>
        );

    };

    return render(ui, { wrapper: Wrapper });
}`;

export const inputTestUnitTemplate = () => `
import { screen, fireEvent } from "@testing-library/react";
import { InputCustom } from ".";
import { renderWithForm } from "./renderWithForm";

describe("InputCustom component", () => {

    it("should render the label and the input.", () => {
        renderWithForm(<InputCustom name="email" label="Email" placeholder="Digite o email" />);

        expect(screen.getByLabelText("Email:")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Digite o email")).toBeInTheDocument();

    });

    it("should allows you to type in the field", () => {
        renderWithForm(<InputCustom name="name" label="Nome" placeholder="Digite seu nome" />);

        const input = screen.getByPlaceholderText("Digite seu nome");

        fireEvent.change(input, { target: { value: "João" } });

        expect(input).toHaveValue("João");

    });

    it("should shows error when required.", async () => {
        renderWithForm(<InputCustom name="name" label="Nome" required />);

        fireEvent.click(screen.getByText("submit"));

        expect(await screen.findByText("Campo obrigatório")).toBeInTheDocument();

    });

    it("should validate pattern", async () => {
        renderWithForm(<InputCustom name="cpf" label="CPF" pattern={/^\d{3}$/} placeholder="123" />);

        const input = screen.getByPlaceholderText("123");

        fireEvent.change(input, { target: { value: "abc" } });
        fireEvent.click(screen.getByText("submit"));

        expect(await screen.findByText("Formato inválido")).toBeInTheDocument();

    });

    it("should renders textarea", () => {
        renderWithForm(<InputCustom name="bio" label="Bio" multiline />);

        const textarea = screen.getByRole("textbox");
        expect(textarea.tagName).toBe("TEXTAREA");

    });

});

`;

export const inputTestE2ETemplate = () => `

`;
