import { NextAuthBuilder } from "../builders/next-auth-builder";
import { nextProjectGuardSimple } from "../utils/guards";

export function createNextAutResource(options?: { git?: boolean }) {
  nextProjectGuardSimple();

  const builder = new NextAuthBuilder(options);
  builder.installDependencesRequired().setBasePathAndCreateConfig().createNextAuthAuxOptions().createNextAuthForms().
    createNextLayouts().setLayouts().createComponentsAux().createNextAutorizationSystem().setEnvironmentVariable().build();
  console.log(`next auth configured \x1b[32m✔ success\x1b[0m`);
};
