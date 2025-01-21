import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { symbols } from './data';
import UI from "./Components/UI"

function App() {
  const [cards, setCards] = useState(symbols);
  const [isRestart, setIsRestart] = useState(false);
  const [shuffleCards, setShuffleCards] = useState(() => fisherYatesShuffle(cards));
  const [flippedCards, setFlippedCards] = useState([]);

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
  }, [isRestart, cards]);
    
  function cardFlip(id) {
    setShuffleCards(prevCards => prevCards.map(card => {
      if (card.id === id) {
        return { ...card, isFlipped: !card.isFlipped };
      }
      return card;
    }));
  
  setFlippedCards((prev) => {
    const flipped = [...prev, id];
    if (flipped.length === 2) {
      const [firstCardId, secondCardId] = flipped;
      const firstCard = shuffleCards.find(card => card.id === firstCardId);
      const secondCard = shuffleCards.find(card => card.id === secondCardId);
      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        setTimeout(() => {
          setShuffleCards(prevCards =>
            prevCards.map(card => {
              if (card.id === firstCardId || card.id === secondCardId) {
                return { ...card, isFlipped: true, isDisabled: true };
              }
              return card;              
            }));
            setFlippedCards([]);
          }, 1500);
        } else {
          setTimeout(() => {
            setShuffleCards(prevCards =>
              prevCards.map(card => {
                if (card.id === firstCardId || card.id === secondCardId) {
                  return { ...card, isFlipped: false };
                }
                return card;
              })
            );
            setFlippedCards([]);
          }, 1500);
        }
      }
  
      return flipped;
    });
  }
  

  return (
    <>
        <>
        <UI cards={cards}
            isRestart={isRestart}
            setIsRestart={setIsRestart}
            shuffleCards={shuffleCards}
            flippedCards={flippedCards}
            cardFlip={cardFlip}/>
        </>
    </>
  );
}

export default App;
