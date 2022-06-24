import React from 'react';

const Title = (props) => {
const actorsList = props.actors.map((actor) =>
  <ol key={actor.person_id}>{actor.character} played by {actor.name}</ol>
)

    return (
      <React.Fragment>
      {actorsList}
      </React.Fragment>
    )

}
export default Title;

//will take in the rows with the title and map a list of all the voice actors

//make all that clickable to see that actors page