export interface PhotoItem {
  id: string;
  name: string;
  src: string;
  caption: string;
}

const rawPhotos = import.meta.glob("../photos/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}", {
  eager: true,
  import: "default"
}) as Record<string, string>;

function toCaption(fileName: string): string {
  const clean = fileName.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();
  return clean ? `Lou momentje (${clean})` : "Lou momentje";
}

export const photos: PhotoItem[] = Object.entries(rawPhotos)
  .map(([path, src]) => {
    const name = path.split("/").pop() ?? "onbekende-foto";
    return {
      id: name.toLowerCase(),
      name,
      src,
      caption: toCaption(name)
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));
