import { SaveFile } from "./save-file.use-case";
import fs from "fs";

describe("/save-file-use-case.ts", () => {
  const customOptions = {
    fileContent: "custom content",
    fileDestination: "custom-outputs/file-destination",
    fileName: "custom-table-name",
  };
  const rootOutDir = "outputs";
  const customOutDir = customOptions.fileDestination.split("/")[0];
  const saveFile = new SaveFile();

  function removeDir(dir: string) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true });
    }
  }

  // beforeEach(() => {
  //   removeDir(rootOutDir);
  //   removeDir(customOutDir);
  // });

  afterEach(() => {
    removeDir(rootOutDir);
    removeDir(customOutDir);
  });

  test("deberia guardar un archivo con los valores por defecto", () => {
    const filePath = `${rootOutDir}/table.txt`;
    const options = {
      fileContent: "test content",
    };

    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(saveFile).toBeInstanceOf(SaveFile);
    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  test("deberia crear un archivo con valores personalizados", () => {
    const filePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
    const result = saveFile.execute(customOptions);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);
  });

  test("deberia retornar falso si el directorio no ha sido creado", () => {
    // mockImplementation quiere decir que se quiere sobreescribir la funcionalidad apuntada, por la implementacion especificada en el callback
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error(
        "este es un error personalizado de pruebas al crear directorio"
      );
    });
    const result = saveFile.execute(customOptions);

    expect(result).toBe(false);
    // esto restaura la funcion original que fue sobreescrita  en el mockImplementation
    mkdirSpy.mockRestore();
  });

  test("deberia retornar falso si el archivo no ha sido creado", () => {
    const writeFileSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error(
          "este es un error personalizado de pruebas al crear el archivo"
        );
      });
    const result = saveFile.execute({ fileContent: "hola" });

    expect(result).toBe(false);
    writeFileSpy.mockRestore();
  });
});
