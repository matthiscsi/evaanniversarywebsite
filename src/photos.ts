const photoModules = import.meta.glob<string>("../photos/*.{jpg,jpeg,JPG,JPEG,png,PNG,gif,GIF}", {
  eager: true,
  import: "default",
  query: "?url"
});

export interface PhotoItem {
  name: string;
  src: string;
}

export const photos: PhotoItem[] = Object.entries(photoModules)
  .map(([path, src]) => ({
    name: path.split("/").pop() ?? "foto",
    src
  }))
  .sort((a, b) => a.name.localeCompare(b.name));
