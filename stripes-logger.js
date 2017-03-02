module.exports = class {
  constructor(l, p, t) {
    this.categories = l || '';
    this.prefix = p || undefined;
    this.timestamp = t || false;
  }

  setCategories(val) { this.categories = val; }
  setPrefix(val) { this.prefix = val; }
  setTimestamp(val) { this.timestamp = val; }

  hasCategory(cat) {
    return this.categories.split(',').some(x => x === cat);
  }

  log(cat, ...args) {
    if (!this.hasCategory(cat))
      return;

    let s = '';
    if (this.prefix)
      s = this.prefix + ' ';
    if (this.timestamp)
      s += new Date(Date.now()).toISOString() + ' ';

    const output = (args.length === 1 && typeof args[0] === 'function') ? args[0]() : args;
    console.log(`${s}(${cat})`, ...output);
  }
};
