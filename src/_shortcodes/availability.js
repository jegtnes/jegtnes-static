function daysToStr(days) {
	switch (days) {
		case 4:
			return "four"
		case 3:
			return "three";
		case 2:
			return "two";
		case 1:
			return "one";
		default:
			return "zero";
	}
}

// good god this is horrible, pls fix
export default function availability(availabilityDays, availabilityString, short = false) {
	if (short) {
		if (!availabilityDays) return "None currently";
		if (availabilityDays === 5 && !availabilityString) return "Immediately available";
		let str = "";
		if (availabilityDays < 5) {
			str += `${daysToStr(availabilityDays)} days/week `
		}
		if (availabilityString && availabilityString.length) str += `from ${availabilityString}`;

		return str;
	}

	if (!availabilityDays) return "I presently have no availability for new engagements.";

	let str = "";
	let partTimeStr = "";
	const locationStr = "either remote or on-site in London.";

	if(!availabilityString) {
		str += "I have immediate availability for new engagements"
	} else {
		str += "I have availability for new engagements"
	}

	if (availabilityDays < 5) {
		partTimeStr += `on a part-time basis, up to ${daysToStr(availabilityDays)} days/week, `
	}

	return `<strong>${str}</strong>, ${partTimeStr} ${locationStr}`
};
