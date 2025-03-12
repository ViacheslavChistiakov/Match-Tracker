import { create }  from 'zustand';

interface MatchStore {
    sortByStatus: string;
    setSortByStatus: (status: string) => void
}

export const useMatchStore = create<MatchStore>((set) => ({
    sortByStatus: 'Все статусы',
    setSortByStatus: (status: string) => set({ sortByStatus: status })
}))