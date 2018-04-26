//ゲーム進行管理クラス
var GameManager = function(dealer, players) {
  this.dealer = dealer;
  this.players = players;
}

GameManager.prototype.start = function() {
  //カード準備
  var numberOfDeck = 1;//1デッキとする
  var _decks = [];
  for(var i = 0; i < numberOfDeck; i++) {
    _decks.push(new Deck());
  }
  
  //カード受け取り
  this.dealer.takeDecks(_decks);
  
  //カードシャッフル
  this.dealer.shuffleCards();
  
  //全員に配る
  this.dealAll();
}


//カードを全員に配る
GameManager.prototype.dealAll = function() {
  this.dealPlayers();
  
  if(!this.isBurstHands(this.dealer.hand)) {
    this.dealer.dealDealerHands();
  }
}

//プレイヤーに配る
GameManager.prototype.dealPlayers = function() {
  for(var i = 0; i < this.players.length; i++) {
    var _player = this.players[i];
    if(!this.isBurstHands(_player.hand)) {
      this.dealer.dealPlayerHands(_player);
    }
  }
}

//カードをディーラーだけに１７以上になるまで配る
GameManager.prototype.dealOnlyDealer = function() {
  while(this.canDealDealer()) {
    this.dealer.dealDealerHands();
  }
}

//手役破棄
GameManager.prototype.discard = function() {
  this.dealer.discardDealerHands();
  for(var i = 0; i < this.players.length; i++) {
    this.dealer.discardPlayerHands(this.players[i]);
  }
}

//手役計算
GameManager.prototype.calcHandsValues = function(cardList) {
  var _value = 0;
  for(var i = 0; i < cardList.cards.length; i++) {
    _value += this.calcCardValue(cardList.cards[i]);
  }
  var _values = [];
  _values.push(_value);
  //もし1があって+10しても合計が21を超えなければ、１度だけ1を11としてカウントする
  //つまり
  //もし1があって+10しても合計が21を超えなければ、+10する。
  for(var i = 0; i < cardList.cards.length; i++) {
    if(cardList.cards[i].number == 1) {
      if(_value+10 <= 21) {
        _values.push(_value+10);
      }
    }
  }
  return _values;
}

//最高手役計算
GameManager.prototype.calcMaxHandsValue = function(cardList) {
  var _values = this.calcHandsValues(cardList);
  var _max = _values[0];
  for(var i = 0; i < _values.length; i++) {
    if(_max < _values[i]) {
      _max = _values[i];
    }
  }
  return _max;
}

//最低手役計算
GameManager.prototype.calcMiniHandsValue = function(cardList) {
  var _values = this.calcHandsValues(cardList);
  var _mini = _values[0];
  for(var i = 0; i < _values.length; i++) {
    if(_mini > _values[i]) {
      _mini = _values[i];
    }
  }
  return _mini;
}


//カード価値
//ブラックジャックでの価値
GameManager.prototype.calcCardValue = function(card) {
  if((card.number == 11) || (card.number == 12) || (card.number == 13)) {
    return 10;
  } else {
    return card.number;
  }
}

//バースト判定
GameManager.prototype.isBurstHands = function(cardList) {
  if(this.calcMaxHandsValue(cardList) > 21) {
    return true;
  }
  return false;
}

//ディーラーがディーラー手役に配るか？
//点数が１７未満　配る
//点数が１７以上　配らない
GameManager.prototype.canDealDealer = function() {
  if(this.calcMiniHandsValue(this.dealer.hand) < 17) {
    return true;
  }
  return false;
}


//カード終了判定
GameManager.prototype.isEndCards = function() {
  if(this.dealer.stack.cards.length < 10) {
    return true;
  }
  return false;
}
