const MAX_DEPTH = 9; // インデントできる限界

function main(){
  const doc = DocumentApp.getActiveDocument();
  const docFileId = doc.getId();
  const docBody = doc.getBody();
  const  parentFolders = DriveApp.getFileById(docFileId).getParents();
  while (parentFolders.hasNext()) {
    const folder = parentFolders.next();
    Logger.log("current Folder is " + folder.getName());
    const rootListItem = docBody.appendListItem(folder.getName());
    logFolderFiles(folder, MAX_DEPTH - 1, docBody);
  }
}

function logFolderFiles(
  folder: GoogleAppsScript.Drive.Folder,
  depth: int,
  docBody: GoogleAppsScript.Document.Body
) {
  const childFiles = folder.getFiles();
  const childFolders = folder.getFolders();
  const folderLines = "-".repeat(MAX_DEPTH - depth);
  while (childFolders.hasNext()){
    const childFolder = childFolders.next();
    const childFolderURL = childFolder.getUrl();
    Logger.log(folderLines + "folder name:" + childFolder.getName());
    const folderItem = docBody.appendListItem(childFolder.getName());
    folderItem.setLinkUrl(childFolderURL);
    folderItem.setNestingLevel(MAX_DEPTH - depth);
    logFolderFiles(childFolder, depth - 1, docBody);
  }
  let folderSpaces = " ".repeat(MAX_DEPTH - depth);
  while (childFiles.hasNext()) {
    let file = childFiles.next();
    const fileURL = file.getUrl();
    Logger.log(folderSpaces + "-" + "file name:" + file.getName());
    const fileItem = docBody.appendListItem(file.getName());
    fileItem.setLinkUrl(fileURL);
    fileItem.setNestingLevel(MAX_DEPTH - depth);
  }
}
