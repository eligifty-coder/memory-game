import React from 'react'
import classes from './SingleCard.module.css'

const SingleCard = (props) => {

   const handleClick = (card) => {
      props.handleChoice(card)
   }
   return <div className={classes.card} >
      <div className={props.card.flipped? classes.flipped :''} >
         <img
            src={props.card.src}
            className={classes.front}
            alt='card-front'
         />
         <img
            src='/img/cover.png'
            className={classes.back}
            onClick={handleClick.bind(null, props.card)}
            alt='card-back'
         />
      </div>
   </div>
}

export default SingleCard
