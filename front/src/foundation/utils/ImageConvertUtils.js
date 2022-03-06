export function convertToWebP(fullPath, originalExt) {
  return fullPath.split(`.${originalExt}`)[0] + ".webp";
}
