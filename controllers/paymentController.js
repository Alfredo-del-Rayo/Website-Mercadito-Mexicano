  /*
        Copyright 2021 Square, Inc.

        Licensed under the Apache License, Version 2.0 (found at "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
  */


const debug = require('debug');
const Ajv = require('ajv/dist/jtd');
const retry = require('async-retry');
const Product = require('../models/product');
const nodemailer = require('nodemailer');

const logger = {
  info: console.info,
  error: console.error,
  debug: debug('sq-web-pay'),
};

const ajv = new Ajv();

const { config } = require('dotenv');

// package.json sets NODE_ENV in its scripts
const isProduction = process.env.NODE_ENV === 'production';

// load configuration based on environment
const { error, parsed } = config({
  path: '.env' 
});

if (error) {
  logger.error(`Error loading configuration: ${error}`);
}

// PROTIP: get more insight by running in debug mode: `DEBUG=* npm run dev`
logger.debug('Parsed configuration:', parsed);

const { ApiError, Client, Environment } = require('square');

const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;

const square = new Client({
  environment: isProduction ? Environment.Production : Environment.Sandbox,
  accessToken: SQUARE_ACCESS_TOKEN,
});

// JSON Type Definition schemas
const paymentSchema = {
  properties: {
    sourceId: { type: 'string' },
    locationId: { type: 'string' },
    idempotencyKey: { type: 'string' },
  },
  optionalProperties: {
    amount: { type: 'uint32' },
    customerId: { type: 'string' },
    verificationToken: { type: 'string' },
  },
};

const cardSchema = {
  properties: {
    sourceId: { type: 'string' },
    locationId: { type: 'string' },
    customerId: { type: 'string' },
    idempotencyKey: { type: 'string' },
  },
  optionalProperties: {
    verificationToken: { type: 'string' },
  },
};

const validatePaymentPayload = ajv.compile(paymentSchema);
const validateCreateCardPayload = ajv.compile(cardSchema);



const createPayment = async function createPayment(req, res) {
  try {
    const { idArray, ...payload } = req.body;
    console.log('this is array');
    console.log(JSON.stringify(idArray));
    console.log('this is payload')
    console.log(JSON.stringify(payload));

    logger.debug(JSON.stringify(payload));

    console.log(JSON.stringify(payload));

    if (!validatePaymentPayload(payload)) {
      return res.status(400).json({ error: 'Bad Request on Payment' });
    }

    await retry(async (bail, attempt) => {
      try {
        logger.debug('Creating payment', { attempt });

        const payment = {
          idempotencyKey: payload.idempotencyKey,
          locationId: payload.locationId,
          sourceId: payload.sourceId,
          amountMoney: {
            amount: payload.amount,
            currency: 'CAD',
          },
        };

        if (payload.customerId) {
          payment.customerId = payload.customerId;
        }

        if (payload.verificationToken) {
          payment.verificationToken = payload.verificationToken;
        }

        const { result, statusCode } = await square.paymentsApi.createPayment(
          payment
        );

        logger.info('Payment succeeded!', { result, statusCode });
       
        res.status(statusCode).json({
          success: true,
          payment: {
            id: result.payment.id,
            status: result.payment.status,
            receiptUrl: result.payment.receiptUrl,
            orderId: result.payment.orderId,
          },
        });
      } catch (ex) {
        if (ex instanceof ApiError) {
          logger.error(ex.errors);
          bail(ex);
        } else {
          logger.error(`Error creating payment on attempt ${attempt}: ${ex}`);
          throw ex;
        }
      }
    });
    try{
      let products = idArray;
      for (const product of products){
        await Product.removeProduct(product);
        console.log('success on removing product')
      }
    } catch(err){
      console.log(err)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const storeCard = async function storeCard(req, res) {
  try {
    const payload = req.body;

    if (!validateCreateCardPayload(payload)) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    await retry(async (bail, attempt) => {
      try {
        logger.debug('Storing card', { attempt });

        const cardReq = {
          idempotencyKey: payload.idempotencyKey,
          sourceId: payload.sourceId,
          card: {
            customerId: payload.customerId,
          },
        };

        if (payload.verificationToken) {
          cardReq.verificationToken = payload.verificationToken;
        }

        const { result, statusCode } = await square.cardsApi.createCard(
          cardReq
        );

        logger.info('Store Card succeeded!', { result, statusCode });

        delete result.card.expMonth;
        delete result.card.expYear;
       

        res.status(statusCode).json({
          success: true,
          card: result.card,
        });
      } catch (ex) {
        if (ex instanceof ApiError) {
          logger.error(ex.errors);
          bail(ex);
        } else {
          logger.error(
            `Error creating card-on-file on attempt ${attempt}: ${ex}`
          );
          throw ex;
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {storeCard, createPayment};




