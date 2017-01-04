import React from "react";

export default class Controls extends React.Component{
  constructor(){
    super();
    this.state={emptyInput: null};
  }
  clearGuess() {
    let { guessInput } = this.refs
    guessInput.value = "";
    this.focusGuessInput(guessInput);
  }

  submitGuess() {
    let { guessInput } = this.refs;
    this.props.handleGuess(guessInput);
    this.clearGuess();
    this.focusGuessInput(guessInput);
  }

  focusGuessInput(guessInput) {
    guessInput.focus();
  }

  inputFieldCheck(e){
    this.setState({emptyInput: e.target.value})
  }

  enterKeyCheck(e) {
    if(e.keyCode === 13)
      this.submitGuess();
  }

  render(){
    return(
      <div>
        <input  ref="guessInput"
                type="number"
                placeholder="guess!"
                onKeyDown={this.enterKeyCheck.bind(this)}
                onChange={this.inputFieldCheck.bind(this)}
                />
        <button ref="submit"
                onClick={this.submitGuess.bind(this)}
                disabled={!this.state.emptyInput}>submit</button>
        <button ref="clear"
                onClick={this.clearGuess.bind(this)}
                disabled={!this.state.emptyInput}>clear</button>
        <button ref="reset"
                onClick={this.props.resetGame.bind(this)}>reset</button>
      </div>
    )
  }
}
