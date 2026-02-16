import { inputTemplate } from "../../src/templates/inputs/input-template";

describe("inputTemplate", () => {

    it("should return the correct template", () => {
        const result = inputTemplate();
        expect(result).toMatchSnapshot();
    });

    it("should return a string", () => {
        const result = inputTemplate();
        expect(typeof result).toBe("string");
    });


    it('should include "use client"', () => {
        const result = inputTemplate();
        expect(result).toContain('"use client"');
    });

    it("should export InputCustom component", () => {
        const result = inputTemplate();
        expect(result).toContain("export const InputCustom");
    });

    it("should use react-hook-form Controller", () => {
        const result = inputTemplate();
        expect(result).toContain("useFormContext");
        expect(result).toContain("Controller");
    });

    it("should support multiline textarea", () => {
        const result = inputTemplate();
        expect(result).toContain("if (multiline)");
        expect(result).toContain("<textarea");
    });

    it("should handle date input conversion", () => {
        const result = inputTemplate();
        expect(result).toContain("asDate");
        expect(result).toContain("toISOString");
    });

});