export enum Figure { pawn, rook, bishop, queen, king, knight };

export interface IDeskZone {
    color: string,
    value: Figure | null,
    isBlocked: boolean
};

export interface IDeskInfo {
    a: IDeskZone[],
    b: IDeskZone[],
    c: IDeskZone[],
    d: IDeskZone[],
    e: IDeskZone[],
    f: IDeskZone[],
    g: IDeskZone[],
    h: IDeskZone[]
};

export interface IFigurePosition {
    lineIndex: number,
    zoneIndex: number
};

export interface IActiveFigure {
    figure: IDeskZone,
    position: IFigurePosition
};

export type IFigureColor = "green" | "white";

export interface IHistoryElement {
    figureColor: IFigureColor,
    previousPosition: IFigurePosition,
    newPosition: IFigurePosition
};

