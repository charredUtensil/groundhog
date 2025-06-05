import { exit } from "node:process";
import { parseArgs } from "node:util";
import wrap from "word-wrap";

type StringFlagOpts<T> = {
  type: "string";
  multiple?: false | undefined;
  short?: string | undefined;
  help?: string;
} & (
  | {
      default: string;
      parse: (it: string) => T;
    }
  | {
      default?: undefined;
      parse: (it: string | undefined) => T;
    }
);
type FlagOpts<T> = StringFlagOpts<T>;

type FlagsConfig<T> = {
  [K in keyof T]: FlagOpts<T[K]>;
};

const HELP_FLAG = {
  type: "boolean",
  short: "h",
} as const;

export function getFlags<T>(
  opts: Omit<NonNullable<Parameters<typeof parseArgs>[0]>, "options"> & {
    usage: string;
    options: FlagsConfig<T>;
  },
) {
  const flags = Object.keys(opts.options) as (keyof T)[];
  function usage() {
    const flagsHelp = flags
      .sort()
      .map((k) => {
        const v = opts.options[k];
        const short = (v.short ?? "").padEnd(4);
        const long = k.toString().padEnd(22);
        const pfx1 = `    -${short} --${long} `;
        const pfx2 = " ".padEnd(pfx1.length);
        return wrap(v.help ?? "", { width: 80 - pfx1.length, indent: "" })
          .split("\n")
          .map((line, i) => `${i > 0 ? pfx2 : pfx1}${line}`)
          .join("\n");
      })
      .join("\n");
    // eslint-disable-next-line no-console
    console.log(`${opts.usage}\n\nFlags:\n${flagsHelp}\n`);
  }
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable @typescript-eslint/no-unsafe-argument */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  try {
    const { values, positionals } = parseArgs({
      ...opts,
      options: { help: HELP_FLAG, ...opts.options },
    }) as any;
    if (values.help) {
      usage();
      exit(0);
    }
    const result: Partial<T> = {};
    flags.forEach((k) => {
      result[k] = opts.options[k].parse(values[k]);
    });
    return { ...result, positionals } as T & { positionals: string[] };
  } catch (e) {
    usage();
    throw e;
  }
}
