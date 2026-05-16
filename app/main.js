function normalizeTaskText(text) {
  return String(text ?? "").trim();
}

function isValidTaskText(text) {
  return normalizeTaskText(text).length > 0;
}

function createTaskElement(text, documentRef = document) {
  const item = documentRef.createElement("li");
  item.textContent = normalizeTaskText(text);
  return item;
}

function updatePendingCount(list, pendingCount) {
  if (!list || !pendingCount) {
    return;
  }

  pendingCount.textContent = String(list.children.length);
}

function addTask(text, list, documentRef = document) {
  const normalizedText = normalizeTaskText(text);

  if (!normalizedText || !list) {
    return null;
  }

  const taskElement = createTaskElement(normalizedText, documentRef);
  list.appendChild(taskElement);
  return taskElement;
}

function initializeTodoApp(documentRef = document) {
  const form = documentRef.querySelector(".todo-form");
  const input = documentRef.querySelector('[data-testid="todo-input"]');
  const addButton = documentRef.querySelector('[data-testid="add-button"]');
  const list = documentRef.querySelector('[data-testid="todo-list"]');
  const pendingCount = documentRef.querySelector('[data-testid="pending-count"]');

  if (!input || !addButton || !list || !pendingCount) {
    return;
  }

  const handleAddTask = () => {
    const taskElement = addTask(input.value, list, documentRef);

    if (!taskElement) {
      input.setAttribute("aria-invalid", "true");
      return;
    }

    input.value = "";
    input.removeAttribute("aria-invalid");
    updatePendingCount(list, pendingCount);
    input.focus();
  };

  addButton.addEventListener("click", handleAddTask);

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      handleAddTask();
    });
  }

  updatePendingCount(list, pendingCount);
}

if (typeof document !== "undefined") {
  initializeTodoApp(document);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    addTask,
    createTaskElement,
    initializeTodoApp,
    isValidTaskText,
    normalizeTaskText,
    updatePendingCount,
  };
}
