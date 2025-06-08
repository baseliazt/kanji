import fs from "fs";
import https from "https";

export function fetchSheets(
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
            fetchSheets(location, outputPath, maxRedirects - 1)
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
