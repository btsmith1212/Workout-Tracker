const templateFormHandler = async event => {
  event.preventDefault();

  const name = document.querySelector('#workout-name').value.trim();
  const category = document.querySelector('#workout-category').value.trim();
  const day_of_week = document.querySelector('#workout-day').value.trim();
  const sets = document.querySelector('#workout-sets').value.trim();
  const reps = document.querySelector('#workout-reps').value.trim();
  const workout_notes = document.querySelector('#workout-notes').value.trim();

  if (name && category && day_of_week && sets && reps) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        name,
        category,
        day_of_week,
        sets,
        reps,
        workout_notes,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.template-form')
  .addEventListener('submit', templateFormHandler);
