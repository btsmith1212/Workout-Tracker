const templateFormHandler = async (event) => {
  event.preventDefault();
  const day_of_week = document.querySelector("#workout-day").value.trim();
  const category = document.querySelector("#workout-category").value.trim();
  let workout_name1,
    sets1,
    reps1,
    workout_name2,
    sets2,
    reps2,
    workout_name3,
    sets3,
    reps3,
    workout_name4,
    sets4,
    reps4,
    workout_name5,
    sets5,
    reps5;

  for (let i = 1; i < 6; i++) {
    if (document.querySelector(`#workout-name${i}`).value.trim() !== "") {
      eval(
        `workout_name${i} = document.querySelector('#workout-name${i}').value.trim();`
      );
      eval(
        `sets${i} = document.querySelector('#workout-sets${i}').value.trim();`
      );
      eval(
        `reps${i} = document.querySelector('#workout-reps${i}').value.trim();`
      );
    }
  }

  const data = {
    day_of_week,
    category,
    workout_name1,
    sets1,
    reps1,
    workout_name2,
    sets2,
    reps2,
    workout_name3,
    sets3,
    reps3,
    workout_name4,
    sets4,
    reps4,
    workout_name5,
    sets5,
    reps5,
  };

  if (category && day_of_week) {
    const response = await fetch("/api/templates", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Workout added to template.");
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".template-form")
  .addEventListener("submit", templateFormHandler);
