import { IChecksInfo, IDeskInfo, IHistoryElement } from "."

export interface IMainSlice {
    deskInfo: IDeskInfo,
    history: IHistoryElement[],
    currentCheck: string | null,
    positionsOfCurrentCheck: IChecksInfo[]
};

export interface IRootStore {
    main: IMainSlice
};
