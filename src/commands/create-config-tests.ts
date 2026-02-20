import { TestsBuilder } from "../builders/tests-builder";
import { nextProjectGuardSimple } from "../utils/guards";

export function createTestUnitConfig(options?: { git?: boolean }) {
    nextProjectGuardSimple();
    const builder = new TestsBuilder(options);
    builder.setBasePathAndCreateConfigViTest().installDependencesViTestRequired().build();

    console.log(`resource configured \x1b[32m✔ Success\x1b[0m`);
};

export function createTestE2EConfig(options?: { git?: boolean }) {
    nextProjectGuardSimple();
    const builder = new TestsBuilder(options);
    builder.setBasePathAndCreatePlaywrightConfigTest().installDependencesPlaywrightTestRequired().build();

    console.log(`resource configured \x1b[32m✔ Success\x1b[0m`);
};


