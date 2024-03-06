import { CavernWithBaseplatesAndPaths } from "../../models/cavern";
import { Path } from "../../models/path";

/**
 * Remove any ambiguous paths on baseplates that exist outside the clip radius.
 * The halls on the outside edges tend to be long, thin, straight, cardinal,
 * and boring.
 */
export default function clip(
  cavern: CavernWithBaseplatesAndPaths,
): CavernWithBaseplatesAndPaths {
  const radius = cavern.context.targetSize / 2;
  const rSquared = radius * radius;
  const paths: Path[] = cavern.paths.filter((path) => {
    return (
      path.kind === "spanning" ||
      !path.baseplates.some((bp) => {
        const [x, y] = bp.center;
        return x * x + y * y > rSquared;
      })
    );
  });
  return { ...cavern, paths };
}
