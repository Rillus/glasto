/**
 * Filters out acts that have already ended
 * @param {Array} acts - Array of act objects
 * @param {boolean} hidePastActs - Whether to filter out past acts
 * @returns {Array} Filtered array of acts
 */
export const filterPastActs = (acts, hidePastActs) => {
  if (!hidePastActs) {
    return acts;
  }

  const now = new Date();
  return acts.filter(act => {
    const actEnd = new Date(act.end);
    return actEnd > now;
  });
}; 