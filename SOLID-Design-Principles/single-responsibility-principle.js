// single responsibility principle
// separation of concerns
const fs = require('fs');

class Journal {
  constructor(props) {
    this.entries = {};
  }

  addEntry(text) {
    const c = ++Journal.count;
    const entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString = () => Object.values(this.entries).join('\n');

  save(filename) {}

  load(filename) {}

  loadFromUrl(filename) {}
}

Journal.count = 0;

class PersistenceManager {
  preprocessor() {}

  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString());
  }
}

const j = new Journal();
j.addEntry('I cried today');
j.addEntry('I ate a debug');
console.log(j.toString());

const p = new PersistenceManager();
const filename = 'journal.txt';
p.saveToFile(j, filename);
