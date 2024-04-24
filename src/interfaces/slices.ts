import { IDeskInfo, IHistoryElement } from "."

export interface IMainSlice {
    deskInfo: IDeskInfo,
    history: IHistoryElement[],
    currentCheck: string | null
};

export interface IRootStore {
    main: IMainSlice
};
