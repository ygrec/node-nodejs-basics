import { fileURLToPath } from 'url';
import { dirname } from 'path';

const USE_COLORS = true;
const supportsColor =
  process.stdout.isTTY && process.env.TERM !== 'dumb' && USE_COLORS;

const colors = {
  green: supportsColor ? '\x1b[32m' : '',
  violet: supportsColor ? '\x1b[35m' : '',
  red: supportsColor ? '\x1b[31m' : '',
  reset: supportsColor ? '\x1b[0m' : '',
};

const colorMap = {
  debug: colors.reset,
  info: colors.green,
  important: colors.violet,
  error: colors.red,
};

export function logMsg(msg, type = 'info', cause = 'errorCause') {
  const message = `${colorMap[type]}${msg}${colors.reset}`;
  if (type === 'error') {
    throw new Error(message, {cause});
  } else {
    console.log(message);
  }
}

export function logInfo(msg) {
  logMsg(msg, 'info');
}

export function logDbg(msg) {
  logMsg(msg, 'debug');
}

export function logErr(msg) {
  logMsg(msg, 'error');
}

export function getPathData(meta) {
  const __filename = fileURLToPath(meta);
  const __dirname = dirname(__filename);
  return { __filename, __dirname };
}
