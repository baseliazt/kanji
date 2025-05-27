import fs from "fs";
import path from "path";
import https from "https";

const SHEET_ID = "1MbxxGfYj7Xjddv9xhIUD0Vb3j67Q11KE03eSRvg8muM";
const GID = "278671287";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

const outputPath = path.join(process.cwd(), "public", "sheet.csv");

function fetchCSV(url: string, maxRedirects = 5): Promise<void> {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) {
      return reject(new Error("Too many redirects"));
    }

    https
      .get(url, (res) => {
        // Handle redirect status codes (301, 302, 303, 307, 308)
        if ([301, 302, 303, 307, 308].includes(res.statusCode ?? 0)) {
          const location = res.headers.location;
          if (location) {
            console.log(`Redirecting to ${location}`);
            // Recursively call fetchCSV with new location
            fetchCSV(location, maxRedirects - 1)
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
  console.log("⏳ Fetching CSV from Google Sheets...");
  try {
    await fetchCSV(CSV_URL);
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
