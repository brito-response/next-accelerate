import { deletePageTemplate } from "../../../src/templates/pages/delete-page";

describe("deletePageTemplate", () => {
    let template: string;

    beforeAll(() => {
        template = deletePageTemplate("Post", "Posts");
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

    it("should not contain leftover template variables", () => {
        expect(template).not.toMatch(/\$\{.*\}/);
    });

    it("should import delete form component", () => {
        expect(template).toContain('FormDeleteResource');
        expect(template).toContain('@/forms/shared');
    });

    it("should define dynamic route param", () => {
        expect(template).toContain("params: { postId: string;");
    });

    it("should pass resource id to form", () => {
        expect(template).toContain("resourceId={postId}");
    });

    it("should display confirmation message", () => {
        expect(template).toContain("Tem certeza que vc quer deletar esse Post?");
    });

    it("should match snapshot", () => {
        expect(template).toMatchSnapshot();
    });
});