import { log } from "console";
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from "./server-app";

describe("/server-app.ts", () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileDestination: "test-destination",
    fileName: "test-filename",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Deberia crear una instancia de un servidor", () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("deberia correr ServerApp con las opciones", () => {
    // Prueba de integracion...
    const logSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");
    ServerApp.run(options);
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("server running...");
    expect(logSpy).toHaveBeenLastCalledWith("File Created!");
    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
  });

  test("deberia correr con valores personalizados mocked", () => {
    // pruebas unitarias
    const mockFileContent = "2 x 1 = 2";
    const logMock = jest.fn();
    const errorMock = jest.fn();
    const createTableMock = jest.fn().mockReturnValue(mockFileContent);
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    console.error = errorMock;
    CreateTable.prototype.execute = createTableMock;
    SaveFile.prototype.execute = saveFileMock;
    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("server running...");
    expect(createTableMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: mockFileContent,
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
    expect(logMock).toHaveBeenCalledWith("File Created!");
    expect(errorMock).not.toHaveBeenCalledWith();
  });
});
