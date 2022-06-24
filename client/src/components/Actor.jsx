import React from 'react';

const Actor = (props) => {
  const titles = props.shows.map((show) =>

    <ol style={show.watched ? {fontWeight: 'bold'} : {fontWeight: 'normal'}}>{show.title}</ol>

)
    return (
        <React.Fragment>
        {titles}
       </React.Fragment>


    )

}
export default Actor;

//map through and list all the shows for that actor

//make each clickable to list all the voice actors for each show