var person = {};

var bank = {
	funds: 0,
	receiveDepositFrom: function(person){
		this.funds += person.funds;
		person.funds = 0;
	}
};

console.log(person.funds); //undefined!

person.funds = (function work(){
	return 100;

})();

console.log(person.funds); //100

bank.receiveDepositFrom(person); //

console.log(person.funds);