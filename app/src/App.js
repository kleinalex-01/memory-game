import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { symbols } from './data';
import UI from "./Components/UI"
import ReactConfetti from 'react-confetti';

function App() {
  const [cards, setCards] = useState(symbols);
  const [isRestart, setIsRestart] = useState(false);
  const [shuffleCards, setShuffleCards] = useState(() => fisherYatesShuffle(cards));
  const [flippedCards, setFlippedCards] = useState([]);
  const [boardLocked, setBoardLocked] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  function fisherYatesShuffle(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
  };

  useEffect(() => {
    setShuffleCards(fisherYatesShuffle(cards));
    setIsGameWon(false);
    setFlippedCards([]); 
    setBoardLocked(false);
  }, [isRestart, cards]);

  useEffect(() => {
    if (shuffleCards.every(card => card.isMatched)) {
      setIsGameWon(true);
    }
  }, [flippedCards, shuffleCards]);
    
  function cardFlip(id) {
    if (boardLocked) return;
    if (flippedCards.includes(id)) return;

    setShuffleCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );
  
  setFlippedCards((prev) => {
    const flipped = [...prev, id];
    if (flipped.length === 2) {
      setBoardLocked(true);
      const [firstCardId, secondCardId] = flipped;
      const firstCard = shuffleCards.find(card => card.id === firstCardId);
      const secondCard = shuffleCards.find(card => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.value !== secondCard.value) {
        setTimeout(() => {
          setShuffleCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCardId || card.id === secondCardId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setBoardLocked(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setShuffleCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCardId || card.id === secondCardId
                ? { ...card, isMatched: true }
                : card
            )
          );
          setFlippedCards([]);
          setBoardLocked(false);
        }, 1000);
      }
    }

    return flipped;
  });
}

  return (
    <>
        <>
        {isGameWon && (<ReactConfetti width={window.innerWidth} height={window.innerHeight} />)}
        <UI isRestart={isRestart}
            setIsRestart={setIsRestart}
            shuffleCards={shuffleCards}
            flippedCards={flippedCards}
            cardFlip={cardFlip}
            boardLocked={boardLocked}
            isGameWon={isGameWon} />
        </>
    </>
  );
}

export default App;
