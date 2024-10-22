import BOSS_BATTLE from "./boss_battle";
import ERUPTION from "./eruption";
import SECRET_TUNNEL from "./secret_tunnel";

const SEISMIC = [...BOSS_BATTLE, ...ERUPTION, ...SECRET_TUNNEL] as const;

export default SEISMIC;
