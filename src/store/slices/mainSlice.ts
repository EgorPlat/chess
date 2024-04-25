import { createSlice } from "@reduxjs/toolkit";
import { IActiveFigure, IChecksInfo, IFigureColor, IFigurePosition } from "../../interfaces";
import { INITIAL_MAIN_SLICE_STATE } from "../constants";

const mainSlice = createSlice({
    name: 'main',
    initialState: INITIAL_MAIN_SLICE_STATE,
    reducers: {
      changeFigurePosition(state, action) {
        const activeFigure: IActiveFigure = action.payload.activeFigure;
        const newPosition: IFigurePosition = action.payload.newPosition;
        
        Object.values(state.deskInfo)[activeFigure.position.lineIndex][activeFigure.position.zoneIndex] 
          = { color: "", value: null, isBlocked: false };
        Object.values(state.deskInfo)[newPosition.lineIndex][newPosition.zoneIndex] = activeFigure.figure;
      },
      addRecordToHistory(state, action) {
        const figureColor: IFigureColor = action.payload.figureColor
        const activeFigure: IActiveFigure = action.payload.activeFigure;
        const newPosition: IFigurePosition = action.payload.newPosition;
        
        state.history.push({
          figureColor,
          previousPosition: activeFigure.position,
          newPosition
        });
      },
      setCheckForPlayer(state, action) {
        state.currentCheck = action.payload.color;
      },
      setPositionsOfCurrentCheck(state, action) {
        const positions: IChecksInfo[] = action.payload;
        state.positionsOfCurrentCheck = positions;
      }
    }
  })

export const { changeFigurePosition, addRecordToHistory, setCheckForPlayer, setPositionsOfCurrentCheck } = mainSlice.actions;
export default mainSlice.reducer;  