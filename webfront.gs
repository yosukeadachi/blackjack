//html側でも使うオブジェクト定義
var parameter = '';
var room = null;
var errorMsg = '';

//GETフロントエンド
function doGet(e) {
  parameter = e.parameter;
  if(e.parameter.rid == '' || e.parameter.rid === undefined) {
    return HtmlService.createTemplateFromFile("auth").evaluate();
  }
  var _rid = e.parameter.rid;
  //ルーム番号取得
  var _roomNum = getRoomNumber(_rid);
  Logger.log(_roomNum);
  if(_roomNum < 0) {
    _roomNum = getNewRoomNumber();
    if(_roomNum < 0) {
      errorMsg = 'ユーザー制限エラー:登録ユーザーがいっぱいです。';
      return HtmlService.createTemplateFromFile("error").evaluate();
    }
    getSSUtil().setArrayRid(_rid, _roomNum);
    getSSUtil().saveRange();
  }
  Logger.log(_roomNum);
  
  room = new Room(_roomNum);
  switch(e.parameter.status) {
    default:
    case 'start':
      room.gameManager.start();
      room.save();
      break;
    case 'continue':
      room.load();
      room.gameManager.discard();
      room.gameManager.dealAll();
      room.save();
      break;
    case 'draw':
      room.load();
      room.gameManager.dealPlayers();
      room.save();
      break;
    case 'stay':
      room.load();
      room.gameManager.dealOnlyDealer();
      room.save();
      break;
  }
  return HtmlService.createTemplateFromFile("top").evaluate();
}

//HTMLへの受け渡し
function getParameter() {
  return parameter;
}

//HTMLへの受け渡し
function getRoom() {
  return room;
}

//HTMLへの受け渡し
function getErrorMsg() {
  return errorMsg;
}


//ルームIDからルーム番号取得
function getRoomNumber(rid) {
  for(var i = 0;i < getSSUtil().rowNum; i++) {
    if(getSSUtil().getArrayRid(i) == rid) {
      return i;
    }
  }
  return -1;
}

//新しいルーム番号取得
function getNewRoomNumber() {
  for(var i = 0;i < getSSUtil().rowNum; i++) {
    if(getSSUtil().getArrayRid(i) == 'dummy') {
      return i;
    }
  }
  return -1;
}
  
//debug
function debug() {
  var _room = new Room(0);
  _room.gameManager.start();
  _room.save();
  _room.load();
  var _room = new Room(0);
  _room.load();
  _room.gameManager.dealOnlyDealer();
  _room.save();
  var _room = new Room(0);
  _room.load();
  _room.gameManager.discard();
  _room.gameManager.dealAll();
  _room.save();
}