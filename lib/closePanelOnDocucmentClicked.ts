
export const closePanelOnDocumentClicked = (id: string, callback: Function) => {
  document.addEventListener('click', ({ target }: globalThis.MouseEvent) => {
    if (!((target as HTMLElement).closest(`#${id}`))) callback();
  });
}