export function getChoices(dictionary) {
  const choices = [];
  for (const [key, value] of Object.entries(dictionary)) {
    choices.push({ id: key, name: value });
  }
  return choices;
}
