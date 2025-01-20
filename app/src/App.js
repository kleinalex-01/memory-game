import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { symbols } from './data';

function App() {
  const [cards, setCards] = useState(symbols);
      
  const displayCards = cards.map(card => {
    return (
          <div class="col-2" key={card.id} aria-label={card.name}>
            <img src={card.image} alt={card.name} class="card img-fluid" />
          </div>
    )
  })
  return (
    <>
        <>
        <div class="bg-color-light">
            <div class="container-fluid">
                <div class="row">
                    <div class="head-memory-game col-6 bg-color-dark fw-bold text-color-light">
                        <h1>Memory Game</h1>
                    </div>
                </div>
            </div>

            <div class="container fluid">
                <div class="row">
                    <div class="col-8">

                    </div>
                </div>
            </div>
        </div>
        {displayCards}
        </>
    </>
  );
}

export default App;
