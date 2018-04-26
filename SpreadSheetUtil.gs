var ssUtil = null;

function getSSUtil() {
  if(ssUtil == null){
    ssUtil = new SpreadSheetUtil();
  }
  return ssUtil;
}

//スプレッドシートユーティリティ
var SpreadSheetUtil = function() {
  this.activeSheet = null;
  this.range = null;
  this.rangeArray = null;
  this.rowStart = 1;
  this.colStart = 1;
  this.rowNum = 1000;
  this.colNum = 2;
  this.loadRange(); 
}

//アクティブシート取得（シングルトン）
SpreadSheetUtil.prototype.getActiveSheet = function() {
  if(this.activeSheet == null) {
    this.activeSheet = SpreadsheetApp.getActive().getSheetByName('rooms');
  }
  return this.activeSheet;
}


//レンジをシートから強制取得
SpreadSheetUtil.prototype.loadRange = function() {
  this.range = this.getActiveSheet().getRange(this.rowStart, this.colStart, this.rowNum, this.colNum);
  this.rangeArray = this.range.getValues();
}

//レンジをシートへ保存
SpreadSheetUtil.prototype.saveRange = function() {
  if(this.range == null) {
    return;
  }
  if(this.rangeArray == null) {
    return;
  }
  this.range.setValues(this.rangeArray);
}

//セーブデータを配列へ保存
SpreadSheetUtil.prototype.setArrayInfo = function(info,row) {
  getSSUtil().rangeArray[row][1] = info;
}

//セーブデータを配列から取得
SpreadSheetUtil.prototype.getArrayInfo = function(row) {
  return getSSUtil().rangeArray[row][1]
}

//ルームIDを配列へ保存
SpreadSheetUtil.prototype.setArrayRid = function(rid,row) {
  getSSUtil().rangeArray[row][0] = rid;
}

//ルームIDを配列から取得
SpreadSheetUtil.prototype.getArrayRid = function(row) {
  return getSSUtil().rangeArray[row][0]
}