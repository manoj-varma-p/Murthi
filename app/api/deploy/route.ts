import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST() {
  const results: { step: string; success: boolean; output?: string; error?: string }[] = [];

  // ── 1. Git add ────────────────────────────────────────────────────────────
  try {
    const { stdout } = await execAsync('git add -A', {
      cwd: process.cwd(),
    });
    results.push({ step: 'git add', success: true, output: stdout || 'ok' });
  } catch (err: unknown) {
    const error = err as { message?: string };
    results.push({ step: 'git add', success: false, error: error?.message });
  }

  // ── 2. Git commit ─────────────────────────────────────────────────────────
  try {
    const { stdout } = await execAsync(
      `git commit -m "chore: cv downloaded – auto-deploy ${new Date().toISOString()}"`,
      { cwd: process.cwd() }
    );
    results.push({ step: 'git commit', success: true, output: stdout });
  } catch (err: unknown) {
    const error = err as { message?: string };
    // "nothing to commit" is not a real failure
    const msg = error?.message ?? '';
    if (msg.includes('nothing to commit')) {
      results.push({ step: 'git commit', success: true, output: 'nothing to commit, skipping' });
    } else {
      results.push({ step: 'git commit', success: false, error: msg });
    }
  }

  // ── 3. Git push ───────────────────────────────────────────────────────────
  try {
    const { stdout } = await execAsync('git push origin main', {
      cwd: process.cwd(),
    });
    results.push({ step: 'git push', success: true, output: stdout || 'pushed' });
  } catch (err: unknown) {
    const error = err as { message?: string };
    results.push({ step: 'git push', success: false, error: error?.message });
  }

  // ── 4. Vercel deploy hook (optional) ─────────────────────────────────────
  const vercelHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (vercelHookUrl) {
    try {
      const res = await fetch(vercelHookUrl, { method: 'POST' });
      results.push({
        step: 'vercel deploy hook',
        success: res.ok,
        output: `HTTP ${res.status}`,
      });
    } catch (err: unknown) {
      const error = err as { message?: string };
      results.push({ step: 'vercel deploy hook', success: false, error: error?.message });
    }
  } else {
    results.push({
      step: 'vercel deploy hook',
      success: true,
      output: 'VERCEL_DEPLOY_HOOK_URL not set – skipped (Vercel auto-deploys on push)',
    });
  }

  const allOk = results.every((r) => r.success);
  return NextResponse.json({ ok: allOk, results }, { status: allOk ? 200 : 207 });
}
