function stubbornly(f) {
  return function() {
    try {
      return f();
    } catch (e) {
      console.error("STUBBORN FAILURE", e);
      return undefined;
    }
  };
}

export function setDataTransitions(transitions, states)
{
  for (var i=0; i<states.length-1; ++i) {
    transitions.push({
      transitionForward: (state => stubbornly(() => states[state+1]()))(i),
      transitionBackward: (state => stubbornly(() => states[state]()))(i),
      index: i
    });
  }
}

