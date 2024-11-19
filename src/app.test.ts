import { ServerApp } from "./presentation/server-app";

describe("App.ts", () => {
  test("deberia llamar ServerApp.run con valores", async () => {
    const serverAppMock = jest.fn();
    ServerApp.run = serverAppMock;

    process.argv = [
      "node",
      "app.ts",
      "-b",
      "10",
      "-l",
      "5",
      "-s",
      "-n",
      "test-file",
      "-d",
      "test-destination",
    ];

    await import("./app");

    expect(serverAppMock).toHaveBeenCalledWith({
      base: 10,
      limit: 5,
      showTable: true,
      fileName: "test-file",
      fileDestination: "test-destination",
    });
  });
});
