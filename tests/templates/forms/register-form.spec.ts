import { formRegisterTemplate } from "../../../src/templates/forms/register-form";

describe("formRegisterTemplate", () => {
    let template: string;

    beforeAll(() => {
        template = formRegisterTemplate();
    });

    it("should return a string", () => {
        expect(typeof template).toBe("string");
    });

    it("should not be empty", () => {
        expect(template.trim().length).toBeGreaterThan(0);
    });

    it("should not contain undefined", () => {
        expect(template).not.toContain("undefined");
    });

    it("should not contain leftover template tokens", () => {
        expect(template).not.toMatch(/${.*}/);
    });

    it('should include "use client"', () => {
        expect(template).toContain('"use client"');
    });

    it("should export FormRegister component", () => {
        expect(template).toContain("export const FormRegister");
    });

    it("should import react-hook-form tools", () => {
        expect(template).toContain("useForm");
        expect(template).toContain("FormProvider");
    });

    it("should import next navigation router", () => {
        expect(template).toContain('from "next/navigation"');
        expect(template).toContain("useRouter");
    });

    it("should import yup resolver and schema", () => {
        expect(template).toContain("yupResolver");
        expect(template).toContain("formSchema");
        expect(template).toContain("FormSchemaType");
    });

    it("should import toastify", () => {
        expect(template).toContain('from "react-toastify"');
        expect(template).toContain("toast");
    });

    it("should import custom components", () => {
        expect(template).toContain("InputCustom");
        expect(template).toContain("ButtonGeneric");
    });

    it("should configure useForm with yupResolver", () => {
        expect(template).toContain("resolver: yupResolver(formSchema)");
    });

    it("should use onChange validation mode", () => {
        expect(template).toContain('mode: "onChange"');
    });

    it("should define defaultValues", () => {
        expect(template).toContain("defaultValues");
        expect(template).toContain("name:");
        expect(template).toContain("email:");
        expect(template).toContain("password:");
    });

    it("should create submit handler", () => {
        expect(template).toContain("handlesubmitRegister");
        expect(template).toContain("handleSubmit");
    });

    it("should send POST request to users API", () => {
        expect(template).toContain('method: "POST"');
        expect(template).toContain("/api/users");
    });

    it("should send JSON body", () => {
        expect(template).toContain('"Content-Type": "application/json"');
        expect(template).toContain("JSON.stringify({...data, cpf: removeMask(data.cpf), phone: removeMask(data.phone)})");
    });

    it("should handle success response", () => {
        expect(template).toContain("response.status === 201");
        expect(template).toContain("toast.success");
        expect(template).toContain('router.push("/")');
    });

    it("should handle error response", () => {
        expect(template).toContain("toast.error");
    });

    it("should wrap form with FormProvider", () => {
        expect(template).toContain("<FormProvider");
        expect(template).toContain("</FormProvider>");
    });

    it("should render form element", () => {
        expect(template).toContain("<form");
        expect(template).toContain("onSubmit={methods.handleSubmit");
    });

    it("should include required input fields", () => {
        expect(template).toContain('name="name"');
        expect(template).toContain('name="email"');
        expect(template).toContain('name="cpf"');
        expect(template).toContain('name="dateOfBirth"');
        expect(template).toContain('name="password"');
        expect(template).toContain('name="repeatPassword"');
    });

    it("should support date input", () => {
        expect(template).toContain('type="date"');
        expect(template).toContain("asDate");
    });

    it("should render submit button", () => {
        expect(template).toContain("<ButtonGeneric");
        expect(template).toContain('label="Registrar"');
    });


    it("should match snapshot", () => {
        expect(template).toMatchSnapshot();
    });
});
