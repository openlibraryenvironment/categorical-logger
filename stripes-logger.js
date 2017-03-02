module.exports = class {
  constructor(l, p, t) {
    this.level = l || '';
    this.prefix = p || undefined;
    this.timestamp = t || false;
  }

  setLevel(val) { this.level = val; }
  setPrefix(val) { this.prefix = val; }
  setTimestamp(val) { this.timestamp = val; }

  log(level, ...args) {
    if (!this.level.split(',').some(x => x === level))
      return;

    let s = '';
    if (this.prefix)
      s = this.prefix + ' ';
    if (this.timestamp)
      s += new Date(Date.now()).toISOString() + ' ';

    const output = (args.length === 1 && typeof args[0] === 'function') ? args[0]() : args;
    console.log(`${s}(${level})`, ...output);
  }
};
