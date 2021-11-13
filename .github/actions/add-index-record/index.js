const { inspect } = require("util");
const core = require('@actions/core');
const algoliasearch = require('algoliasearch');

async function run() {
  try {
    const inputs = {
      appId: core.getInput('app_id'),
      apiKey: core.getInput('api_key'),
      indexName: core.getInput('index_name'),
      record: core.getInput('record'),
    };
    core.debug(`Inputs: ${inspect(inputs)}`);

    const client = algoliasearch(inputs.appId, inputs.apiKey);
    const index = client.initIndex(inputs.indexName);
    
    index.saveObject(inputs.record).then(({ objectID }) => {
      core.info(objectID);
    });
  } catch (error) {
    core.debug(inspect(error));
    core.setFailed(error.message);
    if (error.message == 'Resource not accessible by integration') {
      core.error(`See this action's readme for details about this error`);
    }
  }
}

run();