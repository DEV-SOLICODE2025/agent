// Test runner to generate a staging folder with Vite + React frontend
const path = require('path');

async function run() {
  const implPath = path.join(__dirname, 'skills_impl', 'scaffold-staging-skill.js');
  const impl = require(implPath);

  console.log('Creating Vite+React staging (allow_write=true)');
  const res = await impl.execute({ project_name: 'ViteDemo', allow_write: true, frontend_template: 'vite' });
  console.log(JSON.stringify(res, null, 2));
}

run().catch(e=>{ console.error(e); process.exit(1); });
