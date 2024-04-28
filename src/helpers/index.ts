import { Figure, IActiveFigure, IChecksInfo, IDeskInfo, IDeskZone, IFigurePosition } from "../interfaces";

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

export const checkIsFigureCanMoveWithoutCheck = (
    currentDeskInfo: IDeskInfo, 
    activeFigure: IActiveFigure, 
    newPosition: IFigurePosition,
    currentPlayer: string
) => {
    const newDeskInfo: IDeskInfo = JSON.parse(JSON.stringify(currentDeskInfo));

    Object.values(newDeskInfo)[activeFigure.position.lineIndex][activeFigure.position.zoneIndex] 
          = { color: "", value: null, isBlocked: false };
    Object.values(newDeskInfo)[newPosition.lineIndex][newPosition.zoneIndex] = activeFigure.figure;

    const kingPosition = findKingOnTheDesk(currentPlayer, newDeskInfo);
    const checkPositions = checkingThreatForKingInPosition(kingPosition.line, kingPosition.zone, currentPlayer, newDeskInfo);
    if (checkPositions.length === 0) {
        return true;
    } else {
        return false;
    }
};

export const checkNewFigurePositionCanSaveKingFromCheck = (
    checkPositions: IChecksInfo[],
    lineIndex: number,
    zoneIndex: number
) => {   
    let groupedCheckPositionsByFigure: Partial<Record<string, IChecksInfo[]>> = {}
    checkPositions.map(el => {
        groupedCheckPositionsByFigure[el.figure] = [...groupedCheckPositionsByFigure[el.figure] || [], el];
    });
        
    if (Object.keys(groupedCheckPositionsByFigure).length > 1) return false;
    let isSave = false;

    checkPositions.map((el: IFigurePosition) => {
        if (el.lineIndex === lineIndex && zoneIndex === el.zoneIndex) {
            isSave = true;
        }
    });
    if (Object.keys(groupedCheckPositionsByFigure).length === 0) return true;
    return isSave;
};

export const checkIsKingCanMoveToSquare = (
    deskInfo: IDeskInfo,
    checkPositions: IChecksInfo[],
    lineIndex: number,
    zoneIndex: number
) => {
    let isMove = true;
    checkPositions.map(el => {
        if (el.lineIndex === lineIndex && zoneIndex === el.zoneIndex) {
            if (Object.values(deskInfo)[lineIndex][zoneIndex].value !== null) {
                isMove = true;
            } else {
                isMove = false;
            }
        }
    });
    return isMove;
};

export const checkIsPawnEnableToSwap = (line: number, zone: number, currentPlayer: string, deskInfo: IDeskInfo) => {
    if (currentPlayer === 'white' && line === 7) return true;
    if (currentPlayer === 'green' && line === 0) return true;
    return false;
};

export const detectAllowedZonesForPawn = (
    line: number, 
    zone: number, 
    currentPlayer: string, 
    deskInfo: IDeskInfo,
    currentCheck: string | null,
    checkPositions: IChecksInfo[],
    activeFigure: IActiveFigure,
) => {
    if (currentPlayer === 'white') {
        let allowedPositions: IFigurePosition[] = [];
        const allowedPositionZone = Object.values(deskInfo)[line + 1][zone]; 
        if (
            allowedPositionZone.value === null &&
            checkNewFigurePositionCanSaveKingFromCheck(checkPositions, line + 1, zone) &&
            checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: line + 1, zoneIndex: zone }, currentPlayer)
        ) {
            allowedPositions = [...allowedPositions, { lineIndex: line + 1, zoneIndex: zone }];
        }
        if (
            isSquareZoneNotClear(deskInfo, line + 1, zone + 1) &&
            isSquareZoneFigureNotCurrentPlayer(deskInfo, line + 1, zone + 1, currentPlayer) &&
            checkNewFigurePositionCanSaveKingFromCheck(checkPositions, line + 1, zone + 1) &&
            checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: line + 1, zoneIndex: zone + 1 }, currentPlayer)
        ) {
            allowedPositions = [...allowedPositions, { lineIndex: line + 1, zoneIndex: zone + 1 }];
        }
        if (
            isSquareZoneNotClear(deskInfo, line + 1, zone - 1) &&
            isSquareZoneFigureNotCurrentPlayer(deskInfo, line + 1, zone - 1, currentPlayer) &&
            checkNewFigurePositionCanSaveKingFromCheck(checkPositions, line + 1, zone - 1) &&
            checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: line + 1, zoneIndex: zone - 1 }, currentPlayer)
        ) {
            allowedPositions = [...allowedPositions, { lineIndex: line + 1, zoneIndex: zone - 1 }];
        }
        return allowedPositions;
    } else {
        let allowedPositions: IFigurePosition[] = [];
        const allowedPositionZone = Object.values(deskInfo)[line - 1][zone];
        if (
            allowedPositionZone.value === null && 
            checkNewFigurePositionCanSaveKingFromCheck(checkPositions, line - 1, zone) &&
            checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: line - 1, zoneIndex: zone }, currentPlayer)
        ) {
            allowedPositions = [...allowedPositions, { lineIndex: line - 1, zoneIndex: zone }];
        }
        if ( 
            isSquareZoneNotClear(deskInfo, line - 1, zone - 1) &&
            isSquareZoneFigureNotCurrentPlayer(deskInfo, line - 1, zone - 1, currentPlayer) &&
            checkNewFigurePositionCanSaveKingFromCheck(checkPositions, line - 1, zone - 1) &&
            checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: line - 1, zoneIndex: zone - 1 }, currentPlayer)
        ) {
            allowedPositions = [...allowedPositions, { lineIndex: line - 1, zoneIndex: zone - 1 }];
        }
        if ( 
            isSquareZoneNotClear(deskInfo, line - 1, zone + 1) &&
            isSquareZoneFigureNotCurrentPlayer(deskInfo, line - 1, zone + 1, currentPlayer) &&
            checkNewFigurePositionCanSaveKingFromCheck(checkPositions, line - 1, zone + 1) &&
            checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: line - 1, zoneIndex: zone + 1 }, currentPlayer)
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
    currentCheck: string | null,
    checkPositions: IChecksInfo[],
    activeFigure: IActiveFigure,
) => {
    if (currentPlayer === 'white' || currentPlayer === 'green') {
        let allowedPositions: IFigurePosition[] = [];
        for (let i = line + 1; i <= 7; i++) {
            if (!isSquareZoneFigureNotCurrentPlayer(deskInfo, i, zone, currentPlayer)) {
                break;
            }
            if (
                isSquareZoneClear(deskInfo, i, zone) &&
                checkNewFigurePositionCanSaveKingFromCheck(checkPositions, i, zone) &&
                checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: i, zoneIndex: zone }, currentPlayer)
            ) {
                allowedPositions = [...allowedPositions, { lineIndex: i, zoneIndex: zone }];
            } else {
                if (
                    isSquareZoneFigureNotCurrentPlayer(deskInfo, i, zone, currentPlayer) &&
                    checkNewFigurePositionCanSaveKingFromCheck(checkPositions, i, zone) &&
                    checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: i, zoneIndex: zone }, currentPlayer)
                ) {
                    allowedPositions = [...allowedPositions, { lineIndex: i, zoneIndex: zone }];
                    if (currentCheck === null) break;
                }
            }
        }
        for (let k = line - 1; k >= 0; k--) {
            if (!isSquareZoneFigureNotCurrentPlayer(deskInfo, k, zone, currentPlayer)) {
                break;
            }
            if (
                isSquareZoneClear(deskInfo, k, zone) &&
                checkNewFigurePositionCanSaveKingFromCheck(checkPositions, k, zone) &&
                checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: k, zoneIndex: zone }, currentPlayer)
            ) {
                allowedPositions = [...allowedPositions, { lineIndex: k, zoneIndex: zone }];
            } else {
                if (
                    isSquareZoneFigureNotCurrentPlayer(deskInfo, k, zone, currentPlayer) &&
                    checkNewFigurePositionCanSaveKingFromCheck(checkPositions, k, zone) &&
                    checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: k, zoneIndex: zone }, currentPlayer)
                ) {
                    allowedPositions = [...allowedPositions, { lineIndex: k, zoneIndex: zone }];
                    if (currentCheck === null) break;
                }
            }
        } 
        for (let j = zone - 1; j >= 0; j--) {
            if (!isSquareZoneFigureNotCurrentPlayer(deskInfo, line, j, currentPlayer)) {
                break;
            }
            if (
                isSquareZoneClear(deskInfo, line, j) &&
                checkNewFigurePositionCanSaveKingFromCheck(checkPositions, line, j) &&
                checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: line, zoneIndex: j }, currentPlayer)
            ) {
                allowedPositions = [...allowedPositions, { lineIndex: line, zoneIndex: j }];
            } else {
                if (
                    isSquareZoneFigureNotCurrentPlayer(deskInfo, line, j, currentPlayer) &&
                    checkNewFigurePositionCanSaveKingFromCheck(checkPositions, line, j) &&
                    checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: line, zoneIndex: j }, currentPlayer)
                ) {
                    allowedPositions = [...allowedPositions, { lineIndex: line, zoneIndex: j }];
                    if (currentCheck === null) break;
                }
            }
        }
        for (let l = zone + 1; l <= 7; l++) {
            if (!isSquareZoneFigureNotCurrentPlayer(deskInfo, line, l, currentPlayer)) {
                break;
            }
            if (
                isSquareZoneClear(deskInfo, line, l) &&
                checkNewFigurePositionCanSaveKingFromCheck(checkPositions, line, l) &&
                checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: line, zoneIndex: l }, currentPlayer)
            ) {
                allowedPositions = [...allowedPositions, { lineIndex: line, zoneIndex: l }];
            } else {
                if (
                    isSquareZoneFigureNotCurrentPlayer(deskInfo, line, l, currentPlayer) &&
                    checkNewFigurePositionCanSaveKingFromCheck(checkPositions, line, l) &&
                    checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: line, zoneIndex: l }, currentPlayer)
                ) {
                    allowedPositions = [...allowedPositions, { lineIndex: line, zoneIndex: l }];
                    if (currentCheck === null) break
                }
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
    currentCheck: string | null,
    checkPositions: IChecksInfo[],
    activeFigure: IActiveFigure,
) => {
    let allowedPositions: IFigurePosition[] = [];
    // для белых и черных одинаковая диагональ
    for (let i = 1; i < 7; i++) {
        let newLine = line + i;
        let newZone = zone + i;
        if (!isSquareZoneFigureNotCurrentPlayer(deskInfo, newLine, newZone, currentPlayer)) {
            break;
        }
        if (
            isSquareZoneClear(deskInfo, newLine, newZone) && 
            checkNewFigurePositionCanSaveKingFromCheck(checkPositions, newLine, newZone) &&
            checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: newLine, zoneIndex: newZone }, currentPlayer)
        ) {
            allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
        } else {
            if (
                isSquareZoneFigureNotCurrentPlayer(deskInfo, newLine, newZone, currentPlayer) &&
                checkNewFigurePositionCanSaveKingFromCheck(checkPositions, newLine, newZone) &&
                checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: newLine, zoneIndex: newZone }, currentPlayer)
            ) {
                allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
                if (currentCheck === null) {
                    break;
                }
            }
        }
    }
    // для белых и черных одинаковая диагональ
    for (let k = 1; k < 7; k++) {
        let newLine = line - k;
        let newZone = zone - k;
        if (newLine < 0 || newZone < 0) {
            break;
        }
        if (!isSquareZoneFigureNotCurrentPlayer(deskInfo, newLine, newZone, currentPlayer)) {
            break;
        }
        if (
            isSquareZoneClear(deskInfo, newLine, newZone) &&
            checkNewFigurePositionCanSaveKingFromCheck(checkPositions, newLine, newZone) &&
            checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: newLine, zoneIndex: newZone }, currentPlayer)
        ) {
            allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
        } else {
            if (
                isSquareZoneFigureNotCurrentPlayer(deskInfo, newLine, newZone, currentPlayer) &&
                checkNewFigurePositionCanSaveKingFromCheck(checkPositions, newLine, newZone) &&
                checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: newLine, zoneIndex: newZone }, currentPlayer)
            ) {
                allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
                if (currentCheck === null) {
                    break;
                }
            }
        }
    }
    for (let l = 1; l < 7; l++) {
        let newLine = line + l;
        let newZone = zone - l;
        if (newZone < 0) {
            break;
        }
        if (!isSquareZoneFigureNotCurrentPlayer(deskInfo, newLine, newZone, currentPlayer)) {
            break;
        }
        if (
            isSquareZoneClear(deskInfo, newLine, newZone) &&
            checkNewFigurePositionCanSaveKingFromCheck(checkPositions, newLine, newZone) &&
            checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: newLine, zoneIndex: newZone }, currentPlayer)
        ) {
            allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
        } else {
            if (
                isSquareZoneFigureNotCurrentPlayer(deskInfo, newLine, newZone, currentPlayer) &&
                checkNewFigurePositionCanSaveKingFromCheck(checkPositions, newLine, newZone) &&
                checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: newLine, zoneIndex: newZone }, currentPlayer)
            ) {
                allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
                if (currentCheck === null) {
                    break;
                }
            }
        }
    }
    for (let k = 1; k < 7; k++) {
        let newLine = line - k;
        let newZone = zone + k;
        if (newLine < 0) {
            break;
        }
        if (!isSquareZoneFigureNotCurrentPlayer(deskInfo, newLine, newZone, currentPlayer)) {
            break;
        }
        if (
            isSquareZoneClear(deskInfo, newLine, newZone) &&
            checkNewFigurePositionCanSaveKingFromCheck(checkPositions, newLine, newZone) &&
            checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: newLine, zoneIndex: newZone }, currentPlayer)
        ) {
            allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
        } else {
            if (
                isSquareZoneFigureNotCurrentPlayer(deskInfo, newLine, newZone, currentPlayer) &&
                checkNewFigurePositionCanSaveKingFromCheck(checkPositions, newLine, newZone) &&
                checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: newLine, zoneIndex: newZone }, currentPlayer)
            ) {
                allowedPositions = [...allowedPositions, { lineIndex: newLine, zoneIndex: newZone }];
                if (currentCheck === null) {
                    break;
                }
            }
        }
    }
    return allowedPositions;
};

export const detectAllowedZonesForKing = (
    line: number, 
    zone: number, 
    currentPlayer: string, 
    deskInfo: IDeskInfo,
    currentCheck: string | null,
    checkPositions: IChecksInfo[],
    activeFigure: IActiveFigure,
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
        if (
            isSquareZoneClear(deskInfo, position.line, position.zone) &&
            checkIsKingCanMoveToSquare(deskInfo, checkPositions, position.line, position.zone) &&
            checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: position.line, zoneIndex: position.zone }, currentPlayer)
        ) {
            allowedPositions = [...allowedPositions, { lineIndex: position.line, zoneIndex: position.zone }];
        } else {
            if (
                isSquareZoneFigureNotCurrentPlayer(deskInfo, position.line, position.zone, currentPlayer) &&
                checkIsKingCanMoveToSquare(deskInfo, checkPositions, position.line, position.zone) &&
                checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: position.line, zoneIndex: position.zone }, currentPlayer)
            ) {
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
    currentCheck: string | null,
    checkPositions: IChecksInfo[],
    activeFigure: IActiveFigure,
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
        if (
            isSquareZoneClear(deskInfo, position.line, position.zone) &&
            checkNewFigurePositionCanSaveKingFromCheck(checkPositions, position.line, position.zone) &&
            checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: position.line, zoneIndex: position.zone }, currentPlayer)
        ) {
            allowedPositions = [...allowedPositions, { lineIndex: position.line, zoneIndex: position.zone }];
        } else {
            if (
                isSquareZoneFigureNotCurrentPlayer(deskInfo, position.line, position.zone, currentPlayer) &&
                checkNewFigurePositionCanSaveKingFromCheck(checkPositions, position.line, position.zone) &&
                checkIsFigureCanMoveWithoutCheck(deskInfo, activeFigure, { lineIndex: position.line, zoneIndex: position.zone }, currentPlayer)
            ) {
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
    currentCheck: string | null,
    checkPositions: IChecksInfo[],
    activeFigure: IActiveFigure,
) => {
    return [
        ...detectAllowedZonesForBishop(line, zone, currentPlayer, deskInfo, currentCheck, checkPositions, activeFigure),
        ...detectAllowedZonesForRook(line, zone, currentPlayer, deskInfo, currentCheck, checkPositions, activeFigure)
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
    line: number, // позиция короля по вертикали
    zone: number, // позиция короля по горизонтали
    currentPlayer: string, 
    deskInfo: IDeskInfo
) => {
    let checkPositions: IChecksInfo[] = [];

    // проверка шахов по вертикалям и горизонатлям
    for (let i = line + 1; i < 8; i++) {
        const figure: IDeskZone = getFigureInSquareZone(deskInfo, i, zone);
        if (figure.color === currentPlayer) break;
        if (isFigureAreRookOrQueen(figure)) {
            for (let ni = i; ni >= line + 1; ni--) {
                checkPositions = [...checkPositions, { lineIndex: ni, zoneIndex: zone, figure: figure.color+figure.value }];
            } 
        }
        if (figure.color !== currentPlayer && figure.value !== null) break;
    }
    for (let k = line - 1; k >= 0; k--) {
        const figure: IDeskZone = getFigureInSquareZone(deskInfo, k, zone);
        if (figure.color === currentPlayer) break;
        if (isFigureAreRookOrQueen(figure)) {
            for (let nk = k; nk <= line - 1; nk++) {
                checkPositions = [...checkPositions, { lineIndex: nk, zoneIndex: zone, figure: figure.color+figure.value }];
            }
        }
        if (figure.color !== currentPlayer && figure.value !== null) break;
    }
    for (let j = zone + 1; j < 8; j++) {
        const figure: IDeskZone = getFigureInSquareZone(deskInfo, line, j);
        if (figure.color === currentPlayer) break;
        if (isFigureAreRookOrQueen(figure)) {
            for (let nj = j; nj >= zone + 1; nj--) {
                checkPositions = [...checkPositions, { lineIndex: line, zoneIndex: nj, figure: figure.color+figure.value }];
            }
        }
        if (figure.color !== currentPlayer && figure.value !== null) break;
    }
    for (let h = zone - 1; h >= 0; h--) {
        const figure: IDeskZone = getFigureInSquareZone(deskInfo, line, h);
        if (figure.color === currentPlayer) break;
        if (isFigureAreRookOrQueen(figure)) {
            for (let nh = h; nh <= zone - 1; nh++) {
                checkPositions = [...checkPositions, { lineIndex: line, zoneIndex: nh, figure: figure.color+figure.value }];
            }
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
            for (let ny = 1; ny <= y; ny++) {
                checkPositions = [...checkPositions, { lineIndex: line + ny, zoneIndex: zone + ny, figure: figure.color+figure.value }];
            }
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
            for (let nd = 1; nd <= d; nd++) {
                checkPositions = [...checkPositions, { lineIndex: line - nd, zoneIndex: zone - nd, figure: figure.color+figure.value }];
            }
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
            for (let nc = 1; nc <= c; nc++) {
                checkPositions = [...checkPositions, { lineIndex: line - nc, zoneIndex: zone - nc, figure: figure.color+figure.value }];
            }
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
            for (let ng = 1; ng <= g; ng++) {
                checkPositions = [...checkPositions, { lineIndex: line - ng, zoneIndex: zone - ng, figure: figure.color+figure.value }];
            }
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
            checkPositions = [...checkPositions, { lineIndex: line, zoneIndex: zone, figure: figure.color+figure.value }];
            checkPositions = [...checkPositions, { lineIndex: position.line, zoneIndex: position.zone, figure: figure.color+figure.value }];
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
                if (currentPlayer === 'green') {
                    checkPositions = [
                        ...checkPositions, 
                        { lineIndex: line - 1, zoneIndex: zone + 1, figure: firstFigure.color+firstFigure.value }
                    ];
                } else {
                    checkPositions = [
                        ...checkPositions, 
                        { lineIndex: line + 1, zoneIndex: zone + 1, figure: firstFigure.color+firstFigure.value }
                    ];
                }
            }
        };
    }
    if (secondFigure) {
        if (secondFigure.color !== currentPlayer) {
            if (secondFigure.value === Figure.pawn) {
                if (currentPlayer === 'green') {
                    checkPositions = [
                        ...checkPositions, 
                        { lineIndex: line - 1, zoneIndex: zone - 1, figure: secondFigure.color+secondFigure.value }
                    ];
                } else {
                    checkPositions = [
                        ...checkPositions, 
                        { lineIndex: line + 1, zoneIndex: zone - 1, figure: secondFigure.color+secondFigure.value }
                    ];
                }
            }
        };
    }
    return checkPositions;
}