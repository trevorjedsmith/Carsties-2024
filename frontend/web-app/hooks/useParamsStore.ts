import { create } from "zustand"

// Contract
type State = {
    pageNumber: number
    pageSize: number
    pageCount: number
    searchTerm: string
    searchValue: string
    orderBy: string,
    filterBy: string
}

// Actions/Functions
type Actions = {
    setSearchValue: (value: string) => void
    setParams: (params: Partial<State>) => void
    reset: () => void
}

// Initial State 
const initialState: State = {
    pageNumber: 1,
    pageSize: 12,
    pageCount: 1,
    searchTerm: '',
    searchValue: '',
    orderBy: 'make',
    filterBy: 'live'
}

export const useParamsStore = create<State & Actions>()((set) => ({
    ...initialState,

    setParams: (newParams: Partial<State>) => {
        set((state) => {
            // if this is just a page change spread state and just replace pagenumber
            if (newParams.pageNumber) {
                return { ...state, pageNumber: newParams.pageNumber }
            } else {
                // if this is a filter change spread state, new filter params and reset page to 1
                return { ...state, ...newParams, pageNumber: 1 }
            }
        })
    },

    reset: () => {
        set(initialState)
    },

    setSearchValue: (value: string) => {
        set({ searchValue: value })
    }
}))