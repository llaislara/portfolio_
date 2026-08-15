import fs from "fs";
import path from "path";

declare const process: {
  cwd: () => string;
};

const contentDirectory = path.join(process.cwd(), "content");

export function getPerfil() {
  const filePath = path.join(contentDirectory, "perfil.json");
  if (!fs.existsSync(filePath)) return { nome: "", cargo: "", bio: "" };
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export function getCollectionData(collectionName: string) {
  const dirPath = path.join(contentDirectory, collectionName);
  if (!fs.existsSync(dirPath)) return [];

  const filenames = fs.readdirSync(dirPath);
  const items = filenames.map((filename) => {
    const filePath = path.join(dirPath, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    // Como o Pages CMS salva em JSON por padrão nas collections, fazemos o parse:
    try {
      return JSON.parse(fileContents);
    } catch {
      return { id: filename, content: fileContents };
    }
  });
  return items;
}
