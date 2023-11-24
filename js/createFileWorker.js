onmessage = async (e) => {
  // Get file handle and encoded msg
  const root = await navigator.storage.getDirectory();
  const newFileHandle = await root.getFileHandle(e.data[0], { create: true });
  const handle = await newFileHandle.createSyncAccessHandle();
  const encoder = new TextEncoder();
  const encodedMessage = encoder.encode(e.data[1]);
  // Write content to handle
  const writeBuffer = handle.write(encodedMessage);
  // Persist changes to disk
  handle.flush();
  // Always close FileSystemSyncAccessHandle when done
  handle.close();
};
