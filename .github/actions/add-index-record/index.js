const core = require('@actions/core');
const algoliasearch = require('algoliasearch');

const client = algoliasearch(core.getInput('app_id'), core.getInput('api_key'));
const index = client.initIndex(core.getInput('index_name'));

index.saveObject(object).then(({ objectID }) => {
  core.info(objectID);
});