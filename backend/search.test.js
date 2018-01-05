const searchFunctions = require('./search.js');

var max = Number.MAX_VALUE
var User0 = new searchFunctions.User(0, 0, 3, [max,1,1,2,2]);
var User1 = new searchFunctions.User(1, 0, 2, [1,max,2,2,1]);
var User2 = new searchFunctions.User(2, 0, 4, [1,2,max,1,1]);
var User3 = new searchFunctions.User(3, 1, 4, [2,2,1,max,3]);
var User4 = new searchFunctions.User(4, 0, 2, [2,1,1,3,max]);

var userArrFull = [User0, User1, User2, User3, User4];
var userArrBadSize = [User2, User3, User4];
var userArrNeedsMod = [User4, User1, User3];

test('arrayContains does not contain', () =>{
	expect(searchFunctions.arrayContains(userArrFull, -1)).toBe(false);
});

test('arrayContains contains', ()=>{
	expect(searchFunctions.arrayContains(userArrFull, 4)).toBe(true);
});

test('minsAcross all equal', ()=>{
	expect(searchFunctions.minsAcross([1,2,3,4,5], [1,2,3,4,5])).toEqual([1,2,3,4,5]);
});

test('minsAcross different', ()=>{
	expect(searchFunctions.minsAcross(User3.data, User4.data)).toEqual([2,1,1,3,3]);
});

test('checkSize not possible (expected empty)', ()=>{
	expect(searchFunctions.checkSize(userArrBadSize)).toEqual(new Array());
});

test('checkSize nothing should change', ()=>{
	expect(searchFunctions.checkSize(userArrFull)).toEqual(userArrFull);
});

test('checkSize must remove some', ()=>{
	expect(searchFunctions.checkSize(userArrNeedsMod)).toEqual([User4, User1]);
});

test('checkWalkAlone pass', ()=>{
	expect(searchFunctions.checkWalkAlone(userArrFull)).toEqual(userArrFull);
});

test('checkWalkAlone fail', ()=>{
	expect(searchFunctions.checkWalkAlone(searchFunctions.checkSize(userArrNeedsMod))).toEqual(new Array());
});