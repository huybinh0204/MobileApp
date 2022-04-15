import Blob from 'react-native-blob-util';

export function downloadPdf({ url, fileName = 'tmpFile.pdf', headers = {} }) {
  return Blob.config({ path: buildFilePath(fileName) }).fetch('GET', url, headers);
}

export function cancelDownload(download) {
  return download.cancel?.();
}

export function deleteFile(filePath) {
  return Blob.fs.unlink(filePath);
}

export function buildFilePath(fileName) {
  return `${Blob.fs.dirs.DocumentDir}/${fileName}`;
}
