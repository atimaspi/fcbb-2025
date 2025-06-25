
// Utility functions to safely manipulate DOM
export const safeClassList = {
  add: (element: Element | null, className: string): boolean => {
    try {
      if (element && element.classList && typeof element.classList.add === 'function') {
        element.classList.add(className);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('Error adding class:', error);
      return false;
    }
  },

  remove: (element: Element | null, className: string): boolean => {
    try {
      if (element && element.classList && typeof element.classList.remove === 'function') {
        element.classList.remove(className);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('Error removing class:', error);
      return false;
    }
  },

  toggle: (element: Element | null, className: string): boolean => {
    try {
      if (element && element.classList && typeof element.classList.toggle === 'function') {
        return element.classList.toggle(className);
      }
      return false;
    } catch (error) {
      console.warn('Error toggling class:', error);
      return false;
    }
  },

  contains: (element: Element | null, className: string): boolean => {
    try {
      if (element && element.classList && typeof element.classList.contains === 'function') {
        return element.classList.contains(className);
      }
      return false;
    } catch (error) {
      console.warn('Error checking class:', error);
      return false;
    }
  }
};

export const safeDOM = {
  querySelector: (selector: string): Element | null => {
    try {
      if (typeof document !== 'undefined' && document.querySelector) {
        return document.querySelector(selector);
      }
      return null;
    } catch (error) {
      console.warn('Error querying selector:', error);
      return null;
    }
  },

  getElementById: (id: string): HTMLElement | null => {
    try {
      if (typeof document !== 'undefined' && document.getElementById) {
        return document.getElementById(id);
      }
      return null;
    } catch (error) {
      console.warn('Error getting element by ID:', error);
      return null;
    }
  },

  addEventListener: (element: Element | null, event: string, handler: EventListener): boolean => {
    try {
      if (element && typeof element.addEventListener === 'function') {
        element.addEventListener(event, handler);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('Error adding event listener:', error);
      return false;
    }
  }
};
