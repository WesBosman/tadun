import { Instance, onSnapshot } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { TodoList } from "./Todo";

let initialState = TodoList.create({
  items: [],
});

initialState.loadTodos();

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  console.log("Snapshot: ", snapshot);
});

export type RootInstance = Instance<typeof TodoList>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}