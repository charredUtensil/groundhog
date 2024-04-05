import * as fs from "fs/promises";
import path from "node:path";

const UPDATE_GOLDENS = "UPDATE_GOLDENS";
const GOLDEN_DIR = "goldens";

const updateGoldenFile = async (filePath: string, actual: string) => {
  // Write the actual output to the file path
  await fs.writeFile(filePath, actual);
  console.log(`Updated golden file: ${filePath}`);
};

const goldenTest = async (name: string, fn: () => string) => {
  const filePath = path.resolve(__dirname, `${GOLDEN_DIR}/${name}.dat`);
  test(name, async () => {
    const actual = fn();
    if (process.env[UPDATE_GOLDENS]) {
      await updateGoldenFile(filePath, actual);
      return;
    }
    const expected = await fs.readFile(filePath, "utf-8");
    expect(actual).toEqual(expected);
  });
};
export default goldenTest;
