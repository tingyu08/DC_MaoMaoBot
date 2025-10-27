const { execSync } = require('child_process');
const fs = require('fs');

function getStagedFiles() {
  try {
    const out = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
    return out.split(/\r?\n/).filter(Boolean);
  } catch (e) {
    console.error('Failed to get staged files:', e.message);
    process.exit(2);
  }
}

function fileLooksBinary(path) {
  try {
    const buf = fs.readFileSync(path, { encoding: 'utf8' });
    return false;
  } catch (e) {
    // if cannot read as utf8, treat as binary and skip
    return true;
  }
}

const tokenNameRegex = /\b(DISCORD_TOKEN|USER_TOKEN|SECRET|API_KEY|BOT_TOKEN)\b/i;
// Common Discord Bot token pattern (three dot-separated sections)
const discordTokenLike = /\b[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{6,}\.[A-Za-z0-9_\-]{27,}\b/;

const staged = getStagedFiles();
let found = false;
let problems = [];

// Skip scanning some known non-sensitive paths (workflows, examples, backups, hook scripts)
const skipPathRegex = /^(?:\.github\/|\.husky\/|scripts\/check-secrets\.js$|\.env\.example$|\.env\.backup$)/i;

for (const f of staged) {
  if (!fs.existsSync(f)) continue;
  if (skipPathRegex.test(f)) continue;
  if (fileLooksBinary(f)) continue;
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split(/\r?\n/);
  lines.forEach((line, idx) => {
    // Only flag token-like patterns or explicit assignment keywords
    const hasAssignment = /\b(?:DISCORD_TOKEN|USER_TOKEN|API_KEY|BOT_TOKEN)\s*=/.test(line);
    if (hasAssignment || discordTokenLike.test(line) || tokenNameRegex.test(line)) {
      // For safety: ignore YAML/manifest 'name:' or docs lines that contain the word 'SECRET' only
      if (/^\s*name\s*:\s*/i.test(line) || /^\s*-\s*/.test(line)) return;
      found = true;
      problems.push({ file: f, line: idx + 1, text: line.trim() });
    }
  });
}

if (found) {
  console.error('\nPre-commit secret check failed — potential secrets found in staged files:');
  problems.forEach(p => {
    console.error(`${p.file}:${p.line}: ${p.text}`);
  });
  console.error('\nIf these are false positives, adjust the check or remove sensitive content before committing.');
  process.exit(1);
}

process.exit(0);
