const eventService = (() => {
  //ADDS EVENTS TO A GIVEN HTML COLLECTION
  function addEvents(eventType, htmlElements, functionName) {
    Array.from(htmlElements)
    .forEach(l => l.addEventListener
      (eventType, functionName));
  }

  //ADDS EVENT TO GIVEN HTML ELEMENT
  function addEvent(eventType, htmlElement, functionName) {
    htmlElement.addEventListener(eventType, functionName);
  }

  //REMOVE EVENTS FROM A GIVEN HTML COLLECTION
  function removeEvents(eventType, htmlElements, functionName) {
    Array.from(htmlElements)
    .forEach(l => l.removeEventListener
    (eventType, functionName));
  }

  //REMOVES EVENT FROM GIVEN HTML ELEMENT
  function removeEvent(eventType, htmlElement, functionName) {
    htmlElement.removeEventListener(eventType, functionName);
  }

  return {
    addEvents,
    addEvent,
    removeEvents,
    removeEvent,
  }
})();