import { writeFileSync, appendFileSync } from 'fs';
import { join } from 'path';

const FileHandler = class {
  constructor(folderName, fileName) {
    this.path = join(__appdir, folderName, fileName);
  }

  write(data) {
    try {
      writeFileSync(this.path, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      throw error.message;
    }
  }

  append(data) {
    try {
      appendFileSync(this.path, `${data}\n\n`, 'utf8');
    } catch (error) {
      throw error.message;
    }
  }
};

export default FileHandler;
