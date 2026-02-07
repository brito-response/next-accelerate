// env global for tests of CLI

beforeAll(() => {
  jest.spyOn(process, "exit").mockImplementation(((code?: number) => {throw new Error("process.exit: " + code);}) as never);
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});