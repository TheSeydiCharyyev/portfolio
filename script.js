// Dark Mode Toggle
function initDarkMode() {
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  // Check saved preference - default is light mode
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
  }
}

// Scroll to Top Button
function initScrollToTop() {
  const scrollBtn = document.getElementById("scroll-top-btn");

  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add("visible");
      } else {
        scrollBtn.classList.remove("visible");
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// Navigation Active State
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();
}

// Mobile Navigation Toggle
function initMobileNav() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      });
    });
  }
}

// GitHub Stats
const GITHUB_USERNAME = 'TheSeydiCharyyev';

const langColors = {
  'Python': '#3572A5',
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'Dart': '#00B4AB',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'C++': '#f34b7d',
  'Java': '#b07219',
  'Vue': '#41b883',
  'PHP': '#4F5D95',
  'C': '#555555',
  'Shell': '#89e051'
};

async function initGitHubStats() {
  try {
    // Fetch user data
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    const user = await userRes.json();

    // Fetch repos
    const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    const repos = await reposRes.json();

    if (user && !user.message) {
      updateElement('gh-repos', user.public_repos || 0);
      updateElement('gh-followers', user.followers || 0);
    }

    if (Array.isArray(repos)) {
      let totalStars = 0;
      repos.forEach(repo => {
        totalStars += repo.stargazers_count || 0;
      });
      updateElement('gh-stars', totalStars);

      const topRepos = repos
        .filter(r => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 4);

      renderGitHubRepos(topRepos, 'gh-repos-grid');
    }
  } catch (error) {
    console.error('GitHub API Error:', error);
    const container = document.getElementById('gh-repos-grid');
    if (container) {
      container.innerHTML = `
        <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener" class="repo-card-preview">
          <div class="repo-name"><i class="fab fa-github"></i> View on GitHub</div>
          <div class="repo-desc">Click to view repositories directly on GitHub</div>
        </a>
      `;
    }
  }
}

function updateElement(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderGitHubRepos(repos, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (repos.length === 0) {
    container.innerHTML = `
      <div class="repo-card-preview">
        <div class="repo-name">No repositories yet</div>
        <div class="repo-desc">Projects coming soon!</div>
      </div>
    `;
    return;
  }

  container.innerHTML = repos.map(repo => `
    <a href="${repo.html_url}" target="_blank" rel="noopener" class="repo-card-preview">
      <div class="repo-name">
        <i class="fas fa-book"></i>
        ${repo.name}
      </div>
      <div class="repo-desc">
        ${repo.description || 'No description provided'}
      </div>
      <div class="repo-stats">
        ${repo.language ? `
          <span class="repo-lang">
            <span class="lang-dot" style="background-color: ${langColors[repo.language] || '#64748b'}"></span>
            ${repo.language}
          </span>
        ` : ''}
        <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
        <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
      </div>
    </a>
  `).join('');
}

// Collapsible sections with modal overlay
function initCollapsibleSections() {
  var sectionConfig = {
    about:          { icon: 'fas fa-user',            subtitle: 'My story beyond the code' },
    experience:     { icon: 'fas fa-briefcase',       subtitle: 'Career chapters & milestones' },
    skills:         { icon: 'fas fa-code',            subtitle: 'Technologies & frameworks' },
    projects:       { icon: 'fas fa-folder-open',     subtitle: 'Shipped & in progress' },
    github:         { icon: 'fab fa-github',          subtitle: 'Stats, repos & contributions' },
    profiles:       { icon: 'fas fa-globe',           subtitle: 'Platforms & communities' },
    languages:      { icon: 'fas fa-language',        subtitle: 'Human languages I speak' },
    certifications: { icon: 'fas fa-certificate',     subtitle: '200+ certificates & counting' },
    education:      { icon: 'fas fa-graduation-cap',  subtitle: 'Where the journey began' },
    contact:        { icon: 'fas fa-envelope',        subtitle: "Let's connect" }
  };

  var modal = document.getElementById('section-modal');
  var modalTitle = modal.querySelector('.section-modal-title');
  var modalBody = modal.querySelector('.section-modal-body');
  var modalClose = modal.querySelector('.section-modal-close');

  function openModal(section) {
    var h2 = section.querySelector('h2');
    var headingText = h2.querySelector('.heading-text span:first-child');
    modalTitle.textContent = headingText ? headingText.textContent : h2.textContent.trim();

    // Clone all content except h2
    modalBody.innerHTML = '';
    Array.from(section.children).forEach(function(child) {
      if (child.tagName !== 'H2') {
        modalBody.appendChild(child.cloneNode(true));
      }
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  document.querySelectorAll('.collapsible').forEach(function(section) {
    var h2 = section.querySelector('h2');
    if (!h2) return;

    var sectionId = section.id;
    var config = sectionConfig[sectionId];

    // Get original heading text
    var headingText = h2.textContent.trim();

    // Rebuild h2 internals
    h2.innerHTML = '';

    // Create heading content wrapper
    var headingContent = document.createElement('span');
    headingContent.className = 'heading-content';

    // Create icon if config exists
    if (config) {
      var iconCircle = document.createElement('span');
      iconCircle.className = 'section-icon-circle';
      var iconEl = document.createElement('i');
      iconEl.className = config.icon;
      iconCircle.appendChild(iconEl);
      headingContent.appendChild(iconCircle);
    }

    // Create text wrapper
    var textWrapper = document.createElement('span');
    textWrapper.className = 'heading-text';

    var titleSpan = document.createElement('span');
    titleSpan.textContent = headingText;
    textWrapper.appendChild(titleSpan);

    // Add subtitle
    if (config) {
      var subtitleSpan = document.createElement('span');
      subtitleSpan.className = 'section-subtitle';
      subtitleSpan.textContent = config.subtitle;
      textWrapper.appendChild(subtitleSpan);
    }

    headingContent.appendChild(textWrapper);
    h2.appendChild(headingContent);

    // Add arrow icon
    var arrow = document.createElement('i');
    arrow.className = 'fas fa-chevron-right collapse-icon';
    h2.appendChild(arrow);

    // Keep section always collapsed, open modal on click
    section.classList.add('collapsed');

    h2.addEventListener('click', function() {
      openModal(section);
    });
  });
}

// Collapsible Experience Chapters (event delegation for modal clones)
function initExperienceCollapse() {
  document.addEventListener('click', function(e) {
    var header = e.target.closest('.exp-collapsible .experience-header');
    if (!header) return;
    var item = header.closest('.exp-collapsible');
    if (item) {
      item.classList.toggle('exp-collapsed');
    }
  });
}

// Initialize everything on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  // Initialize UI features
  initDarkMode();
  initScrollToTop();
  initNavigation();
  initMobileNav();
  initCollapsibleSections();
  initExperienceCollapse();

  // Initialize GitHub stats
  initGitHubStats();

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeIn 0.8s ease-in forwards";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".card, .cta-section, .sections-grid .collapsible").forEach((el) => {
    observer.observe(el);
  });

  // Add hover effects to skill tags
  document.querySelectorAll(".skill-tag").forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) translateY(-1px)";
      this.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    });

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)";
      this.style.boxShadow = "none";
    });
  });
});
