import { formForgotTemplate } from "../../../src/templates/forms/forgot-form";

describe("formForgotTemplate", () => {
    let template: string;

    beforeAll(() => {
        template = formForgotTemplate();
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

    it("should export FormForgot component", () => {
        expect(template).toContain("export const FormForgot");
    });

    it("should import next link", () => {
        expect(template).toContain('from "next/link"');
        expect(template).toContain("Link");
    });

    it("should import router navigation", () => {
        expect(template).toContain('from "next/navigation"');
        expect(template).toContain("useRouter");
    });

    it("should import react useState", () => {
        expect(template).toContain("useState");
    });

    it("should import toastify", () => {
        expect(template).toContain('from "react-toastify"');
        expect(template).toContain("toast");
    });


    it("should declare Response type", () => {
        expect(template).toContain("type Response");
        expect(template).toContain("message:");
        expect(template).toContain("statusCode:");
    });

    it("should create sendEmailServerSideProps function", () => {
        expect(template).toContain("sendEmailServerSideProps");
        expect(template).toContain("async function");
    });

    it("should call backend endpoint", () => {
        expect(template).toContain("/auth/sendEmail");
        expect(template).toContain("NEXT_PUBLIC_BACKEND_URL");
    });

    it("should send POST request", () => {
        expect(template).toContain('method: "POST"');
    });

    it("should send JSON headers and body", () => {
        expect(template).toContain('"Content-Type": "application/json"');
        expect(template).toContain("JSON.stringify({ email })");
    });

    it("should use no-store cache", () => {
        expect(template).toContain('cache: "no-store"');
    });

    it("should handle 200 response", () => {
        expect(template).toContain("response.ok");
        expect(template).toContain("Email sent successfully");
    });

    it("should handle 404 response", () => {
        expect(template).toContain("response.status === 404");
        expect(template).toContain("not registered in the system");
    });

    it("should handle server error", () => {
        expect(template).toContain("server is not responding");
    });


    it("should implement handleSubmit", () => {
        expect(template).toContain("handleSubmit");
        expect(template).toContain("preventDefault");
    });

    it("should read email input from form", () => {
        expect(template).toContain('namedItem("email")');
        expect(template).toContain("HTMLInputElement");
    });

    it("should call sendEmailServerSideProps on submit", () => {
        expect(template).toContain("await sendEmailServerSideProps(email)");
    });

    it("should update component state", () => {
        expect(template).toContain("setData");
    });

    it("should show toast error on failure", () => {
        expect(template).toContain("toast.error");
    });

    it("should redirect on success", () => {
        expect(template).toContain('router.push("/forgotredef")');
    });


    it("should render form element", () => {
        expect(template).toContain("<form");
        expect(template).toContain("onSubmit={handleSubmit}");
    });

    it("should render email input", () => {
        expect(template).toContain('type="email"');
        expect(template).toContain('name="email"');
        expect(template).toContain("required");
    });

    it("should render submit button", () => {
        expect(template).toContain('type="submit"');
        expect(template).toContain("Send");
    });

    it("should render navigation links", () => {
        expect(template).toContain('href="/"');
        expect(template).toContain('Back to login');
        expect(template).toContain('href="/cadastro"');
        expect(template).toContain('Create account');
    });

    it("should match snapshot", () => {
        expect(template).toMatchSnapshot();
    });
});
