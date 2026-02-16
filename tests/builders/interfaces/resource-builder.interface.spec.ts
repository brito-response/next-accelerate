import { IResourceBuilder } from "../../../src/builders/interfaces/resource-builder.interface";

describe("ResourceBuilder interface", () => {

    let resourceBuilder: IResourceBuilder;

    beforeAll(() => {
        resourceBuilder = {
            setBasePath() { return this; },
            setBasePathForForm() { return this; },
            setBasePathForComponents() { return this; },
            createComponentInputCustom() { return this; },
            createListPage() { return this; },
            createDetailPage() { return this; },
            createNewPage() { return this; },
            createCrudForm() { return this; },
            build() { }
        };
    });
    it("should have the correct methods", () => {
        expect(typeof resourceBuilder.setBasePath).toBe("function");
        expect(typeof resourceBuilder.setBasePathForForm).toBe("function");
        expect(typeof resourceBuilder.setBasePathForComponents).toBe("function");
        expect(typeof resourceBuilder.createComponentInputCustom).toBe("function");
        expect(typeof resourceBuilder.createListPage).toBe("function");
        expect(typeof resourceBuilder.createDetailPage).toBe("function");
        expect(typeof resourceBuilder.createNewPage).toBe("function");
        expect(typeof resourceBuilder.createCrudForm).toBe("function");
        expect(typeof resourceBuilder.build).toBe("function");
    });

    it("should have 7 methods", () => {
        const methodCount = Object.keys(resourceBuilder).length;
        expect(methodCount).toBe(9);
    });
});