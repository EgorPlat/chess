import { Figure, IDeskInfo, IDeskZone, IFigurePosition } from "../interfaces";

export const isSquareZoneClear = (deskInfo: IDeskInfo, line: number, zone: number) => {
    if (zone < 8 && zone >= 0 && line < 8 && line >= 0) {
        return Object.values(deskInfo)[line][zone]?.value === null;
    }
};

export const isSquareZoneNotClear = (deskInfo: IDeskInfo, line: number, zone: number) => {
    if (zone < 8 && zone >= 0 && line < 8 && line >= 0) {
        return Object.values(deskInfo)[line][zone]?.value !== null;
    }
};

export const isSquareZoneFigureNotCurrentPlayer = (deskInfo: IDeskInfo, line: number, zone: number, currentPlayer: string) => {
    if (zone < 8 && zone >= 0 && line < 8 && line >= 0) {
        return Object.values(deskInfo)[line][zone]?.color !== currentPlayer;
    }
};


export const isSquareZoneFigureKing = (deskInfo: IDeskInfo, line: number, zone: number, currentPlayer: string) => {
    const figure: IDeskZone = Object.values(deskInfo)[line][zone];
    return figure.color === currentPlayer && figure?.value === Figure.king;
};

export const isFigureAreRookOrQueen = (deskZone: IDeskZone) => {
    return deskZone.value === Figure.rook || deskZone.value === Figure.queen;
};

export const isFigureAreQueenOrBishop = (deskZone: IDeskZone) => {
    return deskZone.value === Figure.bishop || deskZone.value === Figure.queen;
};

export const getFigureInSquareZone = (deskInfo: IDeskInfo, line: number, zone: number) => {
    if (zone < 8 && zone >= 0 && line < 8 && line >= 0) {
        return Object.values(deskInfo)[line][zone];
    }
};

export const detectAllowedZonesForPawn = (
    line: number, 
    zone: number, 
    currentPlayer: string, 
    deskInfo: IDeskInfo,
    currentCheck: string | null
) => {
    if (currentPlayer === 'white') {
        let allowedPositions: IFigurePosition[] = [];
        const allowedPositionZone = Object.values(deskInfo)[line + 1][zone];
        if (allowedPositionZone.value === null) {
            allowedPositions = [...allowedPositions, { lineIndex: line + 1, zoneIndex: zone }];
        }
        if (
            isSquareZoneNotClear(deskInfo, line + 1, zone + 1) &&
            isSquareZoneFigureNotCurrentPlayer(deskInfo, line + 1, zone + 1, currentPlayer)
        ) {
            allowedPositions = [...allowedPositions, { lineIndex: line + 1, zoneIndex: zone + 1 }];
        }
        if (
            isSquareZoneNotClear(deskInfo, line + 1, zone - 1) &&
            isSquareZoneFigureNotCurrentPlayer(deskInfo, line + 1, zone - 1, currentPlayer)
        ) {
            allowedPositions = [...allowedPositions, { lineIndex: line + 1, zoneIndex: zone - 1 }];
        }
        return allowedPositions;
    } else {
        let allowedPositions: IFigurePosition[] = [];
        const allowedPositionZone = Object.values(deskInfo)[line - 1][zone];
        if (allowedPositionZone.value === null) {
            allowedPositions = [...allowedPositions, { lineIndex: line - 1, zoneIndex: zone }];
        }
        if ( 
            isSquareZoneNotClear(deskInfo, line - 1, zone - 1) &&
            isSquareZoneFigureNotCurrentPlayer(deskInfo, line - 1, zone - 1, currentPlayer)
        ) {
            allowedPositions = [...allowedPositions, { lineIndex: line - 1, zoneIndex: zone - 1 }];
        }
        if ( 
            isSquareZoneNotClear(deskInfo, line - 1, zone + 1) &&
            isSquareZoneFigureNotCurrentPlayer(deskInfo, line - 1, zone + 1, currentPlayer)
        ) {
            allowedPositions = [...allowedPositions, { lineIndex: line - 1, zoneIndex: zone + 1 }];
        }
        return allowedPositions;
    }
};

export const detectAllowedZonesForRook = (
    line: number, 
    zone: number,
    currentPlayer: string, 
    deskInfo: IDeskInfo,
    currentCheck: string | null
) => {
    if (currentPlayer === 'white' || currentPlayer === 'green') {
        let allowedPositions: IFigurePosition[] = [];
        for (let i = line + 1; i <= 7; i++) {
            if (isSquareZoneClear(deskInfo, i, zone)) {
                allowedPositions = [...allowedPositions, { lineIndex: i, zoneIndex: zone }];
            } else {
                if (isSquareZoneFigureNotCurrentPlayer(deskInfo, i, zone, currentPlayer)) {
                    allowedPositions = [...allowedPositions, { lineIndex: i, zoneIndex: zone }];
                    break;
                }
                break;
            }
        }
        for (let k = line - 1; k >= 0; k--) {
            if (isSquareZoneClear(deskInfo, k, zone)) {
                allowedPositions = [...allowedPositions, { lineIndex: k, zoneIndex: zone }];
            } else {
                if (isSquareZoneFigureNotCurrentPlayer(deskInfo, k, zone, currentPlayer)) {
                    allowedPositions = [...allowedPositions, { lineIndex: k, zoneIndex: zone }];
                    break;
                }
                break;
            }
        } 
        for (let j = zone - 1; j >= 0; j--) {
            if (isSquareZoneClear(deskInfo, line, j)) {
                allowedPositions = [...allowedPositions, { lineIndex: line, zoneIndex: j }];
            } else {
                if (isSquareZoneFigureNotCurrentPlayer(deskInfo, line, j, currentPlayer)) {
                    allowedPositions = [...allowedPositions, { lineIndex: line, zoneIndex: j }];
                    break;
                }
                break;
            }
        }
        for (let l = zone + 1; l <= 7; l++) {
            if (isSquareZoneClear(deskInfo, line, l)) {
                allowedPositions = [...allowedPositions, { lineIndex: line, zoneIndex: l }];
            } else {
                if (isSquareZoneFigureNotCurrentPlayer(deskInfo, line, l, currentPlayer)) {
                    allowedPositions = [...allowedPositions, { lineIndex: line, zoneIndex: l }];
                    break;
                }
                break;
            }
        }     
        return allowedPositions;
    } else {
        let allowedPositions: IFigurePosition[] = [];
        return allowedPositions;
    }
};

export const detectAllowedZonesForBishop = (
    line: number, 
    zone: number, 
    currentPlayer: string, 
    deskInfo: IDeskInfo,
    currentCheck: string | null
) => {
    let allowedPositions: IFigurePosition[] = [];
    // для белых и черных одинаковая диагональ
    for (let i = 1; i < 7; i++) {
        let newLine = line + i;
        let newZone = zone + i;
        if (isSquareZoneClear(deskInfo, newLine, newZone)) {
            allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
        } else {
            if (isSquareZoneFigureNotCurrentPlayer(deskInfo, newLine, newZone, currentPlayer)) {
                allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
                break;
            }
            break;
        }
    }
    // для белых и черных одинаковая диагональ
    for (let k = 1; k < 7; k++) {
        let newLine = line - k;
        let newZone = zone - k;
        if (newLine < 0 || newZone < 0) {
            break;
        }
        if (isSquareZoneClear(deskInfo, newLine, newZone)) {
            allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
        } else {
            if (isSquareZoneFigureNotCurrentPlayer(deskInfo, newLine, newZone, currentPlayer)) {
                allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
                break;
            }
            break;
        }
    }
    for (let l = 1; l < 7; l++) {
        let newLine = line + l;
        let newZone = zone - l;
        if (newZone < 0) {
            break;
        }
        if (isSquareZoneClear(deskInfo, newLine, newZone)) {
            allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
        } else {
            if (isSquareZoneFigureNotCurrentPlayer(deskInfo, newLine, newZone, currentPlayer)) {
                allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
                break;
            }
            break;
        }
    }
    for (let k = 1; k < 7; k++) {
        let newLine = line - k;
        let newZone = zone + k;
        if (newLine < 0) {
            break;
        }
        if (isSquareZoneClear(deskInfo, newLine, newZone)) {
            allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
        } else {
            if (isSquareZoneFigureNotCurrentPlayer(deskInfo, newLine, newZone, currentPlayer)) {
                allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
                break;
            }
            break;
        }
    }
    return allowedPositions;
};

export const detectAllowedZonesForKing = (
    line: number, 
    zone: number, 
    currentPlayer: string, 
    deskInfo: IDeskInfo,
    currentCheck: string | null
) => {
    let allowedPositions: IFigurePosition[] = [];

    const possiblePositions = [
        { line: line + 1, zone: zone + 1 },
        { line: line + 1, zone: zone - 1 },
        { line: line - 1, zone: zone + 1 },
        { line: line - 1, zone: zone - 1 },
        { line: line, zone: zone + 1 },
        { line: line, zone: zone - 1 },
        { line: line + 1, zone: zone },
        { line: line - 1, zone: zone }
    ];
    possiblePositions.map(position => {
        if (isSquareZoneClear(deskInfo, position.line, position.zone)) {
            allowedPositions = [...allowedPositions, { lineIndex: position.line, zoneIndex: position.zone }];
        } else {
            if (isSquareZoneFigureNotCurrentPlayer(deskInfo, position.line, position.zone, currentPlayer)) {
                allowedPositions = [...allowedPositions, { lineIndex: position.line, zoneIndex: position.zone }];
            }
        }
    });
    return allowedPositions;
};

export const detectAllowedZonesForKnight = (
    line: number, 
    zone: number, 
    currentPlayer: string, 
    deskInfo: IDeskInfo,
    currentCheck: string | null
) => {
    let allowedPositions: IFigurePosition[] = [];

    const possiblePositions = [
        { line: line + 2, zone: zone + 1 },
        { line: line + 2, zone: zone - 1 },
        { line: line - 2, zone: zone - 1 },
        { line: line - 2, zone: zone + 1 },
        { line: line - 1, zone: zone + 2 },
        { line: line - 1, zone: zone - 2 },
        { line: line + 1, zone: zone - 2 },
        { line: line + 1, zone: zone + 2 },
    ];
    possiblePositions.map(position => {
        if (isSquareZoneClear(deskInfo, position.line, position.zone)) {
            allowedPositions = [...allowedPositions, { lineIndex: position.line, zoneIndex: position.zone }];
        } else {
            if (isSquareZoneFigureNotCurrentPlayer(deskInfo, position.line, position.zone, currentPlayer)) {
                allowedPositions = [...allowedPositions, { lineIndex: position.line, zoneIndex: position.zone }];
            }
        }
    });
    return allowedPositions;
};

export const detectAllowedZonesForQueen = (
    line: number, 
    zone: number, 
    currentPlayer: string, 
    deskInfo: IDeskInfo,
    currentCheck: string | null
) => {
    return [
        ...detectAllowedZonesForBishop(line, zone, currentPlayer, deskInfo, currentCheck),
        ...detectAllowedZonesForRook(line, zone, currentPlayer, deskInfo, currentCheck)
    ];
};

export const findKingOnTheDesk = (color: string, deskInfo: IDeskInfo) => {
    let findedPositionKing = { line: 0, zone: 0 };
    const deskLines = Object.values(deskInfo);
    for (let i = 0; i < deskLines.length; i++) {
        for (let j = 0; j < deskLines[i].length; j++) {
            if (isSquareZoneFigureKing(deskInfo, i, j, color)) {
                findedPositionKing = {
                    line: i,
                    zone: j
                }
                break;
            }
        }
    }
    return findedPositionKing;
};

export const checkingThreatForKingInPosition = (
    line: number, 
    zone: number, 
    currentPlayer: string, 
    deskInfo: IDeskInfo
) => {
    let isCheckExist: boolean = false;

    // проверка шахов по вертикалям и горизонатлям
    for (let i = line + 1; i < 8; i++) {
        const figure: IDeskZone = getFigureInSquareZone(deskInfo, i, zone);
        if (figure.color === currentPlayer) break;
        if (isFigureAreRookOrQueen(figure)) {
            isCheckExist = true;
        }
        if (figure.color !== currentPlayer && figure.value !== null) break;
    }
    for (let k = line - 1; k >= 0; k--) {
        const figure: IDeskZone = getFigureInSquareZone(deskInfo, k, zone);
        if (figure.color === currentPlayer) break;
        if (isFigureAreRookOrQueen(figure)) {
            isCheckExist = true;
        }
        if (figure.color !== currentPlayer && figure.value !== null) break;
    }
    for (let j = zone + 1; j < 8; j++) {
        const figure: IDeskZone = getFigureInSquareZone(deskInfo, line, j);
        if (figure.color === currentPlayer) break;
        if (isFigureAreRookOrQueen(figure)) {
            isCheckExist = true;
        }
        if (figure.color !== currentPlayer && figure.value !== null) break;
    }
    for (let h = zone - 1; h >= 0; h--) {
        const figure: IDeskZone = getFigureInSquareZone(deskInfo, line, h);
        if (figure.color === currentPlayer) break;
        if (isFigureAreRookOrQueen(figure)) {
            isCheckExist = true;
        }
        if (figure.color !== currentPlayer && figure.value !== null) break;
    }
    // проверка шахов по диагоналям
    for (let y = 1; y < 7; y++) {
        let newLine = line + y;
        let newZone = zone + y;
        const figure: IDeskZone = getFigureInSquareZone(deskInfo, newLine, newZone);
        if (!figure) break;
        if (figure.color === currentPlayer) break;
        if (isFigureAreQueenOrBishop(figure)) {
            isCheckExist = true;
        }
        if (figure.color !== currentPlayer && figure.value !== null) break;
    }
    for (let d = 1; d < 7; d++) {
        let newLine = line - d;
        let newZone = zone - d;
        const figure: IDeskZone = getFigureInSquareZone(deskInfo, newLine, newZone);
        if (!figure) break;
        if (figure.color === currentPlayer) break;
        if (isFigureAreQueenOrBishop(figure)) {
            isCheckExist = true;
        }
        if (figure.color !== currentPlayer && figure.value !== null) break;
    }
    for (let c = 1; c < 7; c++) {
        let newLine = line + c;
        let newZone = zone - c;
        const figure: IDeskZone = getFigureInSquareZone(deskInfo, newLine, newZone);
        if (!figure) break;
        if (figure.color === currentPlayer) break;
        if (isFigureAreQueenOrBishop(figure)) {
            isCheckExist = true;
        }
        if (figure.color !== currentPlayer && figure.value !== null) break;
    }
    for (let g = 1; g < 7; g++) {
        let newLine = line - g;
        let newZone = zone + g;
        const figure: IDeskZone = getFigureInSquareZone(deskInfo, newLine, newZone);
        if (!figure) break;
        if (figure.color === currentPlayer) break;
        if (isFigureAreQueenOrBishop(figure)) {
            isCheckExist = true;
        }
        if (figure.color !== currentPlayer && figure.value !== null) break;
    }

    // проверка шахов по траектории коней
    const possiblePositions = [
        { line: line + 2, zone: zone + 1 },
        { line: line + 2, zone: zone - 1 },
        { line: line - 2, zone: zone - 1 },
        { line: line - 2, zone: zone + 1 },
        { line: line - 1, zone: zone + 2 },
        { line: line - 1, zone: zone - 2 },
        { line: line + 1, zone: zone - 2 },
        { line: line + 1, zone: zone + 2 },
    ];
    possiblePositions.map(position => {
        const figure: IDeskZone = getFigureInSquareZone(deskInfo, position.line, position.zone);
        if (!figure) return;
        if (figure.color === currentPlayer) return;
        if (figure.value === Figure.knight) {
            isCheckExist = true;
        }
    });

    // проверка пешечных шахов
    let firstFigure: IDeskZone;
    let secondFigure: IDeskZone
    if (currentPlayer === 'green') {
        firstFigure = getFigureInSquareZone(deskInfo, line - 1, zone + 1);
        secondFigure = getFigureInSquareZone(deskInfo, line - 1, zone - 1);
    } else {
        firstFigure = getFigureInSquareZone(deskInfo, line + 1, zone + 1);
        secondFigure = getFigureInSquareZone(deskInfo, line + 1, zone - 1);
    }
    if (firstFigure) {
        if (firstFigure.color !== currentPlayer) {
            if (firstFigure.value === Figure.pawn) {
                isCheckExist = true;
            }
        };
    }
    if (secondFigure) {
        if (firstFigure.color !== currentPlayer) {
            if (firstFigure.value === Figure.pawn) {
                isCheckExist = true;
            }
        };
    }
    return isCheckExist;
}