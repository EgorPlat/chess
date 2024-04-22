import { IDeskInfo, IHistoryElement } from "."

export interface IMainSlice {
    deskInfo: IDeskInfo,
    history: IHistoryElement[]
};

export interface IRootStore {
    main: IMainSlice
};
