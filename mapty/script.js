"use strict";

class Workouts {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  constructor(coords, distance, durations) {
    this.coords = coords; //[lat,lng]
    this.distance = distance;
    this.durations = durations;
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type.replace(
      this.type[0],
      this.type[0].toUpperCase()
    )} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
  }
}
class Running extends Workouts {
  type = "running";
  constructor(coords, distance, durations, candance) {
    super(coords, distance, durations);
    this.candance = candance;
    this.calcPace();
    this._setDescription();
  }
  calcPace() {
    this.pace = this.durations / this.distance;
    return this.pace;
  }
}
class Cycling extends Workouts {
  type = "cycling";
  constructor(coords, distance, durations, elevations) {
    super(coords, distance, durations);
    this.elevations = elevations;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    this.speed = this.distance / (this.durations / 60);
  }
}
// const run1 = new Running([39 - 7], 23, 130, 168);
// const cycling = new Cycling([39 - 7], 26, 30, 268);
// console.log(run1, cycling);

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
class App {
  //private property
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];
  constructor() {
    // get the position
    this._getPosition();

    //get the data from localstorage
    this._getLocalStorage();

    //attach event handler
    form.addEventListener("submit", this._newWorkouts.bind(this)); // this is pointing to app object
    inputType.addEventListener("change", this._toggleElevation.bind(this));
    containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
  }
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._LoadMap.bind(this),
        function () {
          alert("sorry");
        }
      );
    }
  }
  _LoadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    console.log(this); //this is undefined because of regular function call without bind function
    const coords = [latitude, longitude];
    this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#map.on("click", this._showForm.bind(this));
    this.#workouts.forEach((work) => {
      this._renderWorkoutEvents(work);
    });
  }
  _showForm(mape) {
    this.#mapEvent = mape;
    form.classList.remove("hidden");
    inputDistance.focus();
  }
  _hideForm() {
    // empty input
    inputDistance.value = inputDuration.value = inputCadence.value = "";
    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 1000);
  }
  _toggleElevation() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }
  _newWorkouts(e) {
    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));
    const checkPositive = (...inputs) => inputs.every((inpu) => inpu > 0);
    e.preventDefault();

    //get the data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let Workouts;
    // if workout is running , create running object
    if (type === "running") {
      const candance = +inputCadence.value;
      // check if the data is valid
      if (
        !validInputs(distance, duration, candance) ||
        !checkPositive(distance, duration, candance)
      )
        return alert("input have to be positive number");
      Workouts = new Running([lat, lng], distance, duration, candance);
    }

    // if workout is cycling , create cycling object
    if (type === "cycling") {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !checkPositive(distance, duration)
      )
        return alert("input have to be positive number");
      Workouts = new Cycling([lat, lng], distance, duration, elevation);
    }

    // add new object to workout array
    this.#workouts.push(Workouts);

    //render workout on map as marker
    this._renderWorkoutEvents(Workouts);
    console.log(Workouts);
    //render workout on list
    this._renderWorkout(Workouts);

    //hide plus clear input fields
    this._hideForm();

    // set local storage for wokouts
    this._setLocalStorage();
  }
  _renderWorkoutEvents(Workouts) {
    L.marker(Workouts.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          minWidth: 50,
          maxWidth: 300,
          autoClose: false,
          closeOnClick: false,
          className: `${Workouts.type}-popup`,
        })
      )
      .setPopupContent(
        `${Workouts.type === "running" ? "🏃‍♂️" : "🚴‍♂️"} ${Workouts.description}`
      )
      .openPopup();
  }
  _renderWorkout(workouts) {
    let HTML = `
            <li class="workout workout--${workouts.type}" data-id=${
      workouts.id
    }>
          <h2 class="workout__title">${workouts.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workouts.type === "running" ? "🏃‍♂️" : "🚴‍♂️"
            }</span>
            <span class="workout__value">${workouts.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workouts.durations}</span>
            <span class="workout__unit">min</span>
          </div>`;
    if (workouts.type === "running") {
      HTML += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workouts.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workouts.candance.toFixed(1)}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;
    }
    if (workouts.type === "cycling") {
      HTML += ` <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workouts.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workouts.elevations}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;
    }
    form.insertAdjacentHTML("afterend", HTML);
  }
  _moveToPopup(e) {
    const WorkoutEl = e.target.closest(".workout");
    console.log(WorkoutEl);

    if (!WorkoutEl) return;
    const workout = this.#workouts.find(
      (work) => work.id === WorkoutEl.dataset.id
    );
    console.log(workout);

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
  _setLocalStorage() {
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("workouts"));
    console.log(data);
    if (!data) return;
    this.#workouts = data;
    this.#workouts.forEach((work) => {
      this._renderWorkout(work);
    });
  }
}

const app = new App();
