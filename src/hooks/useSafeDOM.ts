
import { useCallback, useRef } from 'react';

export const useSafeDOM = () => {
  const elementRefs = useRef<Map<string, HTMLElement>>(new Map());

  const safeAddClass = useCallback((element: HTMLElement | null, className: string) => {
    try {
      if (element && element.classList && typeof element.classList.add === 'function') {
        element.classList.add(className);
      }
    } catch (error) {
      console.warn('Error adding class:', error);
    }
  }, []);

  const safeRemoveClass = useCallback((element: HTMLElement | null, className: string) => {
    try {
      if (element && element.classList && typeof element.classList.remove === 'function') {
        element.classList.remove(className);
      }
    } catch (error) {
      console.warn('Error removing class:', error);
    }
  }, []);

  const safeToggleClass = useCallback((element: HTMLElement | null, className: string) => {
    try {
      if (element && element.classList && typeof element.classList.toggle === 'function') {
        return element.classList.toggle(className);
      }
      return false;
    } catch (error) {
      console.warn('Error toggling class:', error);
      return false;
    }
  }, []);

  const safeQuerySelector = useCallback((selector: string) => {
    try {
      if (typeof document !== 'undefined' && document.querySelector) {
        return document.querySelector(selector);
      }
      return null;
    } catch (error) {
      console.warn('Error querying selector:', error);
      return null;
    }
  }, []);

  return {
    safeAddClass,
    safeRemoveClass,
    safeToggleClass,
    safeQuerySelector,
    elementRefs: elementRefs.current
  };
};
