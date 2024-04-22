import { IDeskInfo } from "."

export interface IMainSlice {
    deskInfo: IDeskInfo
};

export interface IRootStore {
    main: IMainSlice
};
