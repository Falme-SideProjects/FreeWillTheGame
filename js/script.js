var game;

class GameState{
	constructor(){

		var _self = this;

		this.gameState = 0;

		this.init = function(){
			_self.refreshGameState();
			_self.bindevent();
		}

		this.bindevent = function(){
			$('html').on('click', function(){
				if(_self.gameState == 0){
					_self.gameState = 1;
					_self.refreshGameState();
				}
			});
		}

		this.refreshGameState = function(){

			$("#mainMenu").hide();
			$("#gameplay").hide();
			$("#credits").hide();

			switch(_self.gameState){
				case 0:
					$("#mainMenu").show();

				break;
				case 1:
					$("#gameplay").show();
				break;
				case 2:
					$("#credits").show();
				break;
			}
		}

		this.init();
	}
}

class LoadConversation{
	constructor(){

		var _self = this;

		this.conversationIndex = 0;


		this.init = function(){
			_self.refreshConversation();
		}

		this.refreshConversation = function(){
			var pc = data.conversations[_self.conversationIndex].pcSpeech;
			$("#pcSpeech").text(""+pc);
			var opt1 = data.conversations[_self.conversationIndex].player[0].texto;
			$("#opt1").text(""+opt1);
			var opt2 = data.conversations[_self.conversationIndex].player[1].texto;
			$("#opt2").text(""+opt2);
		}

		this.selectedDirection = function(number){
			_self.conversationIndex = data.conversations[_self.conversationIndex].player[number].toId;
			
			console.log(_self.conversationIndex);

			if(_self.conversationIndex == -1){
				game.gamestate.gameState = 2;
				game.gamestate.refreshGameState();
				_self.conversationIndex = 0;
				_self.refreshConversation();
			} else {
				_self.refreshConversation();
				
			}

		}

		this.init();

	}
}

class Options{
	constructor(){

		var _self = this;

		this.opt1 = $("#opt1");
		this.opt2 = $("#opt2");

		this.init = function(){
			_self.opt1.on('click', function(){
				_self.selectedOption(0);
			});

			_self.opt2.on('click', function(){
				_self.selectedOption(1);
			});
		}

		this.selectedOption = function (number) {
			game.conversation.selectedDirection(number);
		}


		this.init();

	}
}



class Game{
	constructor(){
		
		this.gamestate = new GameState();
		this.conversation = new LoadConversation();
		this.playerOptions = new Options();
	
	}
}

$(window).ready(function(){

	game = new Game();

});