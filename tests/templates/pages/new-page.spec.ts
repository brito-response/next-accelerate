import { newPageTemplate } from "../../../src/templates/pages/new-page";

describe("newPageTemplate", () => {
    let template: string;

    beforeAll(() => {
        template = newPageTemplate("Post", "Posts");
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

    it("should NOT be a client component", () => {
        expect(template).not.toContain('"use client"');
    });

    it("should export async page function", () => {
        expect(template).toContain("export default async function NewPostPage");
    });

    it("should import next-auth session", () => {
        expect(template).toContain("getServerSession");
        expect(template).toContain("authOptions");
    });

    it("should validate session", () => {
        expect(template).toContain("if (!session)");
    });

    it("should redirect when session is null", () => {
        expect(template).toContain('redirect("/")');
    });

    it("should import redirect from next/navigation", () => {
        expect(template).toContain('from "next/navigation"');
    });

    it("should import form using plural path", () => {
        expect(template).toContain('@/forms/posts');
    });

    it("should import correct form component", () => {
        expect(template).toContain("FormNewPost");
    });

    it("should render form component", () => {
        expect(template).toContain("<FormNewPost />");
    });

    it("should render create title", () => {
        expect(template).toContain("Criar novo post");
    });

    it("should render helper text using singular resource", () => {
        expect(template).toContain("editar este post depois de publicado");
    });

    it("should import lucide icons", () => {
        expect(template).toContain('from "lucide-react"');
        expect(template).toContain("FilePlus2");
        expect(template).toContain("Info");
    });

    it("should match snapshot", () => {
        expect(template).toMatchSnapshot();
    });
});
