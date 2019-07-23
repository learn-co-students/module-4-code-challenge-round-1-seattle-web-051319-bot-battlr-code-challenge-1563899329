import React from "react";
import BotCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'

class BotsPage extends React.Component {
  //start here with your code for step one
  state = {
    bots: [],
    displayedBots: [],
    userBots: [],
    input: ''
  }

  // This lifecycle method is used to allow us to fetch our bots once.
  componentDidMount() {
    this.fetchBots()
  }

  // This function fetches all of the bots from the api.
  // This function is called in our component did mount so that we can get the bots once without infinitely looping.
  fetchBots = () => {
    fetch(' https://bot-battler-api.herokuapp.com/api/v1/bots')
    .then(res => res.json())
    .then(json => this.setState({bots: json, displayedBots: json}))
  }

  // This function adds a bot to a users team but prevents a user from adding the same bot more than once
  addBot = bot => {
    const currentArmy = this.state.userBots
    if (!currentArmy.includes(bot)) {
      const userBots = currentArmy.concat(bot)
      this.setState({ userBots })
    }
    else {
      console.log('nope')
    }
  }

  // This function simply removes a bot from a users team
  removeBot = bot => {
    const userBots = [...this.state.userBots].filter(singleBot => singleBot.id !== bot.id)
    this.setState({userBots})
  }

  // This function will use the input provided by the form to search for matching bots.
  // I am using the bots state rather than displayed bots so that it updates from all bots each time a user searches.
  handleSubmit = ev => {
    ev.preventDefault()
    const displayedBots = [...this.state.bots].filter(bot => {
      let name = bot.name.toLowerCase()
      let input = this.state.input.toLowerCase()
      return name.includes(input)
    })
    this.setState({ displayedBots })
  }

  // This function allows us to update our controlled form when a user provides input.
  handleChange = ev => {
    this.setState({input: ev.target.value})
  }

  render() {
    return (
      <div>
        <YourBotArmy bots={this.state.userBots} removeBot={this.removeBot}/>
        <div className='form-holder'>
          <label>Search By Name</label>
          <form onSubmit={this.handleSubmit}>
            <input type='text' value={this.state.input} onChange={this.handleChange} />
            <input type='submit' value='Search' />
          </form>
        </div>
        <BotCollection bots={this.state.displayedBots} addBot={this.addBot}/>
      </div>
    );
  }

}

export default BotsPage;
