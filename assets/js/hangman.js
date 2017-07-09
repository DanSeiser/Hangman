/*Set the dictionary*/
var dictionary = ["KING","QUEEN","ANCIENT","ARCHER","ARCHERY","BATTERING RAM","CALLIGRAPHY",
"CARNAGE","CASTLE","CATAPULT","CHIVALROUS","CHIVALRY","CLERGY","COMMONER",
"CORONATION","COURT","CREST","DRAWBRIDGE","DARK AGES","DUEL","DUNGEON","EARL",
"ERE","FIEF","FORTRESS","GUILD","HITHER","JESTER","KEEP","KNIGHT",
"LORD","MANOR","MEDIEVAL","MIDDLE AGES","MOAT","MONARCH","MONARCHY",
"MOTTE AND BAILEY","NATION","NOBLE","OUTER CURTAIN","PALISADE","PARLIAMENT","PEASANT",
"PERSECUTION","REALM","REGAL","REIGN","RENAISSANCE","ROYAL","SCEPTER",
"SOOTH","SQUIRE","TANKARD","TAPESTRY","TROUBADOUR","TURRET","USURP",
"VASSAL","VIKING","YEOMEN","ANGLO","BARBARIAN","BARBARISM","CRENELLATIONS",
"CRUSADES","EXCOMMUNICATE","FEUDAL","FEUDALISM","HEARKEN","INDENTURE","INDENTURED",
"JOUST","LIEGE","MAGNA CARTA","MAIL","PARAPET","PORTCULLIS","SCUTAGE","TREBUCHET", 
"BUBONIC PLAGUE","BOLLOCKS","SERFDOM","GALLOWS", "BATTLEMENT"];


var winScore = 0;
var lossScore = 0;
var gameInProgress = false;
var wordHTML = '';
var selectedWord = '';
var remainingLives = 0;
var wrongLetters = [];
var testWord = '';

$(document).keyup(function(event){
	if(gameInProgress != true){
		gameStart();
	}else{
		keyPress = event.key;
		keyPress = keyPress.toUpperCase();
		if (keyPress.match(/[A-Z]/i) && keyPress.length === 1 && wrongLetters.indexOf(keyPress) === -1){
			gameTurn(keyPress);
		}
	}
})

function gameStart(){
	$('#gameOver').html('');
	gameInProgress = true;
	selectedWord = dictionary[Math.floor(Math.random()*dictionary.length)];
	wordHTML = '<div class="row"><div class="col-sm-12 text-center">';
	for (var i = 0, len = selectedWord.length; i < len; i++) {
		if(selectedWord[i] != ' '){
			wordHTML += '<div class="letterplace" id="letter_' + i + '">&nbsp;</div>';  
		}else{
			wordHTML += '</div></div></div class="row"><div classs="col-sm-12 text-center">'
		}
	}
	wordHTML += '</div></div>';
	remainingLives = 6;
	wordHTML += '<div class="row"><div class="col-sm-12 text-center"><h1>Remaining Chances: </h1><div id="lives"><h1>'+remainingLives+'</h1></div></div></div>';
	wordHTML += '<div class="row"><div class="col-sm-12 text-center"><h1>Incorrect Letters: </h1><br><div id="letters"></div></div></div>';
	$('#gamecontent').html(wordHTML);
	//Reset the images
	for(i=0;i<=6;i++){
		$('#img-'+i).hide();
	}

	$('#img-6').show();
}


function gameTurn(keyPress){
	//Check to see if letter is found in word
	letterFound = selectedWord.indexOf(keyPress);
	//If letter is found, fill it in, in all positions
	testWord = '';
	if(letterFound >= 0){
		for (var i = 0, len = selectedWord.length; i < len; i++) {
			if(keyPress == selectedWord[i]){
				$('#letter_'+i).html(keyPress);
			}
			testWord += $('#letter_'+i).html();
		}
		if(testWord == selectedWord){
			gameEnd('win');
		}
	}else{
		//If letter is not found
		$('#img-'+remainingLives).hide();//Hide the old image
		remainingLives = remainingLives - 1; //Subtract a life
		$('#img-'+remainingLives).show(); //Show the new image
		$('#lives').html('<h1>'+remainingLives+'</h1>'); //Display remaining lives
		if(remainingLives == 0){
			gameEnd('lose');//Kill the game when life counter is 0
		}else{
			wrongLetters.push(keyPress);//Add to the selected letters array
			wrongLetterHTML = '';//reset the wrong letters html
			for (var i = 0, len = wrongLetters.length; i < len; i++) {
				if(letterFound === -1){
					wrongLetterHTML += '&nbsp;&nbsp;'+wrongLetters[i] + '&nbsp;&nbsp;';//Create the wrong letters html
				}
			}
			$('#letters').html('<h1>'+wrongLetterHTML+'</h1>'); //write the wrong letters html
		}
	}
}

function gameEnd(lossOrWin){
	gameInProgress = false;
	if(lossOrWin == 'lose'){
		lossScore ++;
		$('#lossScore').html('<h3>'+lossScore+'</h3');
		for (var i = 0, len = selectedWord.length; i < len; i++) {
			$('#letter_'+i).html('&nbsp;&nbsp;' + selectedWord.charAt(i) + '&nbsp;&nbsp;');
		}
		//Game over text
		$('#gameOver').html('<p>Game over. The machine has bested you.<br>Press any key to play again.</p>');
	}else{
		winScore++;
		$('#winScore').html('<h3>'+winScore+'</h3>');
		//Game over text
		$('#gameOver').html('<p>Congratulations! You have defeated the computer.  You are truly a master of medieval vocabulary. <br>Press any key to play again.</p>');
	}
	gameInProgress = false;//Set to false so that the keypress listener starts a new game
	//Variable reset
	wordHTML = '';
	selectedWord = '';
	remainingLives = 0;
	wrongLetters = [];

}