import { useState, useEffect, useRef } from 'react'
import classes from './App.module.css'
import SingleCard from './component/SingleCard'
const cardImage = [
  { src: '/img/helmet-1.png', matched:false, flipped:false, },
  { src: '/img/potion-1.png', matched:false, flipped:false, },
  { src: '/img/ring-1.png', matched:false, flipped:false, },
  { src: '/img/scroll-1.png' , matched:false, flipped:false,},
  { src: '/img/shield-1.png', matched:false, flipped:false, },
  { src: '/img/sword-1.png', matched:false, flipped:false, },
]
function App() {
  const [duplicates, setDuplicates] = useState([])
  useEffect(() => {
    const cardWithIds = [...cardImage, ...cardImage].map((item, index) => {
      const id = Math.random() + index
      return { ...item, id }
    })
    setDuplicates([...cardWithIds])
  },[])
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choices, setChoices] = useState([])
  const [disabled, setDisabled] = useState(false)
  const shuffleCard = () => {
    const duplicateCards = [...duplicates]
    for (let i = duplicateCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = duplicateCards[i]
      duplicateCards[i] = duplicateCards[j]
      duplicateCards[j] = temp
    }
    
    setCards(duplicateCards)
    setTurns(0)
  }
  useEffect(() => {
    shuffleCard()
  },[])

  const handleChoice = card => {
    if (!disabled) {
      setChoices(prev => prev.concat({ ...card, flipped: true }))
      const flippedCards = cards.map(item => {
        if (card.id === item.id) {
          return { ...item, flipped: true, }
        }
        return item
      })
      setCards(flippedCards)
   }
  }
  const resetTurn = () => {
    setTurns(prev=>prev+1)
    setChoices([])
    setDisabled(false)

  }
  

  const timerRef = useRef(null);
  useEffect(() => {
    if (choices.length === 2) {
      if (choices[0].src === choices[1].src) {
        setDisabled(true)
        const matchedCards = cards.map(card => {
          if (card.src === choices[0].src) {
            return {...card, matched:true}
          }
          return card
        })

        setCards(matchedCards)
        resetTurn()
      } else {
        setDisabled(true)
        const removeFlip = cards.map(item => {

            if (item.src === choices[0].src) {
              return { ...item, flipped: false }
            }
            else if (item.src === choices[1].src) {
              return { ...item, flipped: false }
            }
     
          return item
        })
        timerRef.current  = setTimeout(() => {
          setCards(removeFlip)
          resetTurn()
        }, 1000)

      }
      
      
    }

  }, [choices])
  useEffect(() => {
    return ()=> clearTimeout(timerRef.current)
  },[])
  

  const mappedcards = cards.map((card,index) => {
    return <SingleCard
      key={index}
      card={card}
      handleChoice={handleChoice}
      disabled={disabled}

    />
  })
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard} >New Game</button>
      <div className={classes['card-grid']}>
        {mappedcards}
      </div>
      <p>Turns:{ turns}</p>
    </div>
  );
}

export default App
