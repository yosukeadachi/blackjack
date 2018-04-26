//カードリストクラス
var CardList = function() {
  this.cards = [];
  this.serializeSeparator = '_';
}

//シャッフル
CardList.prototype.shuffle = function() {
  for(var i = this.cards.length - 1; i > 0; i--) {
    var r = Math.floor(Math.random() * (i+1));
    var tmp = this.cards[i];
    this.cards[i] = this.cards[r];
    this.cards[r] = tmp;
  }
}

//シリアライズ
CardList.prototype.serialize = function() {
  var _array = [];
  for(var i = 0; i < this.cards.length; i++) {
    _array.push(this.cards[i].serialize());
  }
  return _array.join(this.serializeSeparator);
}

//デシリアライズ
CardList.prototype.deserialize = function(info) {
  this.cards = [];
  var _array = info.split(this.serializeSeparator);
  for(var i = 0; i < _array.length; i++) {
    var _card = new Card();
    _card.deserialize(_array[i]);
    this.cards.push(_card);
  }
}