import { KanjiSelectionStorageInterface } from "./models";
import localforage from "localforage";

export const setKanjiSelection = (data: KanjiSelectionStorageInterface) => {
  return localforage
    .setItem("KanjiSelection", data)
    .then((res: KanjiSelectionStorageInterface) => res);
};

export const getKanjiSelection = () => {
  return localforage
    .getItem("KanjiSelection")
    .then((res: any | KanjiSelectionStorageInterface) => res);
};

export const removeKanjiSelection = () => {
  return localforage
    .removeItem("KanjiSelection")
    .then((res: any | KanjiSelectionStorageInterface) => res);
};
