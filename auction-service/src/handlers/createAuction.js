/** @format */
import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

// 你不能在 lambda function 中使用 global variable

/**
 *
 * @param {import('serverless').Event} event
 * @param {} context
 */
async function createAuction(event, context) {
    const { title } = JSON.parse(event.body);
    // const params = JSON.parse(event.queryStringParameters);

    const auction = {
        id: uuid(),
        title,
        status: 'open',
        createdAt: new Date().toISOString(),
    };

    await dynamodb
        .put({
            TableName: process.env.AUCTIONS_TABLE_NAME,
            Item: auction,
        })
        .promise();

    return {
        // HTTP 201 Created 成功狀態碼表示請求成功且有一個新的資源已經依據需要而被建立。
        statusCode: 201,
        body: JSON.stringify(auction),
    };
}

export const handler = createAuction;
