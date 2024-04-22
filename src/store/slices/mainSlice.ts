import { createSlice } from "@reduxjs/toolkit";
import { IActiveFigure, IFigureColor, IFigurePosition } from "../../interfaces";
import { INITIAL_MAIN_SLICE_STATE } from "../constants";

const mainSlice = createSlice({
    name: 'main',
    initialState: INITIAL_MAIN_SLICE_STATE,
    reducers: {
      changeFigurePosition(state, action) {
        const activeFigure: IActiveFigure = action.payload.activeFigure;
        const newPosition: IFigurePosition = action.payload.newPosition;
        
        Object.values(state.deskInfo)[activeFigure.position.lineIndex][activeFigure.position.zoneIndex] = { color: "", value: null };
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
      }
    }
  })

export const { changeFigurePosition, addRecordToHistory } = mainSlice.actions;
export default mainSlice.reducer;  