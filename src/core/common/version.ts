import { version } from "../../../package.json";

const GROUNDHOG_VERSION = (() =>
  process.env.VITE_APP_VERSION ?? `${version}-unknown`)();

export default GROUNDHOG_VERSION;
