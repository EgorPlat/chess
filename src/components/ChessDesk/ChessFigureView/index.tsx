import { 
    LiaChessPawnSolid, 
    LiaChessQueenSolid, 
    LiaChessKingSolid,
    LiaChessKnightSolid,
    LiaChessBishopSolid,
    LiaChessRookSolid
} from "react-icons/lia";
import { Figure } from "../../../interfaces";

export default function ChessFigure(props: {
    figureName: Figure | null,
    figureColor: string,
    onClick: () => void
}) {
    switch (props.figureName) {
        case Figure.pawn: {
            return <LiaChessPawnSolid color={props.figureColor} fontSize={50} onClick={props.onClick} />;
        }
        case Figure.rook: {
            return <LiaChessRookSolid color={props.figureColor} fontSize={50} onClick={props.onClick} />;
        }
        case Figure.bishop: {
            return <LiaChessBishopSolid color={props.figureColor} fontSize={50} onClick={props.onClick} />;
        }
        case Figure.king: {
            return <LiaChessKingSolid color={props.figureColor} fontSize={50} onClick={props.onClick} />;
        }
        case Figure.knight: {
            return <LiaChessKnightSolid color={props.figureColor} fontSize={50} onClick={props.onClick} />;
        }
        case Figure.queen: {
            return <LiaChessQueenSolid color={props.figureColor} fontSize={50} onClick={props.onClick} />;
        }
        default: {
            return null;
        }
    }
}