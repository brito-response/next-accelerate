import { formRedefTemplate } from "../../../src/templates/forms/redef-form";

describe("formRedefTemplate", () => {
    let template: string;

    beforeAll(() => {
        template = formRedefTemplate();
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

    it("should export FormRedef component", () => {
        expect(template).toContain("export const FormRedef");
    });

    it("should import react-hook-form tools", () => {
        expect(template).toContain("useForm");
        expect(template).toContain("FormProvider");
    });

    it("should import yup resolver and schema", () => {
        expect(template).toContain("yupResolver");
        expect(template).toContain("formSchema");
    });

    it("should import InputCustom component", () => {
        expect(template).toContain("InputCustom");
    });

    it("should declare response type", () => {
        expect(template).toContain("type Response");
        expect(template).toContain("statusCode");
        expect(template).toContain("message");
    });

    it("should declare form input interface", () => {
        expect(template).toContain("interface IFormInputRedem");
        expect(template).toContain("token:");
        expect(template).toContain("password:");
        expect(template).toContain("confirpassword:");
    });

    it("should create sendRedemServerSideProps function", () => {
        expect(template).toContain("sendRedemServerSideProps");
        expect(template).toContain("async function");
    });

    it("should call backend redef endpoint", () => {
        expect(template).toContain("/auth/redefinir");
        expect(template).toContain("NEXT_PUBLIC_BACKEND_URL");
    });

    it("should send PUT request", () => {
        expect(template).toContain('method: "PUT"');
    });

    it("should send JSON body with token and passwords", () => {
        expect(template).toContain('"Content-Type": "application/json"');
        expect(template).toContain("JSON.stringify");
        expect(template).toContain("token: data.token");
        expect(template).toContain("password: data.password");
        expect(template).toContain("rePassword: data.confirpassword");
    });

    it("should handle success response", () => {
        expect(template).toContain("Password reset successfully");
        expect(template).toContain("statusCode: 200");
    });

    it("should handle user not found", () => {
        expect(template).toContain("invalid token");
        expect(template).toContain("statusCode: 404");
    });

    it("should handle server error", () => {
        expect(template).toContain("server stopped responding");
        expect(template).toContain("statusCode: 500");
    });

    it("should configure useForm with yupResolver", () => {
        expect(template).toContain("resolver: yupResolver(formSchema)");
    });

    it("should set validation mode to onChange", () => {
        expect(template).toContain("mode: 'onChange'");
    });

    it("should define defaultValues", () => {
        expect(template).toContain("defaultValues");
        expect(template).toContain("token: ''");
        expect(template).toContain("password: ''");
        expect(template).toContain("confirpassword: ''");
    });

    it("should implement onSubmit handler", () => {
        expect(template).toContain("onSubmit = async");
        expect(template).toContain("methods.handleSubmit(onSubmit)");
    });

    it("should call service on submit", () => {
        expect(template).toContain("await sendRedemServerSideProps(data)");
    });

    it("should wrap form with FormProvider", () => {
        expect(template).toContain("<FormProvider");
        expect(template).toContain("</FormProvider>");
    });

    it("should render input fields", () => {
        expect(template).toContain('name="token"');
        expect(template).toContain('name="password"');
        expect(template).toContain('name="confirpassword"');
    });

    it("should match snapshot", () => {
        expect(template).toMatchSnapshot();
    });
});
