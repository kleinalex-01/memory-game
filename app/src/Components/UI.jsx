import {React, useState, useEffect} from "react";
import { symbols } from "../data";

export default function UI({cards, isRestart, setIsRestart, shuffleCards, flippedCards, cardFlip}) {

    const displayCards = shuffleCards.map(card => {
        return (
            <div key={card.id}>
            {card.isFlipped ? 
               ( <button class={card.isDisabled ? "match" : "card-btn"} onClick={() => cardFlip(card.id)}>
                    <img src={card.image}
                    alt={card.value}
                    aria-label={card.value}
                    class={card.isDisabled ? "img-fluid" : "img-fluid symbols"} />
                </button> )
                : 
                (<button class={card.isDisabled ? "match" : "card-btn"} onClick={() => cardFlip(card.id)}>
                    <img src="/Images/question-mark.png" alt="Hidden card" class={card.isDisabled ? "img-fluid" : "img-fluid symbols"} />
                </button>)
            }
            </div>
        );
    })

    return (
        <>
        <div class="bg-color-light container-fluid body">
            <div class="container-fluid">
                <div class="row">
                    <div class="head-memory-game col-6 bg-color-dark fw-bold text-color-light">
                        <h1>Memory Game</h1>
                    </div>
                </div>
            </div>

            <div class="container cards-container">
                <div class="row row-cols-6 g-3">
                    {displayCards}
                </div>
                <button class="bg-color-dark text-color-light restart-game-btn" onClick={() => setIsRestart(prev => !prev)} type="button">Restart Game</button>
            </div>
        </div>
        </>
    );
};