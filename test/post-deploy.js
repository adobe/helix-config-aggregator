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
/* eslint-disable no-unused-expressions */

const chai = require('chai');
const chaiHttp = require('chai-http');
const { createTargets } = require('./post-deploy-utils.js');
const config = require('./fixtures/blog-config.json');

chai.use(chaiHttp);
const { expect } = chai;

createTargets().forEach((target) => {
  describe(`Post-Deploy Tests (${target.title()})`, () => {
    it('Load a config', async () => {
      await chai
        .request(target.host())
        .get(`${target.urlPath()}?owner=adobe&repo=theblog&ref=10c716c1ddaa8df482aea4220b36a4a578da5b2c`)
        .then((response) => {
          expect(response).to.have.status(200);
          expect(response).to.be.json;
          expect(response.body).to.be.an('object');
          expect(response.body).to.deep.equal(config);
        }).catch((e) => {
          throw e;
        });
    }).timeout(50000);
  });
});
