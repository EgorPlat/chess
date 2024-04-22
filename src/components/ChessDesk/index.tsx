import { useDispatch, useSelector } from "react-redux"
import { IRootStore } from "../../interfaces/slices";
import { IActiveFigure, IDeskInfo, IDeskZone, IFigurePosition } from "../../interfaces";
import { useEffect, useState } from "react";
import { changeFigurePosition } from "../../store/slices/mainSlice";
import { detectAllowedZonesForPawn, detectAllowedZonesForRook, detectAllowedZonesForBishop, detectAllowedZonesForQueen } from "../../helpers";
import ChessDeskView from "./ChessDeskView";

export default function ChessDesk() {

    const deskInfo: IDeskInfo = useSelector((store: IRootStore) => store.main.deskInfo);
    const [activeFigure, setActiveFigure] = useState<IActiveFigure | null>(null);
    const [newPosition, setNewPosition] = useState<IFigurePosition | null>(null);
    const [currentPlayer, setCurentPlayer] = useState<string>('white');
    const [allowedPositionForFigure, setAllowedPositionForFigure] = useState<IFigurePosition[]>([]);
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
        if (activeFigure?.figure.value === 0) {
            setAllowedPositionForFigure(
                detectAllowedZonesForPawn(
                    activeFigure.position.lineIndex, 
                    activeFigure.position.zoneIndex,
                    currentPlayer,
                    deskInfo
                )
            )
        }
        if (activeFigure?.figure.value === 1) {
            setAllowedPositionForFigure(
                detectAllowedZonesForRook(
                    activeFigure.position.lineIndex, 
                    activeFigure.position.zoneIndex,
                    currentPlayer,
                    deskInfo
                )
            )
        }
        if (activeFigure?.figure.value === 2) {
            setAllowedPositionForFigure(
                detectAllowedZonesForBishop(
                    activeFigure.position.lineIndex, 
                    activeFigure.position.zoneIndex,
                    currentPlayer,
                    deskInfo
                )
            )
        }
        if (activeFigure?.figure.value === 3) {
            setAllowedPositionForFigure(
                detectAllowedZonesForQueen(
                    activeFigure.position.lineIndex, 
                    activeFigure.position.zoneIndex,
                    currentPlayer,
                    deskInfo
                )
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
        let color = "";
        const sum = lineIndex + zoneIndex;
        if (sum % 2 === 0) {
            color = "black";
        } else {
            color = "#a88132";
        }
        allowedPositionForFigure.map(position => {
            if (position.lineIndex === lineIndex && zoneIndex === position.zoneIndex) {
                color = "lightgreen";
            }
        })
        return color;
    };

    const handleClickFigure = (figure: IDeskZone, lineIndex: number, zoneIndex: number) => {
        if (figure.color === currentPlayer) {
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

    useEffect(() => {
        if (activeFigure) {
            handleDetectAllowedPositionsForFigure();
        }
        if (activeFigure && newPosition) {
            dispatch(changeFigurePosition({ activeFigure, newPosition }));
            setAllowedPositionForFigure([]);
            setActiveFigure(null);
            setNewPosition(null);
            swapCurrentPlayer();
        }
    }, [activeFigure, newPosition]);

    return (
        <ChessDeskView 
            handleDetectColor={handleDetectColor}
            handleClickFigure={handleClickFigure}
            handleSetNewPosition={handleSetNewPosition}
            deskInfo={deskInfo}
            currentPlayer={currentPlayer}
        />
    )
}