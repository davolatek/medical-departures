'use strict';
import serverless from 'serverless-http'
import app from './server'

module.exports.hello = serverless(app);
