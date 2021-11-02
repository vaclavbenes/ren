import {
  move,
  copy,
} from "https://deno.land/std@0.63.0/fs/mod.ts";

import { parse } from "https://deno.land/std/flags/mod.ts";
import bracketExpression, { Range } from "./bracketExpansion.ts";

const doc: string = `
Usage:
    rem.ts .txt .jpeg * # copy txt to jpeg for all files in
    --force - replace files
`.trim();

const show = (name: File, newFile: File) =>
  console.log(` ${name.name} -> ${newFile.name}`);

const replace = (file: File, firstGlob: Glob, secondGlob: Glob) => {
  let name = firstGlob.toString();
  let newName = secondGlob.toString();

  if (name === "*") name = file.name;
  if (name === "") {
    return;
  }

  const newFileName = file.name.replace(name, newName);

  const newFile = new File(
    newFileName,
    file.path.replace(file.name, newFileName),
  );
  setOption(file, newFile, options);
};

function setOption(file: File, newFile: File, options: options) {
  if (options.help) {
    console.log(doc);
    Deno.exit(0);
  } else {
    if (options.show) {
      show(file, newFile);
    } else {
      if (options.move) {
        move(file.path, newFile.path);
      } else if (options.copy) {
        copy(file.path, newFile.path);
      }
    }
  }
}

type mode = "match" | "expand";

class Glob {
  static _stack: string[] | Range[] = [];
  constructor(
    public _string: string,
    public mode: { mode: mode },
  ) {
    this._string = _string;
    this.mode = mode;
  }
  get stack(): string | number | undefined {
    switch (this._string) {
      case "*": {
        return "*";
      }
      case "": {
        return "";
      }
      default: {
        if (!(Glob._stack && Glob._stack.length)) {
          Glob._stack = bracketExpression(Bracket.regex(this._string));
        }

        return Glob._stack.shift();
      }
    }
  }
  toString() {
    return new Bracket(this._string, this.stack as string).value;
  }
}

class Bracket {
  constructor(public value: string, public replace: string) {
    const match = Bracket.regex(value);
    this.value = match ? value.replace(match, replace) : value;
  }
  static regex(value: string) {
    return regex(value);
  }
}

const regex = (value: string) => {
  const regex = /{.*\.\..*}|{.*,.*}/gm;
  let m: RegExpExecArray | null;
  const matches: string[] = [];

  while ((m = regex.exec(value)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    // The result can be accessed through the `m`-variable.
    m.forEach((match, _) => {
      matches.push(match);
    });
  }
  return matches.toString();
};

class File {
  constructor(public name: string, public path: string) {
  }
  static getName(path: string): string {
    const splitedPath = path.split("/");
    return splitedPath[splitedPath.length - 1];
  }
  async isFile(): Promise<boolean> {
    const fileInfo = await Deno.lstat(this.path);
    return fileInfo.isFile;
  }
}

async function main() {
  for (const path of paths) {
    const stringPath = path as string;
    const file = new File(File.getName(stringPath), stringPath);

    if (file.isFile()) {
      replace(file, _first, _second);
    }
  }
}

const args = parse(Deno.args, {
  boolean: ["force", "help", "show"],
});

const [first, second, ...paths] = args._;
const _first = new Glob(first as string, { mode: "match" });
const _second = new Glob(second as string, { mode: "match" });
type options = { copy: boolean; move: boolean; show: boolean; help: boolean };
const options = {
  copy: !args.force,
  move: args.force,
  help: args.help,
  show: args.show,
};

main();
