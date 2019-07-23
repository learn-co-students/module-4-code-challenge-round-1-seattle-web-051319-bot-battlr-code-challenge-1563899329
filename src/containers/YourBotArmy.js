import React from "react";
import BotCard from "../components/BotCard";

class YourBotArmy extends React.Component {
  //your bot army code here...
  //This function just turns our props into dom elements (in this case bot cards)
  displayMyBots = () => {
    return this.props.bots.map(bot => {
      return <BotCard key={bot.id} bot={bot} handleOnClick={this.props.removeBot}/>
    })
  }

  render(){
    return (
      <div className="ui segment inverted olive bot-army">
        <div className="ui five column grid">
          <div className="row bot-army-row">
            {this.displayMyBots()}
          </div>
        </div>
      </div>
    );
  }
  
};

export default YourBotArmy;
