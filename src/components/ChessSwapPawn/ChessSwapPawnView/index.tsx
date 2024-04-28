import { GiChessBishop, GiChessKnight, GiChessQueen, GiChessRook } from 'react-icons/gi';
import './index.scss';
import { Figure } from '../../../interfaces';

export default function ChessSwapPawnView({ 
    handleChooseFigure
}: {
    handleChooseFigure: (id: number) => void
}) {
    return (
        <div className="chessSwapPawnWrapper">
            <div className="chessSwapPawnMenu">
                <div className="title">Выберите в какую фигуру превратиться</div>
                <div className="figures">
                    <GiChessRook className="figure" onClick={() => handleChooseFigure(Figure.rook)} />
                    <GiChessBishop className="figure"onClick={() => handleChooseFigure(Figure.bishop)} />
                    <GiChessKnight className="figure"onClick={() => handleChooseFigure(Figure.knight)} />
                    <GiChessQueen className="figure"onClick={() => handleChooseFigure(Figure.queen)} />
                </div>
            </div>  
        </div>
    )
}