import { detailPageTemplate } from "../../../src/templates/pages/detail-page";

describe("detailPageTemplate", () => {
    let template: string;

    beforeAll(() => {
        template = detailPageTemplate("Post");
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

    it("should create correct page component name", () => {
        expect(template).toContain("export default function PostDetailPage");
    });

    it("should define PageProps interface", () => {
        expect(template).toContain("interface PageProps");
    });

    it("should create params with correct id name", () => {
        expect(template).toContain("params: {postId: string;}");
    });

    it("should destructure correct param", () => {
        expect(template).toContain("const { postId } = params");
    });

    it("should render id inside JSX", () => {
        expect(template).toContain("{postId}");
    });

    it("should contain layout container", () => {
        expect(template).toContain("min-h-screen");
        expect(template).toContain("flex flex-col");
    });

    it("should show detail label", () => {
        expect(template).toContain("Post detail:");
    });

    it("should match snapshot", () => {
        expect(template).toMatchSnapshot();
    });
});
