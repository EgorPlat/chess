import { GiChessBishop, GiChessKing, GiChessKnight, GiChessPawn, GiChessQueen, GiChessRook } from "react-icons/gi";
import { Figure } from "../../../interfaces";
import './index.scss';

export default function ChessFigure(props: {
    figureName: Figure | null,
    figureColor: string,
    onClick: () => void
}) {
    switch (props.figureName) {
        case Figure.pawn: {
            return <GiChessPawn color={props.figureColor} className="figure" onClick={props.onClick} />;
        }
        case Figure.rook: {
            return <GiChessRook color={props.figureColor} className="figure" onClick={props.onClick} />;
        }
        case Figure.bishop: {
            return <GiChessBishop color={props.figureColor} className="figure" onClick={props.onClick} />;
        }
        case Figure.king: {
            return <GiChessKing color={props.figureColor} className="figure" onClick={props.onClick} />;
        }
        case Figure.knight: {
            return <GiChessKnight color={props.figureColor} className="figure" onClick={props.onClick} />;
        }
        case Figure.queen: {
            return <GiChessQueen color={props.figureColor} className="figure" onClick={props.onClick} />;
        }
        default: {
            return null;
        }
    }
}