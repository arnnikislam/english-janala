// load lessons
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};
// display lessons data
const displayLessons = (lessons) => {
  // parent element
  const lessonsContainer = document.querySelector(".lessonsContainer");
  lessons.forEach((lesson) => {
    const newLesson = document.createElement("div");
    newLesson.innerHTML = `
    <button class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
    </button>
    `;
    lessonsContainer.appendChild(newLesson);
  });
};
loadLessons();
