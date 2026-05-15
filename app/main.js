(function initializeTodoApp() {
  const input = document.querySelector('[data-testid="todo-input"]');
  const addButton = document.querySelector('[data-testid="add-button"]');
  const list = document.querySelector('[data-testid="todo-list"]');
  const pendingCount = document.querySelector('[data-testid="pending-count"]');

  if (!input || !addButton || !list || !pendingCount) {
    return;
  }

  pendingCount.textContent = "0";
})();
