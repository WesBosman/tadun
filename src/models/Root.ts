import { Instance, onSnapshot } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { TodoList } from "./Todo";

let initialState = TodoList.create({
  items: [
    {
        id: 1,
        title: 'Example',
        isCompleted: false,
    }
  ],
});

// if (process.browser) {
//   const data = localStorage.getItem("rootState");
//   if (data) {
//     const json = JSON.parse(data);
//     if (TodoList.is(json)) {
//       initialState = TodoList.create(json);
//     }
//   }
// }

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  console.log("Snapshot: ", snapshot);
  localStorage.setItem("rootState", JSON.stringify(snapshot));
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