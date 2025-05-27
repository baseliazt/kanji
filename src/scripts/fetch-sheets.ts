import fs from "fs";
import path from "path";
import https from "https";

const SHEETS = [
  {
    sheetId: "1MbxxGfYj7Xjddv9xhIUD0Vb3j67Q11KE03eSRvg8muM",
    gid: "278671287",
    output: "sheet1.csv",
  },
  //   {
  //     sheetId: "ANOTHER_SHEET_ID",
  //     gid: "ANOTHER_GID",
  //     output: "sheet2.csv",
  //   },
  //   // bisa tambah lagi objek di sini
];

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
      const outputPath = path.join(process.cwd(), "public", sheet.output);
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
