(() => {
  const STORAGE_KEY = "campusconnect.student-hub.v1";
  const GRADE_POINTS = { O: 10, "A+": 9, A: 8, "B+": 7, B: 6, C: 5, P: 4, F: 0 };
  const GRADE_OPTIONS = Object.keys(GRADE_POINTS);
  const CATEGORIES = ["Quantitative", "Logical reasoning", "Verbal ability"];
  const QUESTION_BANK = {
    Quantitative: [
      {
        id: "q-notebooks",
        prompt: "Five notebooks cost ₹120. At the same rate, how much do eight notebooks cost?",
        options: ["₹168", "₹180", "₹192", "₹200"],
        answer: 2,
        explanation: "One notebook costs ₹120 ÷ 5 = ₹24. Eight cost 8 × ₹24 = ₹192."
      },
      {
        id: "q-average",
        prompt: "What is the average of 12, 16, 20, and 24?",
        options: ["16", "18", "20", "22"],
        answer: 1,
        explanation: "The total is 72. Divide by the four numbers: 72 ÷ 4 = 18."
      },
      {
        id: "q-sequence",
        prompt: "What number comes next: 3, 7, 15, 31, …?",
        options: ["47", "55", "61", "63"],
        answer: 3,
        explanation: "Each term is doubled and then 1 is added: 31 × 2 + 1 = 63."
      },
      {
        id: "q-percent",
        prompt: "A club has 450 members. If 20% attend a meeting, how many attend?",
        options: ["45", "80", "90", "120"],
        answer: 2,
        explanation: "20% of 450 is 0.20 × 450 = 90 members."
      },
      {
        id: "q-ratio",
        prompt: "A 3:5 ratio represents 64 students. How many are in the smaller group?",
        options: ["18", "24", "30", "40"],
        answer: 1,
        explanation: "There are 8 parts total. Each part is 64 ÷ 8 = 8, so the smaller group is 3 × 8 = 24."
      }
    ],
    "Logical reasoning": [
      {
        id: "q-sparrows",
        prompt: "All sparrows are birds. Some birds migrate. What can we conclude about sparrows?",
        options: ["All sparrows migrate", "No sparrows migrate", "Some sparrows migrate", "It cannot be determined"],
        answer: 3,
        explanation: "The migrating birds may or may not include sparrows, so none of the first three claims follows."
      },
      {
        id: "q-pattern",
        prompt: "Which number comes next: 3, 8, 15, 24, 35, …?",
        options: ["42", "46", "48", "50"],
        answer: 2,
        explanation: "The gaps are 5, 7, 9, and 11. The next gap is 13, so 35 + 13 = 48."
      },
      {
        id: "q-order",
        prompt: "Mira arrives before Dev. Dev arrives before Lee. Who arrives last?",
        options: ["Mira", "Dev", "Lee", "Cannot be determined"],
        answer: 2,
        explanation: "The order is Mira, then Dev, then Lee. Lee arrives last."
      },
      {
        id: "q-directions",
        prompt: "Walk 4 metres north, then 4 metres east. In which direction is the starting point?",
        options: ["North-east", "South-west", "South-east", "North-west"],
        answer: 1,
        explanation: "The endpoint is north-east of the start, so the start is south-west of the endpoint."
      },
      {
        id: "q-analogy",
        prompt: "Book is to reading as fork is to …",
        options: ["Drawing", "Writing", "Eating", "Cooking"],
        answer: 2,
        explanation: "Reading is the activity commonly done with a book; eating is the activity commonly done with a fork."
      }
    ],
    "Verbal ability": [
      {
        id: "q-synonym",
        prompt: "Choose the closest meaning of “concise.”",
        options: ["Brief and clear", "Loud and confident", "Complex and detailed", "Careful and slow"],
        answer: 0,
        explanation: "Concise means expressing something clearly in few words."
      },
      {
        id: "q-grammar",
        prompt: "Choose the grammatically correct sentence.",
        options: ["Each of the students have a notebook.", "Each of the students has a notebook.", "Each students has a notebook.", "Each of students have a notebook."],
        answer: 1,
        explanation: "“Each” is singular, so it takes the singular verb “has.”"
      },
      {
        id: "q-antonym",
        prompt: "Which word is the opposite of “scarce”?",
        options: ["Rare", "Limited", "Plentiful", "Insufficient"],
        answer: 2,
        explanation: "Scarce means in short supply; plentiful means available in abundance."
      },
      {
        id: "q-meaning",
        prompt: "In “The team reached a consensus,” what does “consensus” mean?",
        options: ["A disagreement", "A shared agreement", "A written report", "A quick decision"],
        answer: 1,
        explanation: "Consensus is general agreement reached by a group."
      },
      {
        id: "q-completion",
        prompt: "Complete the sentence: “Despite ___ tired, Ravi finished the assignment.”",
        options: ["be", "being", "was", "been"],
        answer: 1,
        explanation: "“Despite” is followed by a noun or gerund; “being tired” is the correct form."
      }
    ]
  };
  const VTU_AI_QUESTIONS = [
    { module: 1, prompt: "How are artificial intelligence, machine learning, and deep learning related?", answer: "AI is the broader field. Machine learning is an approach within AI that learns patterns from data, and deep learning is a machine-learning approach built around multi-layer neural networks." },
    { module: 1, prompt: "Compare a reactive machine with a limited-memory AI system.", answer: "A reactive system responds to its current input without using remembered past data. A limited-memory system can use relevant recent or stored observations when making a decision." },
    { module: 1, prompt: "What is the key difference between uninformed and informed search?", answer: "Uninformed search uses the problem definition without a goal-directed heuristic. Informed search uses a heuristic estimate to guide which states to explore." },
    { module: 1, prompt: "In greedy best-first search, how is the next node chosen, and what is one limitation?", answer: "It selects the node with the best (usually lowest) heuristic estimate to the goal. Because it focuses on that estimate rather than total path cost, it does not generally guarantee an optimal solution." },
    { module: 1, prompt: "What role does a knowledge base play in a knowledge-based agent?", answer: "It stores facts or rules about a domain; the agent uses those representations and inference to derive information that can guide its actions." },
    { module: 2, prompt: "Distinguish zero-shot, one-shot, and few-shot prompting.", answer: "Zero-shot gives instructions without examples; one-shot includes one example; few-shot includes several examples to illustrate the expected task or output." },
    { module: 2, prompt: "What details would make an instruction prompt for explaining AI to a first-year student more useful?", answer: "State the task and audience, add relevant context, set any length or content constraints, and request a clear output format such as a short explanation with one example." },
    { module: 2, prompt: "What is the central idea of self-consistency prompting?", answer: "Generate multiple candidate reasoning paths or answers and compare them, using a consistent result as evidence. Agreement can help but does not itself prove that an answer is correct." },
    { module: 2, prompt: "A prompt produces answers that are too broad. How could you refine it?", answer: "Narrow the topic, specify the audience and desired scope, add constraints, and state the output format. Then test the revised prompt and adjust based on the result." },
    { module: 3, prompt: "Choose regression, classification, or clustering for each goal: estimate a house price, label an email as spam, and group similar customers without labels.", answer: "House price is regression because the output is numeric; spam detection is classification because it assigns a known label; grouping customers without labels is clustering." },
    { module: 3, prompt: "What assumption makes the Naive Bayes classifier computationally convenient?", answer: "It treats features as conditionally independent given the class. Bayes' rule then combines prior class probabilities with feature likelihoods to estimate a class." },
    { module: 3, prompt: "What does a support vector machine try to maximize when separating classes?", answer: "It seeks a decision boundary with a large margin between classes; the closest training examples, called support vectors, determine that boundary." },
    { module: 3, prompt: "Name the basic parts of a neural network and describe how learning changes it.", answer: "A neural network has connected layers of units with weights and activation functions. During training, the weights are adjusted to reduce prediction error on the training objective." },
    { module: 3, prompt: "A dataset has no category labels, but you need to discover naturally similar records. Which technique family fits, and why?", answer: "Clustering fits because it groups examples by similarity without requiring preassigned category labels." },
    { module: 4, prompt: "Give two ethical concerns to check before deploying an AI system that affects people.", answer: "Check for unfair bias and privacy risks, among other concerns such as transparency, reliability, and accountability. The relevant checks depend on the use and affected people." },
    { module: 4, prompt: "What does AI as a Service (AIaaS) mean?", answer: "AIaaS provides AI capabilities through a service that users can access without building and operating the entire AI infrastructure themselves." },
    { module: 4, prompt: "How does AIoT differ from IoT?", answer: "IoT connects devices that collect or exchange data. AIoT combines connected devices with AI methods so data can support analysis or more autonomous decisions." },
    { module: 4, prompt: "What are the two core components commonly found in an expert system?", answer: "A knowledge base represents domain facts and rules, while an inference mechanism applies them to reach conclusions or recommendations." },
    { module: 5, prompt: "Name one way AI could assist a drone and one safety constraint its designers should consider.", answer: "AI could help interpret sensor data for navigation or obstacle detection. Designers should consider fail-safe behavior, operating limits, and human oversight appropriate to the drone's use." },
    { module: 5, prompt: "Suggest an AI use in healthcare and one reason a human professional should remain involved.", answer: "AI could help prioritize or analyze clinical information. A qualified professional should review outputs because errors, bias, privacy, and individual context can affect care." },
    { module: 5, prompt: "Compare no-code and low-code AI tools, and give a situation suited to each.", answer: "No-code tools aim to let users configure workflows without writing code; low-code tools allow some coding or customization. A standard workflow may suit no-code, while a workflow needing custom integration may benefit from low-code." },
    { module: 5, prompt: "Choose one syllabus application area—agriculture, finance, retail, education, or transportation—and describe one possible AI task and one risk to evaluate.", answer: "Answers vary. For example, an agricultural model might estimate crop disease risk from images; its reliability across conditions and the consequences of incorrect advice should be evaluated." }
  ];

  const status = document.querySelector("#hub-status");
  const courseRows = document.querySelector("#course-rows");
  const sgpaForm = document.querySelector("#sgpa-form");
  if (!status || !courseRows || !sgpaForm) return;

  function showStatus(message, isError = false) {
    status.hidden = false;
    status.textContent = message;
    status.classList.toggle("is-error", isError);
  }

  function getDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function createEmptyState() {
    return { version: 1, semesters: [], placementTasks: {}, dailyAnswers: {}, completedDays: [] };
  }

  function isObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return createEmptyState();

    let data;
    try {
      data = JSON.parse(saved);
    } catch (error) {
      throw new Error("Saved student data is unreadable. It has not been overwritten.", { cause: error });
    }

    const validSemesters = Array.isArray(data?.semesters) && data.semesters.every(record =>
      Number.isInteger(record.semester) &&
      Number.isFinite(record.sgpa) &&
      Array.isArray(record.courses) &&
      record.courses.every(course =>
        typeof course.name === "string" &&
        Number.isFinite(course.credits) &&
        Object.hasOwn(GRADE_POINTS, course.grade)
      )
    );
    if (
      data?.version !== 1 ||
      !validSemesters ||
      !isObject(data.placementTasks) ||
      !Object.values(data.placementTasks).every(value => typeof value === "boolean") ||
      !isObject(data.dailyAnswers) ||
      !Object.values(data.dailyAnswers).every(answers =>
        isObject(answers) &&
        Object.values(answers).every(value => Number.isInteger(value) && value >= 0 && value <= 3)
      ) ||
      !Array.isArray(data.completedDays) ||
      !data.completedDays.every(day => typeof day === "string")
    ) {
      throw new Error("Saved student data has an unsupported format. It has not been overwritten.");
    }
    return data;
  }

  let state;
  try {
    state = loadState();
  } catch (error) {
    showStatus(error.message, true);
    document.querySelectorAll("button, input, select").forEach(control => {
      control.disabled = true;
    });
    return;
  }

  function saveState(message) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      if (message) showStatus(message);
      return true;
    } catch (error) {
      showStatus(`Could not save your data in this browser: ${error.message}`, true);
      return false;
    }
  }

  function createCourseRow(course = {}) {
    const row = document.createElement("div");
    row.className = "course-row";

    const name = document.createElement("input");
    name.type = "text";
    name.name = "course";
    name.placeholder = "e.g. Mathematics";
    name.maxLength = 80;
    name.required = true;
    name.value = course.name || "";
    name.setAttribute("aria-label", "Course name");

    const credits = document.createElement("input");
    credits.type = "number";
    credits.name = "credits";
    credits.min = "0.5";
    credits.max = "30";
    credits.step = "0.5";
    credits.placeholder = "4";
    credits.required = true;
    credits.value = course.credits || "";
    credits.setAttribute("aria-label", "Course credits");

    const grade = document.createElement("select");
    grade.name = "grade";
    grade.required = true;
    grade.setAttribute("aria-label", "Course grade");
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Grade";
    grade.append(placeholder);
    GRADE_OPTIONS.forEach(letter => {
      const option = document.createElement("option");
      option.value = letter;
      option.textContent = `${letter} · ${GRADE_POINTS[letter]}`;
      grade.append(option);
    });
    grade.value = course.grade || "";

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove-course";
    remove.textContent = "×";
    remove.setAttribute("aria-label", "Remove course");
    remove.addEventListener("click", () => {
      row.remove();
      updateEstimate();
    });

    row.append(name, credits, grade, remove);
    courseRows.append(row);
    return row;
  }

  function readCourses(requireComplete) {
    const courses = [];
    for (const row of courseRows.querySelectorAll(".course-row")) {
      const name = row.querySelector('[name="course"]').value.trim();
      const credits = Number(row.querySelector('[name="credits"]').value);
      const grade = row.querySelector('[name="grade"]').value;
      if (!name && !row.querySelector('[name="credits"]').value && !grade) continue;

      if (!name || !Number.isFinite(credits) || credits < 0.5 || credits > 30 || !GRADE_POINTS.hasOwnProperty(grade)) {
        if (requireComplete) row.querySelector(":invalid")?.focus();
        return null;
      }
      courses.push({ name, credits, grade });
    }
    return courses;
  }

  function calculateSGPA(courses) {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const weightedPoints = courses.reduce(
      (sum, course) => sum + GRADE_POINTS[course.grade] * course.credits,
      0
    );
    return { totalCredits, weightedPoints, sgpa: totalCredits ? weightedPoints / totalCredits : null };
  }

  function updateEstimate() {
    const courses = readCourses(false);
    const result = document.querySelector("#sgpa-result");
    const detail = document.querySelector("#sgpa-detail");
    if (!courses || courses.length === 0) {
      result.textContent = "—";
      detail.textContent = "Complete each course row to see your calculation.";
      return;
    }
    const calculation = calculateSGPA(courses);
    result.textContent = calculation.sgpa.toFixed(2);
    detail.textContent = `${calculation.weightedPoints.toFixed(1)} weighted points across ${calculation.totalCredits} credits.`;
  }

  function renderGradeBook() {
    const container = document.querySelector("#grade-book");
    container.replaceChildren();
    if (state.semesters.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "Your saved semester grades will appear here. Add a course above to get started.";
      container.append(empty);
      return;
    }

    const tableWrap = document.createElement("div");
    tableWrap.className = "table-wrap";
    const table = document.createElement("table");
    const head = table.createTHead().insertRow();
    ["Semester", "Courses", "Credits", "SGPA", "Action"].forEach(label => {
      const th = document.createElement("th");
      th.textContent = label;
      head.append(th);
    });
    const body = table.createTBody();
    [...state.semesters].sort((a, b) => a.semester - b.semester).forEach(record => {
      const row = body.insertRow();
      [String(record.semester), String(record.courses.length), String(record.courses.reduce((sum, course) => sum + course.credits, 0)), record.sgpa.toFixed(2)].forEach(value => {
        const cell = row.insertCell();
        cell.textContent = value;
      });
      const actionCell = row.insertCell();
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "text-button";
      remove.textContent = "Remove";
      remove.setAttribute("aria-label", `Remove semester ${record.semester}`);
      remove.addEventListener("click", () => {
        const previousSemesters = state.semesters;
        state.semesters = state.semesters.filter(item => item.semester !== record.semester);
        if (saveState("Semester grades removed.")) {
          renderGradeBook();
        } else {
          state.semesters = previousSemesters;
        }
      });
      actionCell.append(remove);
    });
    tableWrap.append(table);
    container.append(tableWrap);

    const progressTitle = document.createElement("h3");
    progressTitle.className = "progress-title";
    progressTitle.textContent = "SGPA by semester";
    container.append(progressTitle);
    [...state.semesters].sort((a, b) => a.semester - b.semester).forEach(record => {
      const item = document.createElement("div");
      item.className = "grade-progress-row";
      const label = document.createElement("span");
      label.textContent = `Sem ${record.semester}`;
      const track = document.createElement("div");
      track.className = "progress-track";
      track.setAttribute("aria-label", `Semester ${record.semester} SGPA`);
      const bar = document.createElement("span");
      bar.style.width = `${Math.max(0, Math.min(100, record.sgpa * 10))}%`;
      track.append(bar);
      const score = document.createElement("b");
      score.textContent = record.sgpa.toFixed(2);
      item.append(label, track, score);
      container.append(item);
    });
  }

  function updatePlacementProgress() {
    const tasks = document.querySelectorAll("[data-placement-task]");
    let complete = 0;
    tasks.forEach(input => {
      const done = Boolean(state.placementTasks[input.dataset.placementTask]);
      input.checked = done;
      if (done) complete += 1;
    });
    const percentage = Math.round((complete / tasks.length) * 100);
    document.querySelector("#placement-progress-label").textContent = `${complete} of ${tasks.length} steps`;
    document.querySelector("#placement-progress-bar").style.width = `${percentage}%`;
    document.querySelector(".progress-track[role=progressbar]").setAttribute("aria-valuenow", String(percentage));
  }

  function todayQuestions() {
    const now = new Date();
    const dateKey = getDateKey(now);
    const dayNumber = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86_400_000);
    return {
      dateKey,
      questions: CATEGORIES.map(category => {
        const categoryQuestions = QUESTION_BANK[category];
        return { category, ...categoryQuestions[dayNumber % categoryQuestions.length] };
      })
    };
  }

  function renderDailyPractice() {
    const { dateKey, questions } = todayQuestions();
    document.querySelector("#daily-date-label").textContent = new Intl.DateTimeFormat(undefined, {
      weekday: "long", month: "long", day: "numeric"
    }).format(new Date());
    const container = document.querySelector("#daily-questions");
    container.replaceChildren();
    const answers = state.dailyAnswers[dateKey] || {};

    questions.forEach((question, index) => {
      const card = document.createElement("article");
      card.className = "question-card";
      const header = document.createElement("div");
      header.className = "question-header";
      const category = document.createElement("span");
      category.className = "question-category";
      category.textContent = `${String(index + 1).padStart(2, "0")} · ${question.category}`;
      const prompt = document.createElement("h3");
      prompt.textContent = question.prompt;
      header.append(category, prompt);

      const choices = document.createElement("div");
      choices.className = "answer-options";
      question.options.forEach((option, optionIndex) => {
        const choice = document.createElement("button");
        choice.type = "button";
        choice.className = "answer-option";
        choice.textContent = option;
        choice.disabled = Object.hasOwn(answers, question.id);
        if (Object.hasOwn(answers, question.id) && optionIndex === answers[question.id]) {
          choice.classList.add(optionIndex === question.answer ? "is-correct" : "is-incorrect");
        }
        if (Object.hasOwn(answers, question.id) && optionIndex === question.answer) {
          choice.classList.add("is-correct");
        }
        choice.addEventListener("click", () => answerQuestion(dateKey, question, optionIndex));
        choices.append(choice);
      });

      card.append(header, choices);
      if (Object.hasOwn(answers, question.id)) {
        const feedback = document.createElement("p");
        feedback.className = `answer-feedback ${answers[question.id] === question.answer ? "is-correct" : "is-incorrect"}`;
        feedback.textContent = `${answers[question.id] === question.answer ? "Correct!" : "Not quite."} ${question.explanation}`;
        card.append(feedback);
      }
      container.append(card);
    });

    const answered = questions.filter(question => Object.hasOwn(answers, question.id)).length;
    if (answered === questions.length && !state.completedDays.includes(dateKey)) {
      state.completedDays.push(dateKey);
      if (!saveState()) state.completedDays.pop();
    }
    document.querySelector("#daily-completion").textContent = answered === questions.length
      ? `Today's practice complete · ${getCurrentStreak()} day${getCurrentStreak() === 1 ? "" : "s"} in a row.`
      : `${answered} of ${questions.length} answered. Keep going—you've got this.`;
  }

  function getCurrentStreak() {
    const completed = new Set(state.completedDays);
    let streak = 0;
    const date = new Date();
    while (completed.has(getDateKey(date))) {
      streak += 1;
      date.setDate(date.getDate() - 1);
    }
    return streak;
  }

  function answerQuestion(dateKey, question, selectedIndex) {
    if (!state.dailyAnswers[dateKey]) state.dailyAnswers[dateKey] = {};
    if (Object.hasOwn(state.dailyAnswers[dateKey], question.id)) return;
    state.dailyAnswers[dateKey][question.id] = selectedIndex;
    if (!saveState()) {
      delete state.dailyAnswers[dateKey][question.id];
      return;
    }
    renderDailyPractice();
  }

  function renderVtuQuestions() {
    const filter = document.querySelector("#vtu-module-filter").value;
    const container = document.querySelector("#vtu-question-list");
    container.replaceChildren();
    VTU_AI_QUESTIONS
      .filter(question => filter === "all" || question.module === Number(filter))
      .forEach((question, index) => {
        const card = document.createElement("article");
        card.className = "vtu-question-card";
        const module = document.createElement("span");
        module.className = "vtu-question-module";
        module.textContent = `Module ${question.module} · ${String(index + 1).padStart(2, "0")}`;
        const prompt = document.createElement("h4");
        prompt.textContent = question.prompt;
        const details = document.createElement("details");
        const summary = document.createElement("summary");
        summary.textContent = "Reveal answer notes";
        const answer = document.createElement("p");
        answer.textContent = question.answer;
        details.append(summary, answer);
        card.append(module, prompt, details);
        container.append(card);
      });
  }

  function renderVtuResources() {
    const semester = Number(document.querySelector("#vtu-semester").value);
    const status = document.querySelector("#vtu-resource-status");
    const courseCard = document.querySelector("#vtu-course-card");
    const questionPanel = document.querySelector("#vtu-question-panel");
    courseCard.replaceChildren();
    if (semester > 2) {
      status.textContent = `No verified 2025-scheme AIML syllabus or model paper is listed here for semester ${semester}. VTU's published 2025 engineering syllabus currently covers semesters 1–2; use the official indexes below to check for updates. Older-scheme papers are not mixed into this 2025 view.`;
      courseCard.hidden = true;
      questionPanel.hidden = true;
      return;
    }

    status.textContent = `Verified 2025-scheme material is available for semester ${semester}. VTU lists Introduction to AI and Applications (1BAIA103/203) as a cross-stream Emerging Technology Course.`;
    const heading = document.createElement("h3");
    heading.textContent = "Introduction to AI and Applications";
    const code = document.createElement("p");
    code.className = "vtu-course-code";
    code.textContent = `Course code: 1BAIA103/203 · Semester ${semester} · 3 credits`;
    const note = document.createElement("p");
    note.className = "vtu-paper-note";
    note.textContent = "This cross-stream course is AIML-relevant, but is not a branch-specific AIML paper. The linked VTU document is a 2025-scheme model paper, not a historical previous-year exam.";
    const links = document.createElement("div");
    links.className = "vtu-course-links";
    [
      ["Open official model question paper (PDF)", "https://vtu.ac.in/pdf/QP/1BAIA103.pdf"],
      ["Open official course syllabus (PDF)", "https://vtu.ac.in/pdf/UG2024/1BAIA103.pdf"]
    ].forEach(([label, href]) => {
      const link = document.createElement("a");
      link.className = "button button-outline";
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = label;
      links.append(link);
    });
    courseCard.append(heading, code, note, links);
    courseCard.hidden = false;
    questionPanel.hidden = false;
    renderVtuQuestions();
  }

  document.querySelector("#add-course").addEventListener("click", () => {
    createCourseRow();
    courseRows.lastElementChild.querySelector('[name="course"]').focus();
  });
  courseRows.addEventListener("input", updateEstimate);
  courseRows.addEventListener("change", updateEstimate);

  sgpaForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!sgpaForm.reportValidity()) return;
    const courses = readCourses(true);
    if (!courses || courses.length === 0) {
      showStatus("Add at least one complete course before saving.", true);
      return;
    }
    const semester = Number(document.querySelector("#semester").value);
    const { sgpa } = calculateSGPA(courses);
    const previousSemesters = state.semesters;
    state.semesters = state.semesters.filter(record => record.semester !== semester);
    state.semesters.push({ semester, courses, sgpa });
    if (saveState(`Semester ${semester} grades saved. SGPA: ${sgpa.toFixed(2)}.`)) {
      renderGradeBook();
    } else {
      state.semesters = previousSemesters;
    }
  });

  document.querySelectorAll("[data-placement-task]").forEach(input => {
    input.addEventListener("change", () => {
      const task = input.dataset.placementTask;
      const previousValue = state.placementTasks[task];
      state.placementTasks[task] = input.checked;
      if (saveState("Placement checklist updated.")) {
        updatePlacementProgress();
      } else {
        input.checked = Boolean(previousValue);
        if (previousValue === undefined) delete state.placementTasks[task];
        else state.placementTasks[task] = previousValue;
      }
    });
  });

  document.querySelector("#vtu-semester").addEventListener("change", renderVtuResources);
  document.querySelector("#vtu-module-filter").addEventListener("change", renderVtuQuestions);

  createCourseRow();
  createCourseRow();
  updateEstimate();
  renderGradeBook();
  updatePlacementProgress();
  renderDailyPractice();
  renderVtuResources();
})();
