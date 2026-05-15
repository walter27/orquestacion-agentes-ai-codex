import fs from "fs";
import path from "path";
const appDir = path.resolve(process.cwd(), "app");
describe("Hello TODO app structure", () => {
  test("required files exist", () => {
    expect(fs.existsSync(path.join(appDir, "index.html"))).toBe(true);
    expect(fs.existsSync(path.join(appDir, "styles.css"))).toBe(true);
    expect(fs.existsSync(path.join(appDir, "main.js"))).toBe(true);
  });
  test("index.html contains required test ids", () => {
    const html = fs.readFileSync(path.join(appDir, "index.html"), "utf8");
    expect(html).toContain('data-testid="todo-input"');
    expect(html).toContain('data-testid="add-button"');
    expect(html).toContain('data-testid="todo-list"');
    expect(html).toContain('data-testid="pending-count"');
  });
});
