export interface CreateTableUseCase {
  execute(options: ExecuteOptions): string;
}

interface ExecuteOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  constructor() {} // DI: Dependency injeection

  execute({ base, limit = 10 }: ExecuteOptions) {
    let outputMessage: string = "";

    for (let index = 1; index <= limit; index++) {
      outputMessage += `${base} x ${index} = ${base * index}`;

      if (index < limit) outputMessage += "\n";
    }

    return outputMessage;
  }
}
