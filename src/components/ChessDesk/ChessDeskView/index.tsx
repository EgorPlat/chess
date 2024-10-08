import { IDeskInfo, IDeskZone, IFigurePosition } from '../../../interfaces';
import ChessFigure from '../ChessFigureView';
import { FaCircle } from "react-icons/fa6";
import './index.scss';
import React from 'react';

interface IChessDeskViewProps {
    currentPlayer: string,
    deskInfo: IDeskInfo,
    currentCheck: string | null,
    positionsOfCurrentCheck: IFigurePosition[],
    handleDetectColor: (lineIndex: number, zoneIndex: number) => { color: string, allowed: boolean },
    handleSetNewPosition: (lineIndex: number, zoneIndex: number) => void,
    handleClickFigure: (figure: IDeskZone, lineIndex: number, zoneIndex: number) => void
};

export default function ChessDeskView({
    currentPlayer,
    deskInfo,
    handleDetectColor,
    handleSetNewPosition,
    handleClickFigure,
    currentCheck,
    positionsOfCurrentCheck
}: IChessDeskViewProps) {

    return (
        <div className="desk">
            <div className='infoBlock'>Текущий ход: {currentPlayer}</div>
            <div className='infoBlock'>Текущий шах объявлен к: {currentCheck}</div>
            <div className='checkPositions'>
                Позиции шаха: 
                {
                    positionsOfCurrentCheck.map(el => (
                        <div key={Math.random()} className='eachPosition'>{`${el.lineIndex}-${el.zoneIndex}`}</div>
                    ))
                }
            </div>
            {
                Object.keys(deskInfo).map((el: string, lineIndex: number) => {
                    return (
                        <div className="line" key={el}>
                            {
                                Object.values(deskInfo)[lineIndex].map((zoneContent: IDeskZone, zoneIndex: number) => {
                                    const result = handleDetectColor(lineIndex, zoneIndex);
                                    return (
                                        <div 
                                            className="zone" 
                                            key={String(el + zoneIndex)}
                                            style={{ backgroundColor: result.color }}
                                            onClick={() => handleSetNewPosition(lineIndex, zoneIndex)}
                                        >
                                            <div className="figure">
                                                {
                                                    <ChessFigure
                                                        onClick={() => handleClickFigure(zoneContent, lineIndex, zoneIndex)}
                                                        figureName={zoneContent.value}
                                                        figureColor={zoneContent.color}
                                                    />
                                                }
                                                {
                                                    result.allowed && 
                                                    <FaCircle 
                                                        className='allowedDot' 
                                                        color='lightgreen' 
                                                        fontSize={25} 
                                                    />
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}