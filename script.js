Number.prototype.pad = function(size) {
	var s = String(this);
	while (s.length < (size || 2)) {s = "0" + s;}
	return s;
}

var count = 0;
var object1;
var object2;
var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; 
var cards2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var wait = false;
var score = 225;
var WIN = false;
var START = false;

function loadnewgame(){
	for(var i = 0; i < 30; i++){
		cards2[i] = getuniquerand(i);
	}
}

function getuniquerand(current){
	var randn = Math.floor(Math.random()*30);
	if(current == 0){
		return(randn);
	}else{
		for(var j = 0; j < current; j++){
			if(randn == cards2[j]){
				return(getuniquerand(current));
			}
		}
	}
	return(randn);
}

function flip(obj) {
	if(!START){START = true;}
	if(count < 2 && (obj != object1 && obj != object2) && !wait && ($("#"+obj).css('rotateY') != '360deg') && (document.getElementById("timer").innerHTML != "EXPIRED")){
		$("#"+obj).transition({
			rotateY: '360deg'
		});
		$("#"+obj).css("box-shadow","10px 10px 5px #ffff00");
		document.getElementById(obj).innerHTML = cards[cards2[obj-1]];
		if(count == 0){
			object1 = obj;
		}else{
			object2 = obj;
		}
		count++;
	}
	if(count == 2 && !wait && (document.getElementById("timer").innerHTML != "EXPIRED")){
		if(document.getElementById(object1).innerHTML == document.getElementById(object2).innerHTML){
			//match!
			$("#"+object1).css("box-shadow","10px 10px 5px #00d900");
			$("#"+object2).css("box-shadow","10px 10px 5px #00d900");
			checkwin();
		}else{
			wait = true;
			setTimeout(function(){
			$("#"+object1).transition({
				rotateY: '180deg'
			});
			$("#"+object1).css("box-shadow","");
			document.getElementById(object1).innerHTML = "";
			object1 = 40;
			$("#"+object2).transition({
				rotateY: '180deg'
			});
			$("#"+object2).css("box-shadow","");
			document.getElementById(object2).innerHTML = "";
			object2 = 40;
			wait = false;
			}, 750);
		}
		score--; 
		document.getElementById("score").innerHTML = score; //update score on screen to reflect turn taken
		count = 0;
	}
};
//must refresh page to load new game otherwise there is an error
function NewGame(){
	location.reload(); 
}
//test function to show win dialogue
function winNow(){
		document.getElementById("Wtimer").innerHTML = document.getElementById("timer").innerHTML;
	document.getElementById("Wscore").innerHTML = score;
	$("#winBox").css("display","inline");
	WIN = true;
}
//might want to break into 2 functions a checkwin function and a win function
function checkwin(){
	for( var k = 0; k < 29; k++){
		if( $("#"+(k+1)).css('rotateY') == '360deg') {
			WIN = true;
		}else{
			WIN = false;
		}
		if(!WIN){
			return(0);
		}
	}
	if(WIN){
		//alert("WINNER!");
		for( var l = 0; l < 30; l++){
			$("#"+(l+1)).css("box-shadow","10px 10px 5px #0000d9");
		}
		document.getElementById("Wtimer").innerHTML = document.getElementById("timer").innerHTML;
		document.getElementById("Wscore").innerHTML = score;
		$("#winBox").css("display","inline");

	}
}

var countDownDate;
// Update the count down every 1/100 second
var x = setInterval(function() {
	if(!WIN && START){
		// Get todays date and time
		var now = new Date().getTime();
		
		// Set the date we're counting down to
		if(countDownDate === undefined){
			countDownDate = new Date().getTime()+120000;
		}
		// Find the distance between now an the count down date
		var distance = countDownDate - now;
		
		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		var mseconds = Math.floor((distance % (1000)) / 10);
		
		// Output the result in an element with id="demo"
		document.getElementById("timer").innerHTML = minutes.pad() + ":" + seconds.pad() + ":" + mseconds.pad();
		
		// If the count down is over, write some text 
		if (distance < 0) {
			clearInterval(x);
			document.getElementById("timer").innerHTML = "EXPIRED";
			lose();
		}
	}
}, 10);

function lose(){
	//do something that shows you lost!
	alert("You ran out of time!");
}
