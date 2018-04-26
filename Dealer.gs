//ディーラークラス
//カードを持って、シャッフルして、配る
var Dealer = function() {
  this.stack = new CardList();
  this.hand = new CardList();
  this.serializeSeparator = '/';
}

//デッキからカードを受け取る
Dealer.prototype.takeDecks = function(decks) {
  for(var i = 0; i < decks.length; i++) {
    var deck = decks[i];
    var _length = deck.cardList.cards.length;
    for(var j = 0; j < _length; j++) {
      this.stack.cards.push(deck.cardList.cards.pop());
    }
  }
}

//カードシャッフル
Dealer.prototype.shuffleCards = function() {
  this.stack.shuffle();
}

//ディーラーに配る
Dealer.prototype.dealDealerHands = function() {
  this.hand.cards.push(this.stack.cards.pop());
}

//プレイヤーに配る
Dealer.prototype.dealPlayerHands = function(player) {
  player.hand.cards.push(this.stack.cards.pop());
}

//ディーラーの手役を破棄
Dealer.prototype.discardDealerHands = function() {
  var _length = this.hand.cards.length;
  for(var i = 0; i < _length; i++) {
    this.hand.cards.pop();
  }
}

//プレイヤーの手役を破棄
Dealer.prototype.discardPlayerHands = function(player) {
  var _length = player.hand.cards.length;
  for(var i = 0; i < _length; i++) {
    player.hand.cards.pop();
  }
}

//シリアライズ
Dealer.prototype.serialize = function() {
  var _array = [];
  _array.push(this.hand.serialize());
  _array.push(this.stack.serialize());
  return _array.join(this.serializeSeparator);
}

//デシリアライズ
Dealer.prototype.deserialize = function(info) {
  var _array = info.split(this.serializeSeparator);
  this.hand.deserialize(_array[0]);
  this.stack.deserialize(_array[1]);
}