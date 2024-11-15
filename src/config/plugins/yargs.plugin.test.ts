const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import("./yargs.plugin");

  return yarg;
};

const originalArgv = process.argv;

describe("/yargs.plugin.ts", () => {
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test("Pruebas con los valores por defecto", async () => {
    const argv = await runCommand(["-b", "5"]);
    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        d: "outputs",
        n: "multiplication-table",
      })
    );
  });

  test("deberia retornar la configuracion con valores personalizados", async () => {
    const argsTostring: string[] = [];
    const customArgs = {
      b: 10,
      l: 8,
      s: true,
      d: "test-outputs",
      n: "test-table",
    };

    Object.entries(customArgs).forEach(([k, v]) => {
      argsTostring.push(`-${k}`);
      argsTostring.push(`${v}`);
    });

    const argv = await runCommand(argsTostring);
    expect(argv).toEqual(expect.objectContaining(customArgs));

    // const argv = await runCommand([
    //   "-b",
    //   "10",
    //   "-l",
    //   "5",
    //   "-s",
    //   "true",
    //   "-d",
    //   "test-outputs",
    //   "-n",
    //   "test-table",
    // ]);
    // expect(argv).toEqual(
    //   expect.objectContaining({
    //     b: 10,
    //     l: 5,
    //     s: true,
    //     d: "test-outputs",
    //     n: "test-table",
    //   })
    // );
  });
});
