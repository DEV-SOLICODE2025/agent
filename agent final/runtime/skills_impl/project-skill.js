// Dry-run implementation for project-skill (init-project)
// Returns a promise-resolving result with artifacts describing what would be created.

exports.execute = async function(inputs) {
  const required = [ 'project_name', 'database_name' ];
  const missing = required.filter(k => inputs[k] === undefined);
  if (missing.length) {
    return { status: 'failed', error: `Missing required inputs: ${missing.join(', ')}`, artifacts: [] };
  }

  const project = inputs.project_name;
  const db = inputs.database_name;
  const include_frontend = !!inputs.frontend_required || !!inputs.include_frontend;
  const include_auth = !!inputs.auth_required || !!inputs.include_auth;

  const artifacts = [];
  artifacts.push(`backend/ (laravel) initialized for project ${project}`);
  artifacts.push(`backend/.env configured with DB=${db}`);
  artifacts.push('backend/artisan exists (simulated)');
  artifacts.push('app/Services/ (service layer directory) created');

  if (include_auth) {
    artifacts.push('sanctum installed (simulated)');
    artifacts.push('auth routes scaffolded');
  }
  if (include_frontend) {
    artifacts.push('frontend (Vite + React) scaffolded');
    artifacts.push('tailwind installed');
  }

  // Provide a small plan the orchestrator can show
  const plan = {
    steps: [
      'Create Laravel project skeleton',
      'Configure .env and APP_KEY',
      include_auth ? 'Install and configure Sanctum' : null,
      include_frontend ? 'Scaffold Vite React app and install Tailwind' : null,
      'Create health endpoint /api/health'
    ].filter(Boolean)
  };

  return { status: 'success', artifacts, plan };
};
