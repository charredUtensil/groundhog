import { version } from "../../../package.json";

const GROUNDHOG_VERSION = (() =>
  import.meta?.env?.VITE_APP_VERSION ?? `${version}-unknown`)();

export default GROUNDHOG_VERSION;
