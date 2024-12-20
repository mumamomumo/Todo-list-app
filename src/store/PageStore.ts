import { create } from "zustand";

const pages = ["todoList", "addTask"] as const;

type pageStore = {
  page: (typeof pages)[number];
  pageProps: any;
  setPage: (page: (typeof pages)[number]) => void;
  setPageProps: (props: any) => void;
};

const usePageStore = create<pageStore>((set) => ({
  page: "todoList",
  pageProps: null,
  setPage: (page) => set({ page }),
  setPageProps: (props) => set({ pageProps: props }),
}));

function changePage(page: (typeof pages)[number], props?: any): void {
  usePageStore.getState().setPage(page);
  usePageStore.getState().setPageProps(props);
}

export default usePageStore;
export const setPage = changePage;
