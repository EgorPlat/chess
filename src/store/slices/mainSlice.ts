import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_DESK } from "../constants";
import { IActiveFigure, IFigurePosition } from "../../interfaces";

const mainSlice = createSlice({
    name: 'main',
    initialState: {
      deskInfo: DEFAULT_DESK
    },
    reducers: {
      changeFigurePosition(state, action) {
        const activeFigure: IActiveFigure = action.payload.activeFigure;
        const newPosition: IFigurePosition = action.payload.newPosition;
        
        Object.values(state.deskInfo)[activeFigure.position.lineIndex][activeFigure.position.zoneIndex] = { color: "", value: null };
        Object.values(state.deskInfo)[newPosition.lineIndex][newPosition.zoneIndex] = activeFigure.figure;
      }
    }
  })

export const { changeFigurePosition } = mainSlice.actions;
export default mainSlice.reducer;  