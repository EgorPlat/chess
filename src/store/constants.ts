import { Figure, IDeskInfo } from "../interfaces";
import { IMainSlice } from "../interfaces/slices";

export const DEFAULT_DESK: IDeskInfo = {
    a: [
        { color: "white", value: Figure.rook, isBlocked: false }, 
        { color: "white", value: Figure.knight, isBlocked: false }, 
        { color: "white", value: Figure.bishop, isBlocked: false }, 
        { color: "white", value: Figure.king, isBlocked: false }, 
        { color: "white", value: Figure.queen, isBlocked: false }, 
        { color: "white", value: Figure.bishop, isBlocked: false }, 
        { color: "white", value: Figure.knight, isBlocked: false }, 
        { color: "white", value: Figure.rook, isBlocked: false }
    ],
    b: [
        { color: "white", value: Figure.pawn, isBlocked: false }, 
        { color: "white", value: Figure.pawn, isBlocked: false }, 
        { color: "white", value: Figure.pawn, isBlocked: false }, 
        { color: "white", value: Figure.pawn, isBlocked: false }, 
        { color: "white", value: Figure.pawn, isBlocked: false }, 
        { color: "white", value: Figure.pawn, isBlocked: false }, 
        { color: "white", value: Figure.pawn, isBlocked: false }, 
        { color: "white", value: Figure.pawn, isBlocked: false }
    ],
    c: [
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }
    ],
    d: [
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }
    ],
    e: [
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }
    ],
    f: [
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }, 
        { color: "", value: null, isBlocked: false }
    ],
    g: [
        { color: "green", value: Figure.pawn, isBlocked: false }, 
        { color: "green", value: Figure.pawn, isBlocked: false }, 
        { color: "green", value: Figure.pawn, isBlocked: false }, 
        { color: "green", value: Figure.pawn, isBlocked: false }, 
        { color: "green", value: Figure.pawn, isBlocked: false }, 
        { color: "green", value: Figure.pawn, isBlocked: false }, 
        { color: "green", value: Figure.pawn, isBlocked: false }, 
        { color: "green", value: Figure.pawn, isBlocked: false }
    ],
    h: [
        { color: "green", value: Figure.rook, isBlocked: false }, 
        { color: "green", value: Figure.knight, isBlocked: false }, 
        { color: "green", value: Figure.bishop, isBlocked: false }, 
        { color: "green", value: Figure.king, isBlocked: false }, 
        { color: "green", value: Figure.queen, isBlocked: false }, 
        { color: "green", value: Figure.bishop, isBlocked: false }, 
        { color: "green", value: Figure.knight, isBlocked: false }, 
        { color: "green", value: Figure.rook, isBlocked: false }
    ],
}

export const INITIAL_MAIN_SLICE_STATE: IMainSlice = {
    deskInfo: DEFAULT_DESK,
    history: [],
    currentCheck: null,
    positionsOfCurrentCheck: [],
    figureForSwap: null
}