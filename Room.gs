//ルームクラス
//現在のゲーム状態を保持する
var Room = function(roomNumber) {
  this.number = roomNumber;
  this.gameManager = null;
  this.serializeSeparator = '&';
  
  //ディーラー準備
  var _dealer = new Dealer();
  
  //プレイヤー準備
  var _players = [];
  var numberOfPlayer = 1;//プレイヤー１人とする
  for(var i = 0; i < numberOfPlayer; i++) {
    _players.push(new Player());
  }
  
  //ゲーム進行役準備
  this.gameManager = new GameManager(_dealer, _players);

}

//ルーム状況を保存
Room.prototype.save = function() {
  var _info = this.serialize();
  getSSUtil().setArrayInfo(_info, parseInt(this.number));
  getSSUtil().saveRange();
}

//ルーム状況を読み出し
Room.prototype.load = function() {
  getSSUtil().loadRange();
  this.deserialize(getSSUtil().getArrayInfo(parseInt(this.number)));
}

//シリアライズ
Room.prototype.serialize = function() {
  var _array = []
  _array.push(this.gameManager.dealer.serialize());
  for(var i = 0; i < this.gameManager.players.length; i++) {
    _array.push(this.gameManager.players[i].serialize());
  }
  return _array.join(this.serializeSeparator);
}

//デシリアライズ
Room.prototype.deserialize = function(info) {
  var _array = info.split(this.serializeSeparator);
  this.gameManager.dealer.deserialize(_array.shift());
  for(var i = 0; i < this.gameManager.players.length; i++) {
    this.gameManager.players[i].deserialize(_array.shift());
  }
}