document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  body.setAttribute('data-theme', next);
  themeToggle.textContent = next === 'dark' ? 'Light Mode' : 'Dark Mode';
});

// Category colors
const categoryColors = {
  frontend: getComputedStyle(document.documentElement).getPropertyValue('--color-frontend'),
  backend: getComputedStyle(document.documentElement).getPropertyValue('--color-backend'),
  cloud: getComputedStyle(document.documentElement).getPropertyValue('--color-cloud'),
  testing: getComputedStyle(document.documentElement).getPropertyValue('--color-testing'),
  data: getComputedStyle(document.documentElement).getPropertyValue('--color-data'),
  tools: getComputedStyle(document.documentElement).getPropertyValue('--color-tools'),
  security: getComputedStyle(document.documentElement).getPropertyValue('--color-security')
};

// Skills data
const skillsData = [
  { name: "HTML5", categories: ["frontend"] },
  { name: "CSS3 / SCSS / SASS", categories: ["frontend"] },
  { name: "JavaScript (ES6+)", categories: ["frontend"] },
  { name: "TypeScript", categories: ["frontend"] },
  { name: "Angular / AngularJS", categories: ["frontend"] },
  { name: "React.js", categories: ["frontend"] },
  { name: "Redux / NGRX", categories: ["frontend"] },
  { name: "Vue.js", categories: ["frontend"] },
  { name: "Node.js", categories: ["backend"] },
  { name: "Express.js", categories: ["backend"] },
  { name: "RESTful APIs", categories: ["backend", "cloud"] },
  { name: "Microservices", categories: ["backend"] },
  { name: "AWS Lambda", categories: ["cloud"] },
  { name: "AWS API Gateway", categories: ["cloud"] },
  { name: "AWS S3", categories: ["cloud"] },
  { name: "AWS DynamoDB", categories: ["cloud"] },
  { name: "AWS ECS Fargate", categories: ["cloud"] },
  { name: "AWS CloudFormation", categories: ["cloud"] },
  { name: "Azure Functions", categories: ["cloud"] },
  { name: "Azure Event Hubs", categories: ["cloud"] },
  { name: "Google Cloud Platform", categories: ["cloud"] },
  { name: "Docker", categories: ["cloud"] },
  { name: "Webpack / Babel", categories: ["tools"] },
  { name: "Jenkins / GitHub Actions", categories: ["tools"] },
  { name: "Git / GitHub / TFS", categories: ["tools"] },
  { name: "JWT / OAuth", categories: ["security"] },
  { name: "Bootstrap / Angular Material", categories: ["frontend"] },
  { name: "Kendo UI / Telerik", categories: ["frontend"] },
  { name: "D3.js / Chart.js", categories: ["data"] },
  { name: "Jest", categories: ["testing"] },
  { name: "Mocha", categories: ["testing"] },
  { name: "Chai", categories: ["testing"] },
  { name: "Jasmine", categories: ["testing"] },
  { name: "Protractor", categories: ["testing"] },
  { name: "Responsive Web Design", categories: ["frontend"] },
  { name: "Cross-Browser Compatibility", categories: ["frontend"] }
];

// Render skills with icons & tooltips
const skillsGrid = document.getElementById('skillsGrid');
function renderSkills() {
  skillsGrid.innerHTML = '';
  skillsData.forEach(skill => {
    const div = document.createElement('div');
    div.className = 'skill';
    div.dataset.categories = skill.categories.join(' ');

    // Icon (color by first category)
    const icon = document.createElement('div');
    icon.className = 'skill-icon';
    icon.style.background = categoryColors[skill.categories[0]] || '#999';

    // Tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.textContent = skill.categories[0].charAt(0).toUpperCase() + skill.categories[0].slice(1);

    // Text
    const text = document.createElement('div');
    text.className = 'skill-text';
    text.textContent = skill.name;

    div.appendChild(icon);
    div.appendChild(text);
    div.appendChild(tooltip);
    skillsGrid.appendChild(div);
  });
}
renderSkills();

// Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('skillSearch');
const clearBtn = document.getElementById('clearSearch');

function filterSkills() {
  const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
  const query = searchInput.value.trim().toLowerCase();
  const skillItems = document.querySelectorAll('.skill');

  skillItems.forEach(skill => {
    const categories = skill.dataset.categories.split(' ');
    const matchesCategory = activeFilter === 'all' || categories.includes(activeFilter);
    const matchesSearch = skill.textContent.toLowerCase().includes(query);

    skill.style.display = (matchesCategory && matchesSearch) ? '' : 'none';
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterSkills();
  });
});

searchInput.addEventListener('input', filterSkills);
clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  filterSkills();
});

filterSkills();
