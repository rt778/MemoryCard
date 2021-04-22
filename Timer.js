var seconds = 0;
var tens = 0;
var appendTens = document.getElementById('tens');
var appendSeconds = document.getElementById('seconds');
var Interval;


function startTimer(){
			tens++;

			if (tens < 9){
				appendTens.innerHTML = "0" + tens;
			}

			if (tens > 9){
				appendTens.innerHTML = tens;
			}

			if (tens > 99) {
      			console.log("seconds");
      			seconds++;
      			appendSeconds.innerHTML = "0" + seconds;
      			tens = 0;
      			appendTens.innerHTML = "0" + 0;
   			 }

   			 if (seconds > 9){
      			appendSeconds.innerHTML = seconds;
    			}
		}
		