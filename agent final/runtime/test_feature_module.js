// Quick test runner for the feature-module-skill
const path = require('path');

async function run() {
  const implPath = path.join(__dirname, 'skills_impl', 'feature-module-skill.js');
  const impl = require(implPath);
  const inputs = {
    module_name: 'Article',
    fields: ['title', 'body', 'author_id'],
    relations: ['author:users'],
    protected: 'true',
    pagination: 'true',
    include_frontend: true
  };

  try {
    const res = await impl.execute(inputs);
    console.log('---- feature-module-skill test result ----');
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.error('Skill test failed:', e);
    process.exit(1);
  }
}

run();
