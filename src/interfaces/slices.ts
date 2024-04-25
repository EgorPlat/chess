import { IDeskInfo, IFigurePosition, IHistoryElement } from "."

export interface IMainSlice {
    deskInfo: IDeskInfo,
    history: IHistoryElement[],
    currentCheck: string | null,
    positionsOfCurrentCheck: IFigurePosition[]
};

export interface IRootStore {
    main: IMainSlice
};
