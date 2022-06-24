import React from 'react';
import axios from 'axios';
import Watched from './Watched.jsx';
import Character from './Character.jsx';
import Title from './Title.jsx';
import Actor from './Actor.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watchedView: false,
      crossoversView: false,
      characterView: false,
      actorView: false,
      titleView: false,
      input: '',
      watchList: [],
      actor: '',
      shows: [],
      actors:[]
    }
    this.view = this.view.bind(this);
    this.addTitle = this.addTitle.bind(this);
    this.addInput = this.addInput.bind(this);
    this.getWatched = this.getWatched.bind(this);
    this.searchCharacter = this.searchCharacter.bind(this);
    this.searchActor = this.searchActor.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
  }

  view() {
    this.setState({
      watchedView: false,
      crossoversView: false,
      characterView: false,
      actorView: false,
      titleView: false,
    })
    var search = event.target.name
    this.setState({
      [event.target.name]: !this.state.search
    })
  }

  addInput(event) {
    this.setState({
      input: event.target.value
    })
  }

  addTitle() {
    axios.post('http://localhost:3000/watched', {title: this.state.input})
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log('axios error', error)
    })
  }

  getWatched() {
    axios.get('http://localhost:3000/watched')
    .then((response) => {
      this.setState({
        watchList: response.data.rows
      })
    })
    .then(this.view())
    .catch((error) => {
      console.log(error)
    })

  }

  searchCharacter() {
    axios.get('http://localhost:3000/character', {params: {character: this.state.input}})
    .then((response) => {
      console.log('axios data response', response)
      this.setState({
        actor: response.data
      })
    })
    .then(this.view())
    .catch((error) => {
      console.log(error)
    })
  }

  searchActor() {
    axios.get('http://localhost:3000/actor', {params: {character: this.state.input}})
    .then((response) => {
      this.setState({
        shows: response.data
      })
      console.log(response.data)
    })
    .then(this.view())
    .catch((error) => {
      console.log(error)
    })
  }

  searchTitle() {
    console.log('name', this.state.input)
    axios.get('http://localhost:3000/title', {params: {title: this.state.input}})
    .then((response) => {
      console.log('axios data response', response)
      this.setState({
        actors: response.data
      })
    })
    .then(this.view())
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Anime Voice Actor Tracker</h1>
        <h3>Add To Watched List:</h3>
        <input onChange={this.addInput} value='' placeholder='Enter Title'></input>
        <button onClick={this.addTitle}>Add</button>
        <button onClick={this.getWatched} name='watchedView'>View Watched List</button>
        {/* <button onClick={this.view} name='crossoversView'>View All CrossOvers</button> */}
        <div>
          <input onChange={this.addInput} placeholder='Search By Character' ></input>
          <button onClick={this.searchCharacter} name='characterView'>Search</button>
          <input onChange={this.addInput} placeholder='Search By Voice Actor'></input>
          <button onClick={this.searchActor} name='actorView'>Search</button>
          <input onChange={this.addInput} placeholder='Search By Anime Title'></input>
          <button onClick={this.searchTitle} name='titleView'>Search</button>
        </div>
        <div>
          {this.state.watchedView && !this.state.actorView && !this.state.titleView && !this.state.characterView && !this.state.crossoversView ? <Watched view={this.view}watched={this.state.watchList} searchTitle={this.searchTitle}/>  : null}
          {/* {this.state.crossoversView && !this.state.actorView && !this.state.characterView && !this.state.watchedView && !this.state.titleView ? <Crossovers/> : null} */}
          {this.state.characterView && !this.state.actorView && !this.state.titleView && !this.state.watchedView && !this.state.crossoversView ? <Character character={this.state.input} actor={this.state.actor}/> : null}
          {this.state.actorView && !this.state.characterView && !this.state.titleView && !this.state.watchedView && !this.state.crossoversView ? <Actor shows={this.state.shows}/> : null}
          {this.state.titleView && !this.state.actorView && !this.state.characterView && !this.state.watchedView && !this.state.crossoversView ? <Title actors={this.state.actors}/> : null}
        </div>
      </React.Fragment>
    )
  }
}

export default App;

//do i need a crossovers feature?, what is it doing that the other searches cant? or what constraints should I add to
//make it more useful
//create an add your own info for ones not in the database: so avoid using the id in fxns because
//i can't add it (i can add a step to check the api first though if i have time)

//for adding a title changed watched column to true for rows with the same title name

//for watched list return all rows as true but need to get rid of duplicates

//crossovers if a

//to get a character search by the input name

//to get actor search by the input actor, get rid of duplicates?

//to get title search by input title

