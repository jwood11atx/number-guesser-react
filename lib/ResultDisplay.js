import React from "react";

export const ResultDisplay = React.createClass({
  render(){
    return(
      <div>
        <h3 ref="infoText">Please enter a number for the minimum number range.</h3>
        <h2 ref="lastGuess"></h2>
        <h3 ref="displayHint"></h3>
      </div>
    )
  }
})
