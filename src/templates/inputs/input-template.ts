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
