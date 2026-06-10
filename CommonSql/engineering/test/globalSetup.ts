import { JSDOM } from 'jsdom';
import {jest} from '@jest/globals'

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
            self: Window;
        }
    }
}

const { window } = new JSDOM('');

global.document = window.document;
global.window = global.document.defaultView;
global.navigator = window.navigator;
global.self = global.window;
global.document.queryCommandSupported = () => { return false };
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
