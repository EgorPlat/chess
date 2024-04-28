import { createSlice } from "@reduxjs/toolkit";
import { Figure, IActiveFigure, IChecksInfo, IFigureColor, IFigurePosition } from "../../interfaces";
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
        state.positionsOfCurrentCheck = action.payload.positions;
      },
      setFigureForSwap(state, action) {
        state.figureForSwap = action.payload;
      },
      setNewPositionForPawnWithSwap(state, action) {
        const prevPosition: IFigurePosition = action.payload.previousPosition;
        const newPosition: IFigurePosition = action.payload.newPosition;
        const currentPlayer: string = action.payload.currentPlayer;

        if (state.figureForSwap) {
          Object.values(state.deskInfo)[prevPosition.lineIndex][prevPosition.zoneIndex] 
            = { color: "", value: null, isBlocked: false };
          Object.values(state.deskInfo)[newPosition.lineIndex][newPosition.zoneIndex] 
            = { color: currentPlayer, value: state.figureForSwap, isBlocked: false };
        }
      }
    }
  })

export const { 
  changeFigurePosition, 
  addRecordToHistory, 
  setCheckForPlayer, 
  setPositionsOfCurrentCheck,
  setNewPositionForPawnWithSwap,
  setFigureForSwap
} = mainSlice.actions;

export default mainSlice.reducer;  