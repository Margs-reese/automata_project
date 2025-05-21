function startAnimation(animationData) {
  let currentStep = 0;

  function animateStep() {
    if (currentStep >= animationData.path.length) {
      // Check if the final state is an accept state
      const lastStep = animationData.path[animationData.path.length - 1];
      const finalState = lastStep[1];
      if (animationData.accept_states.includes(finalState)) {
        const finalNode = document.getElementById(`node_${finalState}`);
        if (finalNode) {
          finalNode.classList.add("accept-state");
        }
      }
      return;
    }

    const step = animationData.path[currentStep];
    const fromState = step[0];
    const toState = step[1];
    const symbol = step[2];

    // Highlight the current node
    const node = document.getElementById(`node_${fromState}`);
    if (node) {
      node.classList.add("highlight-node");
      setTimeout(() => node.classList.remove("highlight-node"), 1000);
    }

    // Highlight the edge
    const edge = document.getElementById(
      `edge_${fromState}_${toState}_${symbol}`
    );
    if (edge) {
      edge.classList.add("highlight-edge");
      setTimeout(() => edge.classList.remove("highlight-edge"), 1000);
    }

    // Move to next step
    currentStep++;
    setTimeout(animateStep, 1000);
  }

  // Start animation after a short delay
  setTimeout(animateStep, 500);
}
