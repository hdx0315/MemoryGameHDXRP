import { useEffect, useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "src/assets/helmet-1.png", matched : false},
  {"src": "src/assets/potion-1.png", matched : false},
  {"src": "src/assets/ring-1.png", matched : false},
  {"src": "src/assets/scroll-1.png", matched : false},
  {"src": "src/assets/shield-1.png", matched : false},
  {"src": "src/assets/sword-1.png", matched : false}
];


function App() {

  //useStates
  const [cards , setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const[disabled,setDisabled] = useState(false)


  // shuffle function
  const shuffleCards = () => {

    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random()-0.5)
      .map((card)=> ({...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)

    setCards(shuffledCards)
    setTurns(0)
  };


  //handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }


  //compare 2 selected cards
  useEffect(() => {

    if (choiceOne && choiceTwo ) {
    setDisabled(true)

      if (choiceOne.src === choiceTwo.src){
        setCards(c => {
          return c.map( card => {

            if (card.src === choiceOne.src){
              return {...card, matched: true}
            }
            else{
              return card
            }
          })
        })

        setTimeout(()=> choiceReset(),1000)
        console.log(turns)
      } 
      else{
        console.log("no match")
        setTimeout(()=> choiceReset(),1000)

        console.log(turns)
      }
    }
   /* 
   choiceOne && choiceTwo ? 
      choiceOne.src == choiceTwo.src ? 
        console.log("match") : console.log("no match") : 
      console.log("waiting");
    setTurns(turns+1);
    console.log(turns)
    choiceReset();
    */

  },[choiceOne, choiceTwo]);


  //choice reset
  const choiceReset = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)

    setTurns(prevTurns => prevTurns+1)
    setDisabled(false)
  }


  //start automatically
  useEffect(() => {
      shuffleCards()
  },[])


  return (

    <div className='App'>

      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New game</button>
        
      <div className='card-grid'>
        {
          cards.map(card => (

                  <SingleCard 
                    card={card} 
                    key={card.id}
                    handleChoice={handleChoice}
                    flipped= {card === choiceOne || card === choiceTwo || card.matched}
                    disabled={disabled}
                  />

          ))
        }

        </div>
        <p>Turns : {turns}</p>
    </div>
  )
}

export default App
