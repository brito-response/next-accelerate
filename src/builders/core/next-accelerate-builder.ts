import pluralize from "pluralize";
import { BuilderOptions } from "../../utils/contracts/build-options";
import { gitCommit } from "../../utils/services/git.service";

export abstract class NextAccelerateBuilder {

    protected readonly resource: string;
    protected readonly singular: string;
    protected basePath: string;
    protected readonly options?: BuilderOptions;
    protected readonly inputName: string;

    constructor(inputName: string, options?: BuilderOptions) {
        this.inputName = inputName;
        this.options = options;

        this.basePath = process.cwd();
        this.resource = pluralize(inputName.toLowerCase());
        this.singular = pluralize.singular(this.resource);
    }

    protected createCommit(message: string) {
        if (!this.options?.git) return;
        gitCommit(message);
    }

    public build() {
        if (!this.options?.git) return;
        console.log("commits made successfully ✨")
    };
}
