export const getDateTime = (theDate, isUtc = true, symbol = "/") => {
	//theDate = '2024-06-12 10:05:04.830'

	// Helper method to convert 24 hour time to 12 hour time
	function determineHour(hour24) {
		// console.log(hour24);
		hour24 = String(hour24);
		if (
			[
				"0",
				"00",
				"01",
				"02",
				"03",
				"04",
				"05",
				"06",
				"07",
				"08",
				"09",
				"10",
				"11",
			].includes(hour24)
		) {
			if (hour24 == "0" || hour24 == "00") {
				var convHour = "12";
				hour24 = "00";
			} else {
				var convHour = hour24;
			}
			var convPart = "AM";
		} else {
			if (hour24 == "12") {
				var convHour = "12";
			} else {
				var convHour = parseInt(hour24) - 12;
			}
			var convPart = "PM";
			if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(convHour)) {
				convHour = `0${convHour}`;
			}
		}

		return { hour12: String(convHour), hour24: String(hour24), amPm: convPart };
	}

	// Prepare the server date for timezone conversion (if applicable)
	if (isUtc) {
		theDate = theDate.replace(" ", "T") + "Z";
	}

	// Get date pieces
	let dateObj = new Date(theDate);

	let month = dateObj.getMonth() + 1;
	let day = dateObj.getDate();
	let year = dateObj.getFullYear();
	var hour = dateObj.getHours();
	let minute = dateObj.getMinutes();
	let seconds = dateObj.getSeconds();
	let monthName = dateObj.toLocaleString("default", { month: "long" });
	let monthNameShort = dateObj.toLocaleString("default", { month: "short" });
	let weekdayInt = dateObj.getDay();
	var weekday = "";
	var weekdayShort = "";

	// Determine weekday
	if (weekdayInt == 0) {
		weekday = "Sunday";
		weekdayShort = "Sun";
	} else if (weekdayInt == 1) {
		weekday = "Monday";
		weekdayShort = "Mon";
	} else if (weekdayInt == 2) {
		weekday = "Tuesday";
		weekdayShort = "Tue";
	} else if (weekdayInt == 3) {
		weekday = "Wednesday";
		weekdayShort = "Wed";
	} else if (weekdayInt == 4) {
		weekday = "Thursday";
		weekdayShort = "Thu";
	} else if (weekdayInt == 5) {
		weekday = "Friday";
		weekdayShort = "Fri";
	} else if (weekdayInt == 6) {
		weekday = "Saturday";
		weekdayShort = "Sat";
	}

	// Add leading zeros to single digit numbers
	if (![10, 11, 12].includes(month)) {
		month = `0${month}`;
	}
	if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(day)) {
		day = `0${day}`;
	}
	if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(hour)) {
		hour = `0${hour}`;
	}
	if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(minute)) {
		minute = `0${minute}`;
	}
	if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(seconds)) {
		seconds = `0${seconds}`;
	}

	var hourObj = determineHour(hour);

	// Create time and date
	let time12 = `${hourObj.hour12}:${minute} ${hourObj.amPm}`;
	let time24 = `${hourObj.hour24}:${minute}`;
	let fullTime12 = `${hourObj.hour12}:${minute}:${seconds} ${hourObj.amPm}`;
	let fullTime24 = `${hourObj.hour24}:${minute}:${seconds}`;

	let date = `${month}${symbol}${day}${symbol}${year}`;
	let datetime12 = `${date} ${time12}`;
	let datetime24 = `${date} ${time24}`;
	let datetimeWithSeconds12 = `${date} ${fullTime12}`;
	let datetimeWithSeconds24 = `${date} ${fullTime24}`;

	// Return object
	let obj = {
		date: date,
		datetime12: datetime12,
		datetime24: datetime24,
		datetimeWithSeconds12: datetimeWithSeconds12,
		datetimeWithSeconds24: datetimeWithSeconds24,
		time12: time12,
		time24: time24,
		fullTime12: fullTime12,
		fullTime24: fullTime24,

		month: month,
		monthName: monthName,
		monthNameShort: monthNameShort,
		day: String(day),
		weekday: weekday,
		weekdayShort: weekdayShort,
		year: String(year),

		hour12: hourObj.hour12,
		hour24: hourObj.hour24,
		minute: minute,
		seconds: seconds,
	};
	// uncomment to see parts in console
	// console.log(obj);
	return obj;
};

// format words to title case
export const toTitleCase = (str) => {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};
