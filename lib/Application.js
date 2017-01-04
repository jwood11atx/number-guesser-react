import React from "react";
import Controls from "./Controls";
import { ResultDisplay } from "./ResultDisplay";

export default class Application extends React.Component {
  constructor(){
    super();
    this.state={numToGuess: 0, min: null, max: null, setup: true}
  }

  componentDidMount(){
    let { controls } = this.refs;
    let { guessInput } = controls.refs;
    controls.focusGuessInput(guessInput);
    this.refs.controls.refs.reset.disabled = true;
  }

  generateRandomNumber() {
    let min = Number(this.state.min);
    let max = Number(this.state.max);
    let newNumber = Math.floor(Math.random() * (max-min))+min;
    this.setState({numToGuess: newNumber});
  }

  handleGuess(guess){
    let { infoText, lastGuess, displayHint } = this.refs.results.refs;
    let { min, max } = this.state;

    if(this.state.setup){
      return this.setMinMax(guess);
    }

    if(guess.value >= min && guess.value <= max){
      this.checkGuess(guess);
    } else {
      infoText.innerHTML = "That's an invalid guess!"
      lastGuess.innerHTML = "";
      displayHint.innerHTML = `Please guess a number between ${min}-${max}.`;
    }
  }

  setMinMax(num){
    let { infoText, displayHint } = this.refs.results.refs;

    if(this.state.min === null){
      this.setState({min: Number(num.value)});
      infoText.innerHTML = "Thank you!"
      displayHint.innerHTML = "Now, please enter a number for the maximum number range.";
    } else if(this.state.max === null && num.value > this.state.min){
      this.setState({max: Number(num.value)});
      this.setState({setup:false}, this.startGame);
    } else {
      infoText.innerHTML = "Look dude, you gotta put in a higher number than the minimum. That's just how this works."
      displayHint.innerHTML = `Just pick any number higher than ${this.state.min}, homie. You got this. I believe in you.`;

    }
  }

  startGame() {
    let { infoText, displayHint } = this.refs.results.refs;

    this.generateRandomNumber();
    infoText.innerHTML = "Thank you! Let's begin!"
    displayHint.innerHTML = `Try to guess the number between ${this.state.min}-${this.state.max}`;
    this.refs.controls.refs.reset.disabled = false;
  }

  checkGuess(guess) {
    let { numToGuess } = this.state
    let { infoText, lastGuess } = this.refs.results.refs;

    infoText.innerHTML = "Your last guess was..."
    lastGuess.innerHTML = guess.value;
    this.displayHintText(guess.value, numToGuess);
  }

  displayHintText(guess, numToGuess){
    let { displayHint, infoText } = this.refs.results.refs;
    if(guess > numToGuess){
      displayHint.innerHTML = "That number is too high. Try again.";
    } else if ( guess < numToGuess) {
      displayHint.innerHTML = "That number is too low. Try again.";
    } else {
      let { min, max } = this.state;
      let newMin = Number(min) - 10;
      let newMax = Number(max) + 10;
      this.setState({min: newMin});
      this.setState({max: newMax});
      this.generateRandomNumber();
      infoText.innerHTML = "CONGRATULATIONS! That is the correct number!"
      displayHint.innerHTML = `Now try to guess the new number between ${newMin}-${newMax}`;
    }
  }

  resetGame() {
    let { infoText, lastGuess, displayHint } = this.refs.results.refs;
    let { controls } = this.refs;
    let { guessInput, reset } = controls.refs;
    infoText.innerHTML = "Please enter a number for the minimum number range.";
    lastGuess.innerHTML = "";
    displayHint.innerHTML = "";
    this.setState({numToGuess: this.generateRandomNumber(),
                   min: null,
                   max: null,
                   setup:true});
    guessInput.value = "";
    reset.disabled = true;
    controls.focusGuessInput(guessInput);
  }

  render(){
    return(
      <div>
        <h1>Number Guesser</h1>
        <ResultDisplay ref="results" />
        <Controls ref="controls"
                  handleGuess={this.handleGuess.bind(this)}
                  resetGame={this.resetGame.bind(this)} />
      </div>
    )
  }
}
