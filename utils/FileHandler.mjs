import { writeFileSync } from 'fs';
import path from 'path';

const FileHandler = class {
  constructor(folder, filename) {
    this.folder = folder;
    this.filename = filename;
  }

  write(data) {
    writeFileSync(
      path.join(__appdir, this.folder, this.filename),
      JSON.stringify(data, null, 2),
      'utf8'
    );
  }
};

export default FileHandler;
