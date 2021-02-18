// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuther = require('../../../app/middleware/auther');

declare module 'egg' {
  interface IMiddleware {
    auther: typeof ExportAuther;
  }
}
