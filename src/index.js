/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const wrap = require('@adobe/helix-shared-wrap');
const { optionalConfig } = require('@adobe/helix-shared-config');
const { logger } = require('@adobe/helix-universal-logger');
const { wrap: status } = require('@adobe/helix-status');
const { Response } = require('@adobe/helix-universal');

/**
 * A small function that takes all available configurations and returns them as JSON.
 * @param {Request} request the request object (see fetch api)
 * @param {UniversalContext} context the context of the universal serverless function
 * @returns {Response} a response
 */
function main(request, context) {
  const aggregate = Object.keys(context.config).reduce((agg, name) => {
    if (context.config[name] && typeof context.config[name].toJSON === 'function') {
      // eslint-disable-next-line no-param-reassign
      agg[name] = context.config[name].toJSON();
    }
    return agg;
  }, {});

  return new Response(JSON.stringify(aggregate), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

module.exports.main = wrap(main)
  .with(status)
  .with(optionalConfig, 'redirect', 'fstab', 'markup', 'index')
  .with(logger.trace)
  .with(logger);
