import { DURATION } from "@/repositories/Constants";

const DATA_HEIGHT = 'data-panel-height';

export const openPanel = (
  containerRef: React.RefObject<HTMLDivElement>,
  panelRef: React.RefObject<HTMLDivElement>,
  show: boolean
) => {
  if (!containerRef.current) return;
  if (!panelRef.current) return;

  if (!panelRef.current.getAttribute(DATA_HEIGHT)) {
    panelRef.current.setAttribute(DATA_HEIGHT, `${panelRef.current.offsetHeight}px`);
  }

  if (show) {
    panelRef.current.style.opacity = '0';
    panelRef.current.style.zIndex = '1';
    setTimeout(() => {
      panelRef.current && (panelRef.current.style.opacity = '1');
    }, 0);
    setTimeout(() => {
      panelRef.current && (panelRef.current.style.maxHeight = panelRef.current.getAttribute(DATA_HEIGHT)!);
    }, DURATION / 2);
  } else {
    panelRef.current.style.maxHeight = `${containerRef.current.offsetHeight}px`;
    setTimeout(() => {
      panelRef.current && (panelRef.current.style.opacity = '0');
      panelRef.current && (panelRef.current.style.zIndex = '0');
    }, DURATION / 2);
  }
};

export const openAccordion = (
  panelRef: React.RefObject<HTMLDivElement>,
  open: boolean
) => {
  if (!panelRef.current) return;

  if (!panelRef.current.getAttribute('data-max-height')) {
    panelRef.current.setAttribute(
      'data-max-height',
      panelRef.current.offsetHeight + 'px'
    );
  }

  if (open) {
    panelRef.current.style.maxHeight = panelRef.current.getAttribute('data-max-height')!;
    panelRef.current.classList.add('z-1');
    setTimeout(() => {
      panelRef.current && panelRef.current.classList.remove('overflow-y-hidden');
    }, DURATION);

  } else {
    panelRef.current.style.maxHeight = `0px`;
    panelRef.current.classList.add('overflow-y-hidden');
    setTimeout(() => {
      panelRef.current && panelRef.current.classList.remove('z-1');
    }, DURATION);
  }
}
