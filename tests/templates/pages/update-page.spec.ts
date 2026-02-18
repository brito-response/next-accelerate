import { updatePageTemplate } from "../../../src/templates/pages/update-page";

describe("updatePageTemplate", () => {
    let template: string;

    beforeAll(() => {
        template = updatePageTemplate("Post", "Posts");
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
        expect(template).not.toMatch(/${.*}/);
    });

    it("should import next-auth session", () => {
        expect(template).toContain('from "next-auth"');
        expect(template).toContain("getServerSession");
    });

    it("should import redirect from next/navigation", () => {
        expect(template).toContain('from "next/navigation"');
        expect(template).toContain("redirect");
    });

    it("should import edit form", () => {
        expect(template).toContain("FormEditPost");
        expect(template).toContain('@/forms/posts');
    });

    it("should define PageProps with correct param name", () => {
        expect(template).toContain("params: { postId: string;");
    });

    it("should destructure param correctly", () => {
        expect(template).toContain("const { postId } = await params");
    });

    it("should not use wrong param casing", () => {
        expect(template).not.toContain("PostId");
        expect(template).not.toContain("POSTID");
    });

    it("should protect page when session is missing", () => {
        expect(template).toContain('if (!session) redirect("/")');
    });

    it("should create getPostById function", () => {
        expect(template).toContain("async function getPostById");
    });

    it("should call backend with correct route", () => {
        expect(template).toContain("${process.env.NEXT_BACKEND_URL}/posts/${postId}");
    });

    it("should send Authorization header", () => {
        expect(template).toContain("Authorization:");
        expect(template).toContain("Bearer ${token}");
    });

    it("should disable cache", () => {
        expect(template).toContain('cache: "no-store"');
    });

    it("should render edit title", () => {
        expect(template).toContain("Editar Post");
    });

    it("should render edit form when resource exists", () => {
        expect(template).toContain("<FormEditPost post={post}");
    });

    it("should show not found state", () => {
        expect(template).toContain("Post não encontrado");
    });

    it("should match snapshot", () => {
        expect(template).toMatchSnapshot();
    });
});
