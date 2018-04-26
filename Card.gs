//カードクラス
var Card = function (number, suit) {
  this.number = number;
  this.suit = suit;
  this.serializeSeparator = '^';
}

//カード表示名
Card.prototype.nameNumber = function() {
  if(this.number == 1) {
    return 'A';
  } else if(this.number == 11) {
    return 'J';
  } else if(this.number == 12) {
    return 'Q';
  } else if(this.number == 13) {
    return 'K';
  } else {
    return String(this.number);
  }
}

//カード　スートと表示名
Card.prototype.nameFull = function() {
  return this.suit.name + '/' + this.nameNumber();
}

//シリアライズ
Card.prototype.serialize = function() {
  var _array = [];
  _array.push(this.suit.serialize());
  _array.push(String(this.number));
  return _array.join(this.serializeSeparator); 
}

//デシリアライズ
Card.prototype.deserialize = function(info) {
  var _array = info.split(this.serializeSeparator);
  this.suit = new Suit(_array[0]);
  this.number = parseInt(_array[1]);
}