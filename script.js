const shuffledFragments = [
  { id: 4, text: "I can code in JavaScript" },
  undefined,
  { id: 1, text: "Naomi said:" },
  { id: 3, text: "and I use Arch btw.\"" },
  { id: 3, text: "and I use Arch btw.\"" },
  undefined,
  { id: 2, text: "[...]" },
  { id: 5, text: "This is the ending." }
];

function compactFragments(fragments) {
  const compacted = [];
  let removedAny = false;

  for (let i = 0; i < fragments.length; i++) {
    const fragment = fragments[i];

    if (fragment !== undefined) {
      compacted.push(fragment);
    } else {
      removedAny = true;
    }
  }

  if (removedAny) {
    console.log("[COMPACTED] Removed undefined items from the story fragments.");
  }

  return compacted;
}

const compactedShuffledFragments = compactFragments(shuffledFragments);

function sortFragments(fragments) {
  const sorted = [];

  for (let i = 0; i < fragments.length; i++) {
    const current = fragments[i];
    let insertIndex = 0;

    while (insertIndex < sorted.length && sorted[insertIndex].id <= current.id) {
      insertIndex++;
    }

    sorted.splice(insertIndex, 0, current);
  }

  return sorted;
}

const sortedFragments = sortFragments(compactedShuffledFragments);

function dedupeFragments(fragments) {
  const deduped = [];
  const seenIds = new Set();
  const loggedIds = new Set();

  for (let i = 0; i < fragments.length; i++) {
    const fragment = fragments[i];
    const { id } = fragment;

    if (!seenIds.has(id)) {
      seenIds.add(id);
      deduped.push(fragment);
      continue;
    }

    if (!loggedIds.has(id)) {
      loggedIds.add(id);
      console.log("[DEDUPED] Removed duplicate fragment with id " + id + ".");
    }
  }

  return deduped;
}

const dedupedFragments = dedupeFragments(sortedFragments);

function fillMissingFragments(fragments) {
  if (fragments.length === 0) {
    return [];
  }

  const filled = [];
  let previousId = null;

  for (let i = 0; i < fragments.length; i++) {
    const fragment = fragments[i];

    if (previousId !== null) {
      for (let id = previousId + 1; id < fragment.id; id++) {
        filled.push({ id, text: "[...]" });
        console.log("[FILLED] Added placeholder for missing fragment id " + id + ".");
      }
    }

    filled.push(fragment);
    previousId = fragment.id;
  }

  return filled;
}

const filledFragments = fillMissingFragments(dedupedFragments);

function assembleStory(fragments) {
  return fragments.map((fragment) => fragment.text).join("\n");
}

console.log(assembleStory(filledFragments));
