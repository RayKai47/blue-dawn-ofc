import { useSyncExternalStore } from "react";

import { bgm } from "#/lib/bgm";

const useBgm = () => useSyncExternalStore(bgm.subscribe, bgm.isEnabled, () => false);

export { useBgm };
