import { useSyncExternalStore } from "react";

// 欄數隨螢幕變少，但所有照片都會分配進這些欄，不會有任何一欄被隱藏
const BREAKPOINTS = [
  { query: "(min-width: 1100px)", columns: 3 },
  { query: "(min-width: 640px)", columns: 2 },
] as const;

const SERVER_COLUMNS = 3;

function getColumns() {
  const hit = BREAKPOINTS.find(({ query }) => matchMedia(query).matches);

  return hit ? hit.columns : 1;
}

function subscribe(onChange: () => void) {
  const lists = BREAKPOINTS.map(({ query }) => matchMedia(query));

  lists.forEach((list) => list.addEventListener("change", onChange));

  return () => {
    lists.forEach((list) => list.removeEventListener("change", onChange));
  };
}

const useColumnCount = () =>
  useSyncExternalStore(subscribe, getColumns, () => SERVER_COLUMNS);

export { useColumnCount };
