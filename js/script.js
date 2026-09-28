// load lessons
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

// display lessons data id
const displayLessons = (lessons) => {
  // parent element
  const lessonsContainer = document.querySelector(".lessonsContainer");
  lessons.forEach((lesson) => {
    const newLesson = document.createElement("div");
    newLesson.innerHTML = `
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
    </button>
    `;
    lessonsContainer.appendChild(newLesson);
  });
};
loadLessons();

// load word by level
const loadLevelWord = (levelId) => {
  const url = `https://openapi.programming-hero.com/api/level/${levelId}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLevelWord(json.data));
};
// display word by level
const displayLevelWord = (words) => {
  // getting the parent
  const cardContainer = document.getElementById("word-container");
  cardContainer.innerHTML = "";
  if (words.length === 0) {
    const errorAlert = document.createElement("div");
    errorAlert.classList.add("col-span-3");
    errorAlert.innerHTML = `
        <div
      class="warning bg-[#F8F8F8] py-10 w-11/12 text-center my-4 mx-auto rounded-md space-y-2 col-span-3"
    >
      <img
        class="block mx-auto"
        src="./assets/alert-error.png"
        alt=""
        srcset=""
      />
      <p class="bangla-font text-sm md:text-xl text-[#79716B]">
        নেক্সট Lesson এ যান
      </p>
      <p class="bangla-font text-[#292524] font-semibold text-xl md:text-2xl">
        এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
      </p>
    </div>
        `;
    cardContainer.append(errorAlert);
    return;
  }
  // every card of word
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white py-8 px-6 rounded-sm text-center space-y-3 shadow-sm">
          <h2 class="text-2xl font-bold">${word.word}</h2>
          <p>${word.pronunciation}</p>
          <p class="bangla-font text-gray-500 font-bold text-xl">
            ${word.meaning}
          </p>
          <div class="flex justify-between">
            <a href="" class=""
              ><i
                class="fa-solid fa-circle-info text-xl bg-[rgba(26,145,255,0.1)] rounded p-2"
              ></i
            ></a>
            <a href=""
              ><i
                class="fa-solid fa-volume-high text-xl bg-[rgba(26,145,255,0.1)] rounded p-2"
              ></i
            ></a>
          </div>
        </div>
    `;
    cardContainer.appendChild(card);
  });
}


// for btn toggling
document
  .querySelector(".lessonsContainer")
  .addEventListener("click", (event) => {
    const lessonBtn = event.target.closest(".lesson-btn");

    if (!lessonBtn) return;

    document.querySelectorAll(".lesson-btn").forEach((btn) => {
      btn.classList.remove("bg-primary", "text-white");
    });

    lessonBtn.classList.add("bg-primary", "text-white");
  });
