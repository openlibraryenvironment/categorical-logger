const Logger = require('./categorical-logger.js');

const l = new Logger('redux,action');

l.setCategories('redux,path,cql,error,action');
l.setPrefix('stripes');
l.setTimestamp(true);

const path = 'item-storage/items?query=materialType%3D*%20sortby%20title';
const query = 'water';

l.log('path', `substitutePath generated ${path}`);
l.log('action', 'user searched for', query); // will emit no output
l.log('cql', () => [query, path]); // test ability to pass a function
for (const cat of ['cql', 'core', 'error']) {
  if (l.hasCategory(cat))
    console.log(`category ${cat} is on`);
}
