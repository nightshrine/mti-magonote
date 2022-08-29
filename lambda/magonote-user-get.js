const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = "magonote_users";

exports.handler = (event, context, callback) => {
  //レスポンスの雛形
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  const id = event.queryStringParameters.id; //見たいユーザのid

  //TODO: 取得対象のテーブル名と検索に使うキーをparamに宣言
  const param = {
    "TableName" : tableName,
    "Key" : {
      id
    }
  };

  //dynamo.get()でDBからデータを取得
  dynamo.get(param, function (err, data) {
    if (err) {
      console.log(err);
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: "予期せぬエラーが発生しました",
        err: err
      });
      callback(null, response);
      return;
    }
    
    const user = data.Item;

    //TODO: レスポンスボディの設定とコールバックを記述
    response.body = JSON.stringify(user);
    callback(null, response);
    return;
  });
};
