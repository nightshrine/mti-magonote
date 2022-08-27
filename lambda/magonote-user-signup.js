const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = "magonote_users";

exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  const body = JSON.parse(event.body);

  //TODO: DBに登録するための情報をparamオブジェクトとして宣言する（中身を記述）
  const param = {
    TableName: tableName,
    Item: {
      email : body.email,
      name: body.name,
      password: body.password,
      height: body.height,
      weight: body.weight,
      level: body.level,
    }
  };

  //dynamo.put()でDBにデータを登録
  dynamo.put(param, function (err, data) {
    if (err) {
      console.log(err);
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: "予期せぬエラーが発生しました",
        err: err
      });
      callback(null, response);
      return;
    } else {
      //TODO: 登録に成功した場合の処理を記述
      response.body = JSON.stringify({
        message: "登録成功しました"
      })
      callback(null, response);
      return;
    }
  });
};
