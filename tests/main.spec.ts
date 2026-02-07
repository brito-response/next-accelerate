
import * as createModule from "../src/commands/create-resource";
import { main } from "../src/index";

describe("cli main ()", () => {
    it("should call createResource when command is create", () => {
        const spy = jest.spyOn(createModule, "createResource").mockImplementation(() => { }); // given
        main(["node", "cli", "create", "user"]);  // when
        expect(spy).toHaveBeenCalledWith("user");  // then
    });

    it("should show information console when command is unknown", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { }); // given 
        main(["node", "cli", "foo"]); // when
        expect(logSpy).toHaveBeenCalledWith("Comando não reconhecido"); // then
    });

    it("should show help when command is --help", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { }); // given
        main(["node", "cli", "--help"]); // when

        // then
        expect(logSpy).toHaveBeenCalledWith("Comandos disponíveis:");
        expect(logSpy).toHaveBeenCalledWith("  create <resource-name> - Cria um novo recurso");
        expect(logSpy).toHaveBeenCalledWith("  create:form <resource-name> - Cria um novo formulário para o recurso"
        );
    });
});
