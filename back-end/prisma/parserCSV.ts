import fs from "fs";
import * as csvParse from "fast-csv";

export async function parseCSV<Type>(file: string): Promise<Type[]> {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(`./prisma/initial_db_data/${file}.csv`);
    const csvData: Type[] = [];

    csvParse
      .parseStream(stream, { headers: true })
      .on("data", (data) => {
        csvData.push(data);
      })
      .on("end", () => {
        resolve(csvData);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
