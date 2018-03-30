/**
 * Find the minimum threshold rating for matching people, given some total number of people
 * @param  {[Number]} numPeople total number of people
 * @return {[Number]} threshold >= 0 and < 1
 */
function getThreshhold(numPeople) {
  /*
  if (numPeople >= 2 && numPeople < 10)
  	return 0.2;
  else if (numPeople >=10 && numPeople < 20)
  	return 0.3;*/
  const SCALING_FACT = 10;
  return numPeople / (numPeople + SCALING_FACT);
}

module.exports = {
  getThreshhold;
}
