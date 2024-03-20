import './SingleCard.css'

function SingleCard (props) {

    const handleClick = () => {
        !props.disabled ? props.handleChoice(props.card) : _
    }

    return(
        <>
            <div className='card'>
                
                <div className={props.flipped ? "flipped" : ""}>
                    <img 
                        src={props.card.src} 
                        alt="card front" 
                        className='front'
                    />

                    <img 
                        src="src/assets/cover.png" 
                        alt="card back" 
                        className="back" 
                        onClick={handleClick} 
                    />
                </div>
              </div>
        </>
    )
}

export default SingleCard;