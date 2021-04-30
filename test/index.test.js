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

/* eslint-env mocha */

const assert = require('assert');
const { Request } = require('@adobe/helix-universal');
const { retrofit } = require('./utils.js');
const { main } = require('../src/index.js');
const config = require('./fixtures/blog-config.json');

const index = retrofit(main);

describe('Index Tests', () => {
  it('index function is present', async () => {
    const result = await index();
    assert.deepEqual(result.body, '{}');
  });

  it('index function aggregates config', async () => {
    const result = await main(new Request('https://helix-service.com/aggregate?owner=adobe&repo=theblog&ref=10c716c1ddaa8df482aea4220b36a4a578da5b2c'),
      {});
    assert.deepEqual(await result.json(), config);
  });
});
