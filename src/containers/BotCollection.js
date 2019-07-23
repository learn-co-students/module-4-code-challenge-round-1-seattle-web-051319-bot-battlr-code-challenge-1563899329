import React from "react";
import BotCard from "../components/BotCard";

class BotCollection extends React.Component {
  //your code here
  displayBots = () => {
	  return this.props.bots.map(bot => {
		  return <BotCard key={bot.id} bot={bot} handleOnClick={this.props.addBot} />
	  })
  }

  render(){
  	return (
  	  <div className="ui four column grid">
    		<div className="row">
    		  {this.displayBots()}
    		</div>
  	  </div>
  	);
  }

};

export default BotCollection;
