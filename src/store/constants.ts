import { Figure, IDeskInfo } from "../interfaces";

export const DEFAULT_DESK: IDeskInfo = {
    a: [
        { color: "white", value: Figure.rook }, 
        { color: "white", value: Figure.knight }, 
        { color: "white", value: Figure.bishop }, 
        { color: "white", value: Figure.king }, 
        { color: "white", value: Figure.queen }, 
        { color: "white", value: Figure.bishop }, 
        { color: "white", value: Figure.knight }, 
        { color: "white", value: Figure.rook }
    ],
    b: [
        { color: "white", value: Figure.pawn }, 
        { color: "white", value: Figure.pawn }, 
        { color: "white", value: Figure.pawn }, 
        { color: "white", value: Figure.pawn }, 
        { color: "white", value: Figure.pawn }, 
        { color: "white", value: Figure.pawn }, 
        { color: "white", value: Figure.pawn }, 
        { color: "white", value: Figure.pawn }
    ],
    c: [
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }
    ],
    d: [
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }
    ],
    e: [
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }
    ],
    f: [
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }, 
        { color: "", value: null }
    ],
    g: [
        { color: "green", value: Figure.pawn }, 
        { color: "green", value: Figure.pawn }, 
        { color: "green", value: Figure.pawn }, 
        { color: "green", value: Figure.pawn }, 
        { color: "green", value: Figure.pawn }, 
        { color: "green", value: Figure.pawn }, 
        { color: "green", value: Figure.pawn }, 
        { color: "green", value: Figure.pawn }
    ],
    h: [
        { color: "green", value: Figure.rook }, 
        { color: "green", value: Figure.knight }, 
        { color: "green", value: Figure.bishop }, 
        { color: "green", value: Figure.king }, 
        { color: "green", value: Figure.queen }, 
        { color: "green", value: Figure.bishop }, 
        { color: "green", value: Figure.knight }, 
        { color: "green", value: Figure.rook }
    ],
}