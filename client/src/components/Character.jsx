import React from 'react';

const Character = (props) => {
    return (
      <React.Fragment>
       {props.character} is played by {props.actor}
      </React.Fragment>
    )

}
export default Character;

//will display the voice actors name

//make that name clickable to see all the actors shows