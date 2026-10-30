#!/usr/bin/env node

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const ROOT = path.resolve(__dirname, '..');
const EXPECTED_SKILLS = [
  'api-and-interface-design',
  'browser-testing-with-devtools',
  'constraint-driven-development',
  'frontend-ui-engineering',
  'performance-optimization',
  'security-and-hardening',
];

function names(relativePath) {
  return fs.readdirSync(path.join(ROOT, relativePath)).sort();
}

test('the curated catalog contains exactly six skills and their eval assets', () => {
  assert.deepEqual(names('skills'), EXPECTED_SKILLS);
  assert.deepEqual(names('evals/cases'), EXPECTED_SKILLS.map(name => `${name}.json`));
  assert.deepEqual(
    names('evals/fixtures'),
    EXPECTED_SKILLS.filter(name => name !== 'constraint-driven-development')
  );
  for (const name of EXPECTED_SKILLS) {
    assert.ok(fs.statSync(path.join(ROOT, 'skills', name, 'SKILL.md')).isFile());
  }
});

test('the curated plugin exposes only related commands, personas, and checklists', () => {
  assert.deepEqual(names('.claude/commands'), ['constraints.md', 'webperf.md']);
  for (const dir of ['.gemini/commands', 'commands']) {
    assert.deepEqual(names(dir), ['constraints.toml', 'webperf.toml']);
  }
  assert.deepEqual(names('agents'), ['security-auditor.md', 'web-performance-auditor.md']);
  assert.deepEqual(names('references'), [
    'accessibility-checklist.md',
    'performance-checklist.md',
    'security-checklist.md',
  ]);
  const marketplace = JSON.parse(fs.readFileSync(path.join(ROOT, '.claude-plugin/marketplace.json'), 'utf8'));
  assert.equal(marketplace.plugins[0].source, './', 'install this curated checkout, not the upstream catalog');
  assert.equal(fs.existsSync(path.join(ROOT, 'hooks')), false);
  assert.equal(fs.existsSync(path.join(ROOT, 'evals/plugin')), false);
});
