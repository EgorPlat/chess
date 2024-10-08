import { useDispatch, useSelector } from "react-redux"
import { IRootStore } from "../../interfaces/slices";
import { Figure, IActiveFigure, IChecksInfo, IDeskInfo, IDeskZone, IFigurePosition } from "../../interfaces";
import { useEffect, useState } from "react";
import { addRecordToHistory, changeFigurePosition, setCheckForPlayer, setFigureForSwap, setNewPositionForPawnWithSwap, setPositionsOfCurrentCheck } from "../../store/slices/mainSlice";
import { 
    detectAllowedZonesForPawn, 
    detectAllowedZonesForRook, 
    detectAllowedZonesForBishop, 
    detectAllowedZonesForQueen, 
    detectAllowedZonesForKing, 
    detectAllowedZonesForKnight, 
    findKingOnTheDesk, 
    checkingThreatForKingInPosition, 
    checkIsPawnEnableToSwap
} from "../../helpers";
import ChessDeskView from "./ChessDeskView";
import ChessSwapPawn from "../ChessSwapPawn";

export default function ChessDesk() {

    const deskInfo: IDeskInfo = useSelector((store: IRootStore) => store.rootReducer.main.deskInfo);
    const currentCheck: string | null = useSelector((store: IRootStore) => store.rootReducer.main.currentCheck);
    const positionsOfCurrentCheck: IChecksInfo[] = useSelector((store: IRootStore) => store.rootReducer.main.positionsOfCurrentCheck);
    const figureForSwap: number | null = useSelector((store: IRootStore) => store.rootReducer.main.figureForSwap);

    const [activeFigure, setActiveFigure] = useState<IActiveFigure | null>(null);
    const [newPosition, setNewPosition] = useState<IFigurePosition | null>(null);
    const [currentPlayer, setCurentPlayer] = useState<string>('white');
    const [allowedPositionForFigure, setAllowedPositionForFigure] = useState<IFigurePosition[]>([]);
    const [isPawnEnableToSwap, setIsPawnEnableToSwap] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleDetectIsNewPositionInAllowed = (lineIndex: number, zoneIndex: number) => {
        let isInAllowed = false;
        allowedPositionForFigure.map(allowedPosition => {
            if (allowedPosition.lineIndex === lineIndex && allowedPosition.zoneIndex === zoneIndex) {
                isInAllowed = true;
            }
        });
        return isInAllowed;
    };

    const handleDetectAllowedPositionsForFigure = () => {
        if (!activeFigure) return;
        const props = {
            line: activeFigure.position.lineIndex, 
            zone: activeFigure.position.zoneIndex,
        }
        if (activeFigure.figure.value === 0) {
            setAllowedPositionForFigure(
                detectAllowedZonesForPawn(props.line, props.zone, currentPlayer, deskInfo, currentCheck, positionsOfCurrentCheck, activeFigure)
            )
        }
        if (activeFigure.figure.value === 1) {
            setAllowedPositionForFigure(
                detectAllowedZonesForRook(props.line, props.zone, currentPlayer, deskInfo, currentCheck, positionsOfCurrentCheck, activeFigure)
            )
        }
        if (activeFigure.figure.value === 2) {
            setAllowedPositionForFigure(
                detectAllowedZonesForBishop(props.line, props.zone, currentPlayer, deskInfo, currentCheck, positionsOfCurrentCheck, activeFigure)
            )
        }
        if (activeFigure.figure.value === 3) {
            setAllowedPositionForFigure(
                detectAllowedZonesForQueen(props.line, props.zone, currentPlayer, deskInfo, currentCheck, positionsOfCurrentCheck, activeFigure)
            )
        }
        if (activeFigure.figure.value === 4) {
            setAllowedPositionForFigure(
                detectAllowedZonesForKing(props.line, props.zone, currentPlayer, deskInfo, currentCheck, positionsOfCurrentCheck, activeFigure)
            )
        }
        if (activeFigure.figure.value === 5) {
            setAllowedPositionForFigure(
                detectAllowedZonesForKnight(props.line, props.zone, currentPlayer, deskInfo, currentCheck, positionsOfCurrentCheck, activeFigure)
            )
        }
    };

    const swapCurrentPlayer = () => {
        if (currentPlayer === 'green') {
            setCurentPlayer('white');
        } else {
            setCurentPlayer('green');
        }
    };

    const handleDetectColor = (lineIndex: number, zoneIndex: number) => {
        let result = { color: "", allowed: false };
        const sum = lineIndex + zoneIndex;
        if (sum % 2 === 0) {
            result = { ...result, color: "black" };
        } else {
            result = { ...result, color: "#a88132" };
        }
        allowedPositionForFigure.map(position => {
            if (position.lineIndex === lineIndex && zoneIndex === position.zoneIndex) {
                result = { ...result, allowed: true };
            }
        })
        return result;
    };

    const handleClickFigure = (figure: IDeskZone, lineIndex: number, zoneIndex: number) => {
        if (figure?.color === currentPlayer) {
            setAllowedPositionForFigure([]);
            setActiveFigure({
                figure,
                position: { lineIndex, zoneIndex }
            });
        }
    };

    const handleSetNewPosition = (lineIndex: number, zoneIndex: number) => {
        const newPositionZone = Object.values(deskInfo)[lineIndex][zoneIndex];
        if (
            lineIndex === activeFigure?.position.lineIndex && 
            zoneIndex === activeFigure?.position.zoneIndex
        ) return;

        if (
            activeFigure && 
            activeFigure?.figure.color === currentPlayer && 
            handleDetectIsNewPositionInAllowed(lineIndex, zoneIndex
        )) {
            if (newPositionZone.color !== activeFigure.figure.color) {
                setNewPosition({ lineIndex, zoneIndex });
            }
        }
    };

    const handleChooseFigure = (id: number) => {
        dispatch(setFigureForSwap(id));
        setIsPawnEnableToSwap(false);
    };

    useEffect(() => {
        if (activeFigure && newPosition && figureForSwap) {
            dispatch(setNewPositionForPawnWithSwap({ previousPosition: activeFigure.position, newPosition, currentPlayer }));
            dispatch(setFigureForSwap(null));
            dispatch(addRecordToHistory({ figureColor: currentPlayer, activeFigure, newPosition }));
            setAllowedPositionForFigure([]);
            setActiveFigure(null);
            setNewPosition(null);
            swapCurrentPlayer();
        }
    }, [activeFigure, newPosition, figureForSwap]);

    useEffect(() => {
        if (activeFigure) {
            handleDetectAllowedPositionsForFigure();
        }
        if (activeFigure && newPosition) {
            if (
                activeFigure.figure.value === Figure.pawn && 
                checkIsPawnEnableToSwap(newPosition.lineIndex, newPosition.zoneIndex, currentPlayer, deskInfo)
            ) { 
                setIsPawnEnableToSwap(true);
            }
            else {
                dispatch(changeFigurePosition({ activeFigure, newPosition }));
                dispatch(addRecordToHistory({ figureColor: currentPlayer, activeFigure, newPosition }));
                setAllowedPositionForFigure([]);
                setActiveFigure(null);
                setNewPosition(null);
                swapCurrentPlayer();
            }
        }
    }, [activeFigure, newPosition]);

    useEffect(() => {
        const currentKing = findKingOnTheDesk(currentPlayer, deskInfo);
        const checksPositions = checkingThreatForKingInPosition(currentKing.line, currentKing.zone, currentPlayer, deskInfo);
        if (checksPositions.length !== 0) {
            dispatch(setCheckForPlayer({ color: currentPlayer }));
            dispatch(setPositionsOfCurrentCheck({ positions: checksPositions }));
        } else {
            dispatch(setPositionsOfCurrentCheck({ positions: [] }));
            dispatch(setCheckForPlayer({ color: null }));
        }
    }, [currentPlayer]);

    return (
        <>
            <ChessDeskView 
                handleDetectColor={handleDetectColor}
                handleClickFigure={handleClickFigure}
                handleSetNewPosition={handleSetNewPosition}
                deskInfo={deskInfo}
                currentPlayer={currentPlayer}
                currentCheck={currentCheck}
                positionsOfCurrentCheck={positionsOfCurrentCheck}
            />
            {
                isPawnEnableToSwap && <ChessSwapPawn handleChooseFigure={handleChooseFigure} />
            }
        </>
    )
}