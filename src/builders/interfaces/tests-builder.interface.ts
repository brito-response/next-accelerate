export interface ITestsBuilder {
  installDependencesViTestRequired(): this;
  installDependencesPlaywrightTestRequired(): this;
  setBasePathAndCreateConfigViTest(): this;
  setBasePathAndCreatePlaywrightConfigTest(): this;
  build(): void;
};
