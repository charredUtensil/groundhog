import { version } from '../../../package.json';

export const ENVIRONMENT = (() => 
  import.meta?.env?.VITE_ENVIRONMENT ?? `unknown`
)() as 'unknown' | 'test' | 'dev' | 'prod';

const GROUNDHOG_VERSION = (() => 
  import.meta?.env?.VITE_APP_VERSION ?? `${version}-unknown`
)();

export default GROUNDHOG_VERSION;