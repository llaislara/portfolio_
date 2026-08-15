// src/lib/cms.ts
import fs from "fs";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content");

// Função genérica para ler arquivos únicos (Single Types)
export function getSingleType(fileName: string) {
  const filePath = path.join(contentDirectory, `${fileName}.json`);
  if (!fs.existsSync(filePath)) return null;
  const fileContents = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(fileContents);
  } catch {
    return null;
  }
}

// Função genérica para ler coleções (Multiple Items)
export function getCollectionData(collectionName: string) {
  const dirPath = path.join(contentDirectory, collectionName);
  if (!fs.existsSync(dirPath)) return [];

  const filenames = fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".json") || file.endsWith(".md"));

  const items = filenames.map((filename) => {
    const filePath = path.join(dirPath, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    try {
      return { id: filename, ...JSON.parse(fileContents) };
    } catch {
      return { id: filename, content: fileContents };
    }
  });
  return items;
}
