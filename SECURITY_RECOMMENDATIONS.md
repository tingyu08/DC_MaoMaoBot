# Security recommendations for DC_MaoMaoBot

This file lists practical, low-risk steps to protect secrets and harden the repository.

1. Keep secrets out of version control
   - Store tokens only in local `.env` (which must be listed in `.gitignore`).
   - Use a `.env.example` (tracked) with placeholder values — already present.

2. Rotate any exposed tokens immediately
   - If a token was ever committed/pushed, rotate it in the provider (Discord Developer Portal).

3. Enable GitHub protections
   - Enable Secret Scanning and Push Protection in the repository settings.
   - Add Branch Protection Rules for `main` (require PR reviews, status checks).

4. Add local pre-commit checks
   - Use `husky` + `lint-staged` or `pre-commit` to run a secret check before commit.
   - Simple tool: `detect-secrets` (Yelp) or `git-secrets`.

5. Use GitHub Secrets for CI
   - Put tokens in GitHub Actions secrets or your deployment environment variables, not in code.

6. Avoid selfbot usage
   - Selfbots violate Discord ToS. Remove or disable `selfbot` code from main flows; keep guides as docs if needed.

7. Monitoring & periodic scan
   - Periodically run `git grep -I -n "TOKEN\|token\|SECRET"` locally and review GitHub Security alerts.

---

If you want, I can:
- Add a husky pre-commit hook that runs a lightweight `git grep` for tokens.
- Add a GitHub Actions workflow template to check for secrets on PRs.

Tell me which of those you'd like me to implement next.
