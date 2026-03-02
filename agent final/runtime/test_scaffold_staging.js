// Test runner for scaffold-staging-skill: dry-run and write-run
const path = require('path');

async function run() {
  const implPath = path.join(__dirname, 'skills_impl', 'scaffold-staging-skill.js');
  const impl = require(implPath);

  console.log('Running dry-run (no write)');
  const dry = await impl.execute({ project_name: 'DemoApp' });
  console.log(JSON.stringify(dry, null, 2));

  console.log('\nRunning actual write (allow_write=true)');
  const real = await impl.execute({ project_name: 'DemoApp', allow_write: true });
  console.log(JSON.stringify(real, null, 2));
}

run().catch(e=>{ console.error(e); process.exit(1); });
