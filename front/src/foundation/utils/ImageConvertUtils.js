export function convertToWebP(fullPath, originalExt) {
  return fullPath.split(`.${originalExt}`)[0] + ".webp";
}

export function convertToAVIF(fullPath, originalExt) {
  return fullPath.split(`.${originalExt}`)[0] + ".avif";
}

export function convertToAVIFMain(fullPath, originalExt) {
  const injector = fullPath.split("/");
  const imageName = injector[injector.length - 1];

  return (
    "/assets/images/races/main/" +
    imageName.split(`.${originalExt}`)[0] +
    ".avif"
  );
}
