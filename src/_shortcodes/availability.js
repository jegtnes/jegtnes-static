module.exports = function availability(availability, availabilityString, short = false) {
	if (short) {
		if (!availability) return "None currently";
		if(availabilityString && availabilityString.length) return `from ${availabilityString}`;
		return "Currently available";
	}

	if (!availability) return "I presently have no availability for new engagements.";

	if(availabilityString && availabilityString.length) return `<strong>I have availability for new remote engagements from ${availabilityString}</strong>.`;
  
	return "<strong>I have current availability for new remote engagements</strong>.";
};
