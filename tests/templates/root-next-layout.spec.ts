import { rootLayoutMinimalTemplate } from "../../src/templates/layouts/index";

describe("rootLayoutMinimalTemplate", () => {

    let template: string;

    beforeAll(() => {
        template = rootLayoutMinimalTemplate();
    });

    it("should return a string", () => {
        expect(typeof template).toBe("string");
    });

    it("should not be empty", () => {
        expect(template.trim().length).toBeGreaterThan(0);
    });

    it("should import Next Metadata type", () => {
        expect(template).toContain('import type { Metadata } from "next"');
    });

    it("should import next fonts", () => {
        expect(template).toContain('Geist');
        expect(template).toContain('Geist_Mono');
        expect(template).toContain('next/font/google');
    });

    it("should import global css", () => {
        expect(template).toContain('import "./globals.css"');
    });

    it("should define metadata export", () => {
        expect(template).toContain("export const metadata");
        expect(template).toContain("title:");
        expect(template).toContain("description:");
    });

    it("should export RootLayout function", () => {
        expect(template).toContain("export default function RootLayout");
    });

    it("should render html and body tags", () => {
        expect(template).toContain("<html");
        expect(template).toContain("<body");
    });

    it("should apply font variables to body className", () => {
        expect(template).toContain("geistSans.variable");
        expect(template).toContain("geistMono.variable");
    });

    it("should include data-testid attribute", () => {
        expect(template).toContain('data-testid="root-layout"');
    });

    it("should render children", () => {
        expect(template).toContain("{children}");
    });

    it("should not contain undefined", () => {
        expect(template).not.toContain("undefined");
    });

});