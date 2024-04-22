import { IHistoryElement } from '../../../interfaces';
import { DEFAULT_DESK } from '../../../store/constants';
import './index.scss';

export default function ChessHistoryView({ 
    history
}:{
    history: IHistoryElement[]
}) {
    return (
      <div className="history">
        {
            history.map(el => {
                return (
                    <div className="element" style={{ backgroundColor: el.figureColor }}>
                        {
                            `${Object.keys(DEFAULT_DESK)[el.previousPosition.lineIndex]}${el.previousPosition.zoneIndex + 1}`
                        } -
                        {
                            `${Object.keys(DEFAULT_DESK)[el.newPosition.lineIndex]}${el.newPosition.zoneIndex + 1}`
                        }
                    </div>
                )
            }) 
        }
      </div> 
    )
}