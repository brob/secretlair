const { inspect } = require("util");
const core = require('@actions/core');
const algoliasearch = require('algoliasearch');

async function run() {
  try {
    core.info('Writing record to index')
    const inputs = {
      appId: core.getInput('app_id'),
      apiKey: core.getInput('api_key'),
      indexName: core.getInput('index_name'),
      record: core.getInput('record'),
    };
    core.debug(`Inputs: ${inspect(inputs)}`);

    if (!inputs.appId && !inputs.apiKey && !inputs.indexName) {
      core.setFailed("Missing one or more of Algolia app id, API key, or index name.");
      return;
    }

    const client = algoliasearch(inputs.appId, inputs.apiKey);
    const index = client.initIndex(inputs.indexName);

    index.saveObject(JSON.parse(inputs.record), {'autoGenerateObjectIDIfNotExist': true})
      .then(({ objectID }) => {
        `Created record in index ${input.indexName} with objectID ${objectID}.`
      })
      .catch((err) => {
        core.error(err);
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