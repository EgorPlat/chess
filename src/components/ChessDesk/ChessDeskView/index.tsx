import { Figure, IDeskInfo, IDeskZone, IFigurePosition } from '../../../interfaces';
import ChessFigure from '../ChessFigureView';
import './index.scss';

interface IChessDeskViewProps {
    currentPlayer: string,
    deskInfo: IDeskInfo,
    currentCheck: string | null,
    positionsOfCurrentCheck: IFigurePosition[],
    handleDetectColor: (lineIndex: number, zoneIndex: number) => string,
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
            <div>Текущий ход: {currentPlayer}</div>
            <div>Текущий шах объявлен к: {currentCheck}</div>
            <div>
                Позиции шаха: 
                {
                    positionsOfCurrentCheck.map(el => (
                        <div>{`${el.lineIndex} ${el.zoneIndex}`}</div>
                    ))
                }
            </div>
            {
                Object.keys(deskInfo).map((el: string, lineIndex: number) => {
                    return (
                        <div className="line" key={el}>
                            {
                                Object.values(deskInfo)[lineIndex].map((zoneContent: IDeskZone, zoneIndex: number) => {
                                    const color = handleDetectColor(lineIndex, zoneIndex);
                                    return (
                                        <div 
                                            className="zone" 
                                            key={String(el + zoneIndex)}
                                            style={{ backgroundColor: color }}
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