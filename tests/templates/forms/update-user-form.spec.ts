import { formUpdateUserTemplate } from "../../../src/templates/forms/update-user-form";

describe("formUpdateUserTemplate", () => {
    let template: string;

    beforeAll(() => {
        template = formUpdateUserTemplate();
    });


    it("should return a string", () => {
        expect(typeof template).toBe("string");
    });

    it("should not be empty", () => {
        expect(template.trim().length).toBeGreaterThan(0);
    });

    it("should not contain leftover template tokens", () => {
        expect(template).not.toMatch(/${.*}/);
    });

    it('should include "use client"', () => {
        expect(template).toContain('"use client"');
    });

    it("should export FormUpdateUser component", () => {
        expect(template).toContain("export const FormUpdateUser");
    });

    it("should import react-hook-form tools", () => {
        expect(template).toContain("useForm");
        expect(template).toContain("FormProvider");
        expect(template).toContain("Resolver");
    });

    it("should import yup resolver and schema", () => {
        expect(template).toContain("yupResolver");
        expect(template).toContain("updateFormSchema");
        expect(template).toContain("UpdateFormSchemaType");
    });

    it("should import router navigation", () => {
        expect(template).toContain('from "next/navigation"');
        expect(template).toContain("useRouter");
    });

    it("should import next-auth session", () => {
        expect(template).toContain('from "next-auth/react"');
        expect(template).toContain("useSession");
    });

    it("should import toastify", () => {
        expect(template).toContain('from "react-toastify"');
        expect(template).toContain("toast");
    });

    it("should import custom components", () => {
        expect(template).toContain("InputCustom");
        expect(template).toContain("ButtonGeneric");
    });

    it("should declare TypeUserStatus enum", () => {
        expect(template).toContain("export enum TypeUserStatus");
        expect(template).toContain("ACTIVE");
        expect(template).toContain("SUSPENDED");
        expect(template).toContain("BANNED");
    });

    it("should declare UpdateUserInput interface", () => {
        expect(template).toContain("export interface UpdateUserInput");
        expect(template).toContain("photo?");
        expect(template).toContain("bio?");
        expect(template).toContain("skills?");
        expect(template).toContain("hourly_rate?");
    });

    it("should configure useForm with yupResolver", () => {
        expect(template).toContain("resolver: yupResolver(updateFormSchema)");
    });

    it("should use onChange validation mode", () => {
        expect(template).toContain('mode: "onChange"');
    });

    it("should define defaultValues", () => {
        expect(template).toContain("defaultValues");
        expect(template).toContain("photo:");
        expect(template).toContain("bio:");
        expect(template).toContain("skills:");
        expect(template).toContain("hourly_rate:");
    });

    it("should manage photo file state", () => {
        expect(template).toContain("useState<File | null>");
        expect(template).toContain("handleFileChange");
        expect(template).toContain("e.target.files");
    });

    it("should render file input", () => {
        expect(template).toContain('type="file"');
        expect(template).toContain('accept="image/*"');
    });

    it("should send update request to users endpoint", () => {
        expect(template).toContain("/api/users/update");
        expect(template).toContain('method: "POST"');
    });

    it("should send JSON payload", () => {
        expect(template).toContain('"Content-Type": "application/json"');
        expect(template).toContain("JSON.stringify(payload)");
    });

    it("should split skills string", () => {
        expect(template).toContain("skills?.split");
    });

    it("should upload photo using FormData", () => {
        expect(template).toContain("new FormData()");
        expect(template).toContain("formData.append");
        expect(template).toContain("/api/users/photo");
    });

    it("should handle upload response", () => {
        expect(template).toContain("uploadResp.ok");
        expect(template).toContain("Erro ao enviar a foto");
    });

    it("should update next-auth session", () => {
        expect(template).toContain("update({ user:");
        expect(template).toContain("session?.user");
    });

    it("should refresh router after update", () => {
        expect(template).toContain("router.refresh()");
    });

    it("should redirect to manager page", () => {
        expect(template).toContain('router.push("/manager")');
    });

    it("should handle request errors", () => {
        expect(template).toContain("toast.error");
        expect(template).toContain("Erro de comunicação com o servidor");
    });

    it("should show success toast", () => {
        expect(template).toContain("toast.success");
    });

    it("should wrap form with FormProvider", () => {
        expect(template).toContain("<FormProvider");
        expect(template).toContain("</FormProvider>");
    });

    it("should render profile inputs", () => {
        expect(template).toContain('name="bio"');
        expect(template).toContain('name="skills"');
        expect(template).toContain('name="hourly_rate"');
    });

    it("should render submit button", () => {
        expect(template).toContain("<ButtonGeneric");
        expect(template).toContain('label="Atualizar Usuário"');
    });

    it("should match snapshot", () => {
        expect(template).toMatchSnapshot();
    });
});
