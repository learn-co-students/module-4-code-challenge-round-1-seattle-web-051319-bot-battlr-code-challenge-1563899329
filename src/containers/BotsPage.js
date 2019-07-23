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
  componentDidMount() {
    this.fetchBots()
  }

  fetchBots = () => {
    fetch(' https://bot-battler-api.herokuapp.com/api/v1/bots')
    .then(res => res.json())
    .then(json => this.setState({bots: json, displayedBots: json}))
  }

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

  removeBot = bot => {
    const userBots = [...this.state.userBots].filter(singleBot => singleBot.id !== bot.id)
    this.setState({userBots})
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const displayedBots = [...this.state.bots].filter(bot => {
      let name = bot.name.toLowerCase()
      let input = this.state.input.toLowerCase()
      return name.includes(input)
    })
    this.setState({ displayedBots })
  }

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
