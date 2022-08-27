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

  //TODO: query()に渡すparamを宣言
  const param = {
    TableName: tableName,
    //キー、インデックスによる検索の定義
    KeyConditionExpression: "email = :email",
    //検索値のプレースホルダの定義
    ExpressionAttributeValues: {
      ":email": body.email,
    },
  };

  //dynamo.query()を用いてuserIdとpasswordが一致するデータの検索
  dynamo.query(param, function (err, data) {
    //userの取得に失敗
    if (err) {
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: "予期せぬエラーが発生しました",
      });
      callback(null, response);
      return;
    }
    //TODO: 該当するデータが見つからない場合の処理を記述(ヒント：data.Itemsの中身が空)
    if(!data.Items.length) {
      response.statusCode = 401;
      response.body = JSON.stringify({
        message: "emailまたはpasswordが一致しません",
      });
      callback(null, response);
      return;
    }

    //TODO: 認証が成功した場合のレスポンスボディとコールバックを記述
    response.body = JSON.stringify({
      token: "mtiToken",
    });
    callback(null, response);
    return;
  });
};
