import { exec } from "child_process";

export function runCommand(cmd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Error:", stderr);
        return reject(error);
      }
      console.log(stdout);
      resolve();
    });
  });
}
