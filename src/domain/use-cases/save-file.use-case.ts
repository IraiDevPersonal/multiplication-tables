import fs from "fs";

export interface SaveFileUseCase {
  execute(options: Options): boolean;
}

interface Options {
  fileContent: string;
  fileName?: string;
  fileDestination?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() /**
   * repository: StorageRepository
   */ {}

  execute({
    fileContent,
    fileDestination = "outputs",
    fileName = "table",
  }: Options): boolean {
    try {
      fs.mkdirSync(fileDestination, { recursive: true });
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
      return true;
    } catch (error) {
      // console.error(error);

      return false;
    }
  }
}
