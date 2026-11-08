# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 0.1.x   | ✅        |

## Reporting a Vulnerability

Please report security vulnerabilities privately through GitHub's
[private vulnerability reporting](https://github.com/sopwise-ai/cikuku/security/advisories/new).

Do not open a public issue for security reports. We will acknowledge the report,
investigate it, and coordinate a fix and disclosure with you.

## Content Security Policy

All routes send a baseline Content Security Policy. `script-src` allows
`'unsafe-inline'` because the App Router emits inline bootstrap scripts without
a nonce, while `script-src-attr 'none'` blocks inline event handlers. The
baseline limits which origins can load resources, but it is not XSS-proof.

A nonce-based policy requires dynamic rendering, which conflicts with the
static shell enabled by `cacheComponents`. If a route needs stronger
protection, generate a nonce in `proxy.ts` and send the policy from there for
that route only.
