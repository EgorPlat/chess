import { useSelector } from "react-redux";
import { IRootStore } from "../../interfaces/slices";
import ChessHistoryView from "./ChessHisotryView";

export default function ChessHistory() {

    const history = useSelector((store: IRootStore) => store.rootReducer.main.history);

    return (
        <ChessHistoryView 
            history={history}
        />
    )
}