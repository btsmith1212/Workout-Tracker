const templateFormHandler = async event => {
  event.preventDefault();

  const name = document.querySelector('#template-name').value.trim();
  const workouts = document.querySelector('#template-workouts').value.trim();

  if (name && workouts) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, workouts }),
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
