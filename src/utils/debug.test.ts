import assert from 'node:assert/strict'
import test from 'node:test'

import { getDebugLogPath } from './debug.js'

test('getDebugLogPath prefers DEIMOS_DEBUG_LOG_FILE over DEIMOS_DEBUG_LOGS_DIR', () => {
  const prevFile = process.env.DEIMOS_DEBUG_LOG_FILE
  const prevLegacy = process.env.DEIMOS_DEBUG_LOGS_DIR
  try {
    process.env.DEIMOS_DEBUG_LOG_FILE = '/tmp/deimos-preferred.log'
    process.env.DEIMOS_DEBUG_LOGS_DIR = '/tmp/deimos-legacy.log'
    assert.equal(getDebugLogPath(), '/tmp/deimos-preferred.log')
  } finally {
    if (prevFile === undefined) delete process.env.DEIMOS_DEBUG_LOG_FILE
    else process.env.DEIMOS_DEBUG_LOG_FILE = prevFile
    if (prevLegacy === undefined) delete process.env.DEIMOS_DEBUG_LOGS_DIR
    else process.env.DEIMOS_DEBUG_LOGS_DIR = prevLegacy
  }
})

test('getDebugLogPath uses DEIMOS_DEBUG_LOGS_DIR when new name unset', () => {
  const prevFile = process.env.DEIMOS_DEBUG_LOG_FILE
  const prevLegacy = process.env.DEIMOS_DEBUG_LOGS_DIR
  try {
    delete process.env.DEIMOS_DEBUG_LOG_FILE
    process.env.DEIMOS_DEBUG_LOGS_DIR = '/tmp/deimos-only-legacy.log'
    assert.equal(getDebugLogPath(), '/tmp/deimos-only-legacy.log')
  } finally {
    if (prevFile === undefined) delete process.env.DEIMOS_DEBUG_LOG_FILE
    else process.env.DEIMOS_DEBUG_LOG_FILE = prevFile
    if (prevLegacy === undefined) delete process.env.DEIMOS_DEBUG_LOGS_DIR
    else process.env.DEIMOS_DEBUG_LOGS_DIR = prevLegacy
  }
})
