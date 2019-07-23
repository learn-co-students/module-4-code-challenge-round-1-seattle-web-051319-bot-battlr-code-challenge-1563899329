import React from "react";
import BotCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'

class BotsPage extends React.Component {
  //start here with your code for step one
  state = {
    bots: [],
    userBots: []
  }
  componentDidMount() {
    this.fetchBots()
  }

  fetchBots = () => {
    fetch(' https://bot-battler-api.herokuapp.com/api/v1/bots')
    .then(res => res.json())
    .then(json => this.setState({bots: json}))
  }

  addBot = bot => {
    const userBots = this.state.userBots.concat(bot)
    this.setState({userBots})
  }

  removeBot = bot => {
    const userBots = [...this.state.userBots].filter(singleBot => singleBot.id !== bot.id)
    this.setState({userBots})
  }

  render() {
    return (
      <div>
        <YourBotArmy bots={this.state.userBots} removeBot={this.removeBot}/>
        <BotCollection bots={this.state.bots} addBot={this.addBot}/>
      </div>
    );
  }

}

export default BotsPage;
