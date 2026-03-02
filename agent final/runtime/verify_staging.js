const fs = require('fs');
const path = require('path');

function latestDir(root) {
  if (!fs.existsSync(root)) return null;
  const children = fs.readdirSync(root).map(name => ({ name, stat: fs.statSync(path.join(root, name)) }));
  const dirs = children.filter(c => c.stat.isDirectory()).sort((a,b)=> b.stat.mtimeMs - a.stat.mtimeMs);
  return dirs.length ? path.join(root, dirs[0].name) : null;
}

function safeReadJSON(p) {
  try { return JSON.parse(fs.readFileSync(p,'utf8')); } catch (e) { return null; }
}

function run() {
  const staging = path.join(__dirname, '..', 'staging');
  const latest = latestDir(staging);
  if (!latest) {
    console.log('No staging folders found under', staging);
    process.exit(1);
  }

  console.log('Latest staging folder:', latest);

  const backendPkg = path.join(latest, 'backend', 'package.json');
  const backendSrv = path.join(latest, 'backend', 'server.js');
  const frontendIndex = path.join(latest, 'frontend', 'index.html');

  console.log('\nTop-level files:');
  fs.readdirSync(latest).forEach(f=> console.log(' -', f));

  console.log('\nBackend files:');
  if (fs.existsSync(backendPkg)) {
    console.log(' - package.json (exists)');
    const pkg = safeReadJSON(backendPkg);
    if (pkg) console.log('   name:', pkg.name, 'scripts:', Object.keys(pkg.scripts||{}).join(', '));
  } else console.log(' - package.json (missing)');

  console.log(' - server.js:', fs.existsSync(backendSrv) ? 'exists' : 'missing');

  console.log('\nFrontend files:');
  console.log(' - index.html:', fs.existsSync(frontendIndex) ? 'exists' : 'missing');

  console.log('\nREADME snippet:');
  const readme = path.join(latest, 'README.md');
  if (fs.existsSync(readme)) console.log(fs.readFileSync(readme,'utf8').split('\n').slice(0,8).join('\n'));
  else console.log(' README.md missing');
}

run();
