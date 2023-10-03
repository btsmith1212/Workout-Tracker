module.exports = {
  check_length: (allWorkouts) => {
    if (allWorkouts) {
      return allWorkouts.length > 0;
    }
    return false;
  },
};
