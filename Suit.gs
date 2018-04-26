//スートクラス
var Suit = function(shortName) {
  this.name = '';
  this.color = '';
  this.shortName = '';
  this.setShortName(shortName);
}
  
//名称から設定
Suit.prototype.setShortName = function(shortName) {
  this.shortName = shortName;
  switch(shortName) {
  case 'S':
    this.name = 'spade';
    this.color = 'black';
    break;
  case 'C':
    this.name = 'club';
    this.color = 'black';
    break;
  case 'D':
    this.name = 'daia';
    this.color = 'red';
    break;
  case 'H':
    this.name = 'heart';
    this.color = 'red';
    break;
  }
}
  
//シリアライズ
Suit.prototype.serialize = function() {
  return this.shortName;
}

//デシリアライズ
Suit.prototype.deserialize = function(shortName) {
  this.setShortName(shortName);
}

var SUIT_SPADE = new Suit('S');//スペード
var SUIT_CLUB = new Suit('C');//クラブ
var SUIT_DAIA = new Suit('D');//ダイア
var SUIT_HEART = new Suit('H');//ハート

var SUITS = [
  SUIT_SPADE,
  SUIT_CLUB,
  SUIT_DAIA,
  SUIT_HEART,
];