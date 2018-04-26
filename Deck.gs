//デッキクラス
//ブラックジャックでの１揃えのトランプ
var Deck = function() {
  this.cardList = new CardList();
  for(var s = 0; s < SUITS.length; s++) {
    for(var i = 0; i < 13; i++) {
      var _card = new Card(i+1, SUITS[s]);
      this.cardList.cards.push(_card);
    }    
  }
}
