import { appendFileSync, writeFileSync } from 'fs';
import path from 'path';

const FileHandler = class {
  constructor(folder, filename) {
    this.path = path.join(__appdir, folder, filename);
  }

  append(data) {
    appendFileSync(this.path, `${data}\n=====`, 'utf8');
  }

  write(data) {
    writeFileSync(this.path, JSON.stringify(data, null, 2), 'utf8');
  }
};

export default FileHandler;
