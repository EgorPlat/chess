import { IChecksInfo, IDeskInfo, IHistoryElement } from "."

export interface IMainSlice {
    deskInfo: IDeskInfo,
    history: IHistoryElement[],
    currentCheck: string | null,
    positionsOfCurrentCheck: IChecksInfo[],
    figureForSwap: number | null
};

export interface IRootStore {
    rootReducer: { 
        main: IMainSlice,
        mainApi: any
    }
};
