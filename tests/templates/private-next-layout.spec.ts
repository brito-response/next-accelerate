import { privateNextLayoutTemplate } from "../../src/templates/layouts";

describe("privateNextLayoutTemplate", () => {

    let template: string;

    beforeAll(() => {
        template = privateNextLayoutTemplate();
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
        expect(template).toContain('import { MenuAside }');
        expect(template).toContain('import { ManagerLayout }');
        expect(template).toContain('import { LayoutCaptureError }');
    });

    it("should import MenuProvider context", () => {
        expect(template).toContain('import { MenuProvider }');
    });

    it("should import ToastContainer", () => {
        expect(template).toContain('import { ToastContainer } from "react-toastify"');
    });

    it("should export default RootLayout function", () => {
        expect(template).toContain("export default function RootLayout");
    });

    it("should include private layout test id", () => {
        expect(template).toContain('data-testid="root-layout-private"');
    });

    it("should wrap layout with MenuProvider", () => {
        expect(template).toContain("<MenuProvider>");
        expect(template).toContain("</MenuProvider>");
    });

    it("should wrap content with ManagerLayout", () => {
        expect(template).toContain("<ManagerLayout>");
        expect(template).toContain("</ManagerLayout>");
    });

    it("should render Header, Footer and MenuAside", () => {
        expect(template).toContain("<Header");
        expect(template).toContain("<Footer");
        expect(template).toContain("<MenuAside");
    });

    it("should render ToastContainer with top-center position", () => {
        expect(template).toContain('<ToastContainer position="top-center"');
    });

    it("should wrap children with LayoutCaptureError", () => {
        expect(template).toContain("<LayoutCaptureError>");
        expect(template).toContain("{children}");
        expect(template).toContain("</LayoutCaptureError>");
    });

    it("should not contain undefined", () => {
        expect(template).not.toContain("undefined");
    });

});
