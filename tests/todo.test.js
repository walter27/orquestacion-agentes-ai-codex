const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const appDir = path.resolve(process.cwd(), "app");
const indexPath = path.join(appDir, "index.html");
const stylesPath = path.join(appDir, "styles.css");
const mainPath = path.join(appDir, "main.js");

function loadAppDom() {
  const html = fs.readFileSync(indexPath, "utf8");
  const dom = new JSDOM(html, { runScripts: "outside-only", url: "http://localhost/" });
  const script = fs.readFileSync(mainPath, "utf8");
  dom.window.eval(script);
  return dom;
}

describe("AC-001 initial TODO UI", () => {
  test("required app files exist", () => {
    expect(fs.existsSync(indexPath)).toBe(true);
    expect(fs.existsSync(stylesPath)).toBe(true);
    expect(fs.existsSync(mainPath)).toBe(true);
  });

  test("index.html wires CSS and JavaScript assets", () => {
    const dom = loadAppDom();
    const { document } = dom.window;

    expect(document.querySelector('link[rel="stylesheet"][href="styles.css"]')).not.toBeNull();
    expect(document.querySelector('script[src="main.js"][defer]')).not.toBeNull();
  });

  test("renders the initial title, input, add button, empty list, and pending counter", () => {
    const dom = loadAppDom();
    const { document } = dom.window;

    expect(document.querySelector("h1")?.textContent).toMatch(/hello todo/i);

    const input = document.querySelector('[data-testid="todo-input"]');
    expect(input).not.toBeNull();
    expect(input.tagName).toBe("INPUT");
    expect(input.getAttribute("type")).toBe("text");

    const label = document.querySelector(`label[for="${input.id}"]`);
    expect(label?.textContent).toMatch(/nueva tarea/i);

    const addButton = document.querySelector('[data-testid="add-button"]');
    expect(addButton).not.toBeNull();
    expect(addButton.tagName).toBe("BUTTON");
    expect(addButton.textContent).toMatch(/agregar/i);

    const list = document.querySelector('[data-testid="todo-list"]');
    expect(list).not.toBeNull();
    expect(list.tagName).toBe("UL");
    expect(list.children).toHaveLength(0);

    const pendingCount = document.querySelector('[data-testid="pending-count"]');
    expect(pendingCount).not.toBeNull();
    expect(pendingCount.textContent).toBe("0");
  });

  test("styles include centered layout, form/list presentation, completed task style, and responsive rule", () => {
    const css = fs.readFileSync(stylesPath, "utf8");

    expect(css).toMatch(/\.app-shell\s*{[\s\S]*display:\s*flex/);
    expect(css).toMatch(/\.app-shell\s*{[\s\S]*justify-content:\s*center/);
    expect(css).toMatch(/\.todo-form\s*{[\s\S]*display:\s*flex/);
    expect(css).toMatch(/\.todo-list\s*{[\s\S]*list-style:\s*none/);
    expect(css).toMatch(/\.todo-list\s+\.completed\s*{[\s\S]*text-decoration:\s*line-through/);
    expect(css).toMatch(/@media\s*\(max-width:/);
  });
});
