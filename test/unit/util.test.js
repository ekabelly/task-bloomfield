const expect = require('chai').expect;
const user = { firstName: 'firstName', lastName:'lastName', occupation: 'occupation' };
const { transformUsersObjToArr } = require('../../util/app-util');

describe('Util Unit Tests', () => {
    it('expect users objects arr to return as users arr of sorted arr with uniqueId', () => {
        const usersArrArr = transformUsersObjToArr(new Array(3).fill(user), '1234');
        expect(usersArrArr.every(arr => 
            arr.length === 5 && arr[0] === 'firstName' && arr[1] === 'lastName' && arr[2] === 'occupation' && arr[4] === '1234'))
        .to.be.true;
    })
})