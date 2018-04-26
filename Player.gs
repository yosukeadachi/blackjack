//プレイヤークラス
//手役　
var Player = function() {
  this.hand = new CardList();
}

//シリアライズ
Player.prototype.serialize = function() {
  return this.hand.serialize();
}

//デシリアライズ
Player.prototype.deserialize = function(info) {
  this.hand.deserialize(info);
}