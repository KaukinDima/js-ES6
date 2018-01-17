import Elem from './app/functoinWithElem';

const elem = new Elem();

class mathGame {
	
	constructor() {
		this.playing = false;
		this.score;
		this.action;
		this.timeremaining;
    this.correctAnswer;	
		elem.hide('body');
		elem.show('body');

		this.start();
		this.clickStart();
		
	}

	clickStart() {
		let self = this;
		document.getElementById("startreset").onclick = function(){
			if(self.playing) {
				location.reload();
			} else {
				self.playing = true;
				self.score = 0;
				document.getElementById("scorevalue").innerHTML = self.score; 
				elem.show("#timeremaining");
				self.timeremaining = 10;
				document.getElementById("timeremainingvalue").innerHTML = self.timeremaining;
				elem.hide('#gameOver');
				document.getElementById("startreset").innerHTML = "Reset Game";
				self.startCountdown();
				self.generateQA();
			}

		}
		
	}

	startCountdown() {
		let self = this;
		this.action = setInterval( () => {
			self.timeremaining -= 1;
			document.getElementById("timeremainingvalue").innerHTML = self.timeremaining;
			if(self.timeremaining == 0) {
				self.stopCountdown();
				elem.show("#gameOver");
				document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + self.score + ".</p>";   
				elem.hide("#timeremaining");
				elem.hide("#correct");
				elem.hide("#wrong");
				self.playing = false;
				document.getElementById("startreset").innerHTML = "Start Game";
			}
		}, 1000 ); 
	}

	stopCountdown() {
		let self = this;
		clearInterval(self.action);
	}
	
	generateQA() {
		let x = 1+ Math.round(9*Math.random());
    let y = 1+ Math.round(9*Math.random());
		this.correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    let correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = this.correctAnswer; 
    
		let answers = [this.correctAnswer];
		
		for(let i=1; i<5; i++){
			if(i != correctPosition) {
					let wrongAnswer;
					do{
							wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); 
					}while(answers.indexOf(wrongAnswer)>-1)
					document.getElementById("box"+i).innerHTML = wrongAnswer;
					answers.push(wrongAnswer);
			}
		}
	}

	start() {
		let self = this;
		for(let i=1; i<5; i++){
			
			document.getElementById("box"+i).onclick = function(){

				if(self.playing){
					if(this.innerHTML == self.correctAnswer){
							
							self.score++;
							document.getElementById("scorevalue").innerHTML = self.score;

							elem.hide("#wrong");
							elem.show("#correct");

							setTimeout(function(){
									elem.hide("#correct");   
							}, 1000);
							
							self.generateQA();
					} else{
						elem.hide("#correct");
						elem.show("#wrong");
						setTimeout(function(){
							elem.hide("#wrong");   
						}, 1000);
					}
				}
			}   
		}
	}

}

let test = new mathGame();
