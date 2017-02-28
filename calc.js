$(document).ready(function(){

	var start = document.getElementById("start");
	
	var end = document.getElementById("end");

	var notEmpty = function(){
		if(start.value != "" && end.value != ""){
			return true;
		}else{
			return false;	
		}
	};

	var calculateTime = function(){
		var timeDifference;
		var startTime = new Date(start).getTime();
		var endTime = new Date(end).getTime();
		if(startTime > endTime){
			document.getElementById("error").innerHTML = "NB! Parkimise algusaeg peab olema väiksem kui lõppaeg!";
			document.getElementById("message").innerHTML = "";
		}else{
			timeDifference = (endTime - startTime) / (1000 * 60 * 60);
			calculatePrice(Math.ceil(timeDifference));
		}
	};

	var calculatePrice = function(time){
		document.getElementById("error").innerHTML = "";
		var feeHour = 1;
		var feeDay = 5;
		var feeMonth = 80;
		var x;
		var y;
		var result;
		if(time < 2){
			result = "TASUTA";
		}else{
			if(time % 24 < 5){
				x = time % 24;
				y = Math.floor(time / 24);
			}else{
				x = 0;
				y = Math.ceil(time / 24);
			}
			result = x * feeHour + y * feeDay;
			if(time < 6){
				result --;
			}
			if(result > 80){
				error.innerHTML = "NB! Ööpäevaringse kuukaardi puhul maksaksid 80 eurot kuus!";
			}
			result = result + " €";
		}
		document.getElementById("message").innerHTML = result;
	};
	
	$.fn.datepicker.language['et'] = {
		days: ['Pühapäev', 'Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede', 'Laupäev'],
		daysShort: ['Püh', 'Esm', 'Tei', 'Kol', 'Nel', 'Ree', 'Lau'],
		daysMin: ['P', 'E', 'T', 'K', 'N', 'R', 'L'],
		months: ['Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni', 'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember'],
		monthsShort: ['Jaan', 'Veebr', 'Märts', 'Apr', 'Mai', 'Juuni', 'Juuli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dets'],
		today: 'Täna',
		clear: 'Tühjaks',
		dateFormat: 'dd/mm/yyyy',
		timeFormat: 'hh:ii aa',
		firstDay: 1
	};
	
	$('.datepicker-here').datepicker({
		language: 'et',
		minDate: new Date()
	});

	$('.datepicker-here').datepicker({
		onSelect: function(formattedDate, date, inst) {
			var id = inst.el.id;
			if(id == "start"){
				start = date;
			}else if(id == "end"){
				end = date;
			}
			if(notEmpty()){
				calculateTime();
			}
		}
	});

});