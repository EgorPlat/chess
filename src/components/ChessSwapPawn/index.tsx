import React from "react";
import ChessSwapPawnView from "./ChessSwapPawnView";

export default function ChessSwapPawn({ 
    handleChooseFigure
}: {
    handleChooseFigure: (id: number) => void
}) {

    return (
        <ChessSwapPawnView handleChooseFigure={handleChooseFigure} />
    )
}