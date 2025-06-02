import fs from "fs";
import path from "path";
import https from "https";
import { SHEETS } from "../constants";

function getCsvUrl(sheetId: string, gid: string) {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
}

function fetchCSV(
  url: string,
  outputPath: string,
  maxRedirects = 5
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) {
      return reject(new Error("Too many redirects"));
    }

    https
      .get(url, (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode ?? 0)) {
          const location = res.headers.location;
          if (location) {
            console.log(`Redirecting to ${location}`);
            fetchCSV(location, outputPath, maxRedirects - 1)
              .then(resolve)
              .catch(reject);
          } else {
            reject(new Error("Redirect location header missing"));
          }
          return;
        }

        if (res.statusCode !== 200) {
          reject(
            new Error(`Failed to fetch CSV. Status code: ${res.statusCode}`)
          );
          return;
        }

        const fileStream = fs.createWriteStream(outputPath);
        res.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          console.log(`✅ CSV saved to ${outputPath}`);
          resolve();
        });

        fileStream.on("error", (err) => {
          reject(err);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

async function main() {
  try {
    // Loop fetch secara berurutan
    for (const sheet of SHEETS) {
      const url = getCsvUrl(sheet.sheetId, sheet.gid);
      const outputPath = path.join(
        process.cwd(),
        "src",
        "pwa",
        "i18n",
        "csv",
        sheet.output
      );
      console.log(`⏳ Fetching CSV from ${url}...`);
      await fetchCSV(url, outputPath);
    }
    console.log("🎉 All CSVs fetched!");
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
