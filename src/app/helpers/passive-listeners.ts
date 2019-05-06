let supportsPassiveEvents: boolean;

export function supportsPassiveEventListeners(): boolean {
  if (supportsPassiveEvents == null && typeof window !== 'undefined') {
    try {
      window.addEventListener(
        'test',
        // tslint:disable-next-line:no-non-null-assertion
        null!,
        Object.defineProperty({}, 'passive', {
          get: () => (supportsPassiveEvents = true),
        })
      );
    } finally {
      supportsPassiveEvents = supportsPassiveEvents || false;
    }
  }

  return supportsPassiveEvents;
}

export function normalizePassiveListenerOptions(
  options: AddEventListenerOptions
): AddEventListenerOptions | boolean {
  return supportsPassiveEventListeners() ? options : !!options.capture;
}
