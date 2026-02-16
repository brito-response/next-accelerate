import { publicLayoutTemplate } from "../../src/templates/layouts";

describe("publicLayoutTemplate", () => {

    let template: string;

    beforeAll(() => {
        template = publicLayoutTemplate();
    });

    it("should return a string", () => {
        expect(typeof template).toBe("string");
    });

    it("should not be empty", () => {
        expect(template.trim().length).toBeGreaterThan(0);
    });

    it("should import required components", () => {
        expect(template).toContain('import { Footer }');
        expect(template).toContain('import { Header }');
        expect(template).toContain('import { MainLayout }');
    });

    it("should import ToastContainer from react-toastify", () => {
        expect(template).toContain('import { ToastContainer } from "react-toastify"');
    });

    it("should export default RootLayout function", () => {
        expect(template).toContain("export default function RootLayout");
    });

    it("should wrap content with MainLayout", () => {
        expect(template).toContain("<MainLayout>");
        expect(template).toContain("</MainLayout>");
    });

    it("should render Header component", () => {
        expect(template).toContain("<Header");
    });

    it("should render Footer component", () => {
        expect(template).toContain("<Footer");
    });

    it("should render ToastContainer with top-center position", () => {
        expect(template).toContain('<ToastContainer position="top-center"');
    });

    it("should render children inside layout", () => {
        expect(template).toContain("{children}");
    });

    it("should include public layout test id", () => {
        expect(template).toContain('data-testid="root-layout-public"');
    });

    it("should not contain undefined", () => {
        expect(template).not.toContain("undefined");
    });

});
