export function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')  // remove special characters
    .replace(/\s+/g, '-')          // replace spaces with hyphens
    .replace(/-+/g, '-');          // collapse multiple hyphens
}