import React from 'react';
import axios from 'axios';
import Title from './Title.jsx';

const Watched = (props) => {
const searchTitle = function(currentTitle, event) {
    console.log('event', event.target, 'name', currentTitle)
    axios.get('http://localhost:3000/title', {params: {title: currentTitle}})
    .then((response) => {

      props.view(event)
    })
    .catch((error) => {
      console.log(error)
    })
  }
const titles = props.watched.map((show) => show.title);
const filter = titles.filter((title, index) => titles.indexOf(title) === index)
const watchList = filter.map((show) =>

  <ol onClick={(event) => searchTitle(show,event)} key={show}>{show}</ol>
)

    return (
      <React.Fragment >
     {watchList}
      </React.Fragment>
    )

}
export default Watched;

//add column called watch with everything set to false

//will take in each row that is true map through to make a list of the titles

//make every title clickable to see all the actors in that show and also be able to remove them