/**
 * Find the minimum threshold rating for matching people, given some total number of people
 * @param  {[Number]} numPeople total number of people
 * @return {[Number]} threshold >= .25 and < .75
 */
function getThreshhold(numPeople) {
  return 0.5 * numPeople / (numPeople + 10) + 0.25;
}

module.exports = {
  getThreshhold;
}
