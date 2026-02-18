import { listPageTemplate } from "../../../src/templates/pages/list-page";

describe("listPageTemplate", () => {
    let template: string;

    beforeAll(() => {
        template = listPageTemplate("Post", "Posts");
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

    it("should generate resource type", () => {
        expect(template).toContain("type Post");
    });

    it("should generate typed array response", () => {
        expect(template).toContain("Promise<Post[]>");
    });

    it("should create data fetching function", () => {
        expect(template).toContain("async function getposts()");
    });

    it("should call backend resource endpoint", () => {
        expect(template).toContain("/posts");
        expect(template).toContain("NEXT_BACKEND_URL");
    });

    it("should use no-store cache", () => {
        expect(template).toContain('cache: "no-store"');
    });

    it("should parse json response", () => {
        expect(template).toContain("await response.json()");
    });

    it("should export async page component", () => {
        expect(template).toContain("export default async function PostsPage");
    });

    it("should call fetch function inside page", () => {
        expect(template).toContain("await getposts()");
    });

    it("should render list section", () => {
        expect(template).toContain(".map((post: Post)");
    });

    it("should use dynamic key", () => {
        expect(template).toContain("post.postId");
    });

    it("should render title", () => {
        expect(template).toContain("post.title");
    });

    it("should generate config link", () => {
        expect(template).toContain("/posts/${post.postId}/config");
    });

    it("should use next Link", () => {
        expect(template).toContain('from "next/link"');
        expect(template).toContain("<Link");
    });

    it("should render empty state message", () => {
        expect(template).toContain("Nenhum post encontrado");
    });

    it("should check empty array", () => {
        expect(template).toContain("posts.length === 0");
    });

    it("should import lucide icons", () => {
        expect(template).toContain('from "lucide-react"');
        expect(template).toContain("FileText");
        expect(template).toContain("FileCogIcon");
    });

    it("should match snapshot", () => {
        expect(template).toMatchSnapshot();
    });
});
