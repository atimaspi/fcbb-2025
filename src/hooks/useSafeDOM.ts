
import { useCallback, useRef, useEffect } from 'react';

export const useSafeDOM = () => {
  const elementRefs = useRef<Map<string, HTMLElement>>(new Map());
  const isClient = useRef(false);

  useEffect(() => {
    isClient.current = typeof window !== 'undefined' && typeof document !== 'undefined';
  }, []);

  const safeAddClass = useCallback((element: HTMLElement | null, className: string) => {
    try {
      if (!isClient.current) {
        console.warn('DOM not available (SSR)');
        return false;
      }
      
      if (!element) {
        console.warn('Element is null or undefined when trying to add class:', className);
        return false;
      }
      
      if (!element.classList) {
        console.warn('Element does not have classList property');
        return false;
      }
      
      if (typeof element.classList.add !== 'function') {
        console.warn('classList.add is not a function');
        return false;
      }
      
      element.classList.add(className);
      return true;
    } catch (error) {
      console.warn('Error adding class:', error);
      return false;
    }
  }, []);

  const safeRemoveClass = useCallback((element: HTMLElement | null, className: string) => {
    try {
      if (!isClient.current || !element || !element.classList || typeof element.classList.remove !== 'function') {
        return false;
      }
      element.classList.remove(className);
      return true;
    } catch (error) {
      console.warn('Error removing class:', error);
      return false;
    }
  }, []);

  const safeToggleClass = useCallback((element: HTMLElement | null, className: string) => {
    try {
      if (!isClient.current || !element || !element.classList || typeof element.classList.toggle !== 'function') {
        return false;
      }
      return element.classList.toggle(className);
    } catch (error) {
      console.warn('Error toggling class:', error);
      return false;
    }
  }, []);

  const safeQuerySelector = useCallback((selector: string) => {
    try {
      if (!isClient.current || typeof document === 'undefined' || !document.querySelector) {
        return null;
      }
      return document.querySelector(selector);
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
    elementRefs: elementRefs.current,
    isClient: isClient.current
  };
};
