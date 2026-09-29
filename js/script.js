// for pronounce word
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

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

// load spinner
const loadSpinner = (status) => {
  if (status) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

// load word by level
const loadLevelWord = (levelId) => {
  loadSpinner(true);
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
    loadSpinner(false);
    return;
  }
  // every card of word
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white py-8 px-6 rounded-sm text-center space-y-3 shadow-sm h-full">

    <button onclick="favWord(${word.id})"><i class="fa-solid fa-heart text-xl bg-[rgba(26,145,255,0.1)] rounded p-2"></i></button>

          <h2 class="text-2xl font-bold">${word.word ? word.word : "শদ পাওয়া যায়নি"}</h2>
          <p>Meaning /Pronounciation</p>
          <p class="bangla-font text-gray-500 font-semibold text-xl">
            "${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} /${word.pronunciation ? word.pronunciation : "উচ্চারণ নেই"}"
          </p>
          <div class="flex justify-between mt-8">
            <button onclick="loadDetailWord(${word.id})"
              ><i
                class="fa-solid fa-circle-info text-xl bg-[rgba(26,145,255,0.1)] rounded p-2"
              ></i
            ></button>
            <button onclick="pronounceWord('${word.word}')"
              ><i
                class="fa-solid fa-volume-high text-xl bg-[rgba(26,145,255,0.1)] rounded p-2"
              ></i
            ></button>
          </div>
    </div>
    `;
    cardContainer.appendChild(card);
    loadSpinner(false);
  });
};

// for btn toggling using event delegation
document
  .querySelector(".lessonsContainer")
  .addEventListener("click", (event) => {
    const lessonBtn = event.target.closest(".lesson-btn");

    if (!lessonBtn) return;

    const allBtn = document.querySelectorAll(".lesson-btn");
    allBtn.forEach((btn) => {
      btn.classList.remove("bg-primary", "text-white");
    });

    lessonBtn.classList.add("bg-primary", "text-white");
  });

//   load details of word
const loadDetailWord = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetailWord(data.data);
};

// displaying details of word
const displayDetailWord = (word) => {
  // for synonyms
  const synonymAll = (arr) => {
    const htmlElement = arr.map(
      (synonym) => `<button class="btn bg-[#EDF7FF]">${synonym}</button>`,
    );
    return htmlElement.join(" ");
  };
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
    <h3 class="text-lg font-bold">
              Eager (<i class="fa-solid fa-microphone-lines"></i>:${word.word})
            </h3>
            <p class="font-semibold">Meaning</p>
            <p class="bangla-font">${word.meaning}</p>
            <p class="font-semibold">Example</p>
            <p>${word.sentence}</p>
            <p class="font-semibold bangla-font">সমার্থক শব্দ গুলো</p>
            <div class="space-x-2">
              ${synonymAll(word.synonyms)}
            </div>
            <button class="btn btn-primary">Complete Learning</button>
    `;
  document.getElementById("word_modal").showModal();
};

// search by word features
document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("input-text");
  const inputValue = input.value.trim().toLowerCase();
  if (!inputValue) {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    const alert = document.createElement("div");
    alert.classList.add("col-span-full");
    alert.innerHTML = `
    <div role="alert" class="alert alert-warning">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
  <span>Warning: Type something.....</span>
</div>
    `;
    wordContainer.append(alert);

    return;
  }

  loadSpinner(true);
  //   fetching all words
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((json) => {
      const words = json.data;
      const filteredWords = words.filter((word) =>
        word.word.toLowerCase().includes(inputValue),
      );
      if (filteredWords.length === 0) {
        const wordContainer = document.getElementById("word-container");
        wordContainer.innerHTML = "";
        const alert = document.createElement("div");
        alert.classList.add("col-span-full");
        alert.innerHTML = `
    <div role="alert" class="alert alert-success">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Sorry No Matched Word Found!</span>
</div>
    `;
        wordContainer.append(alert);
        loadSpinner(false);
        return;
      }
      displayLevelWord(filteredWords);
    });
});

// saved fav words
const favWord = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const word = data.data;

  // every card of word
  const cardContainer = document.getElementById("word-container2");
  const card = document.createElement("div");
  card.innerHTML = `
    <div class="bg-white py-8 px-6 rounded-sm text-center space-y-3 shadow-sm h-full">

    <button"><i class="fa-solid fa-heart text-xl bg-[rgba(26,145,255,0.1)] rounded p-2 text-red-400"></i></button>

          <h2 class="text-2xl font-bold">${word.word ? word.word : "শদ পাওয়া যায়নি"}</h2>
          <p>Meaning /Pronounciation</p>
          <p class="bangla-font text-gray-500 font-semibold text-xl">
            "${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} /${word.pronunciation ? word.pronunciation : "উচ্চারণ নেই"}"
          </p>
          <div class="flex justify-between mt-8">
            <button onclick="loadDetailWord(${word.id})"
              ><i
                class="fa-solid fa-circle-info text-xl bg-[rgba(26,145,255,0.1)] rounded p-2"
              ></i
            ></button>
            <button onclick="pronounceWord('${word.word}')"
              ><i
                class="fa-solid fa-volume-high text-xl bg-[rgba(26,145,255,0.1)] rounded p-2"
              ></i
            ></button>
          </div>
    </div>
    `;
  cardContainer.appendChild(card);
};
document.getElementById("fav-btn").addEventListener("click", () => {
  document.getElementById("word-container2").classList.remove("hidden");
  document.getElementById("word-container").classList.add("hidden");
});
