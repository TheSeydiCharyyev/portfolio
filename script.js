// TechParticlesEngine - Animated Background
class TechParticlesEngine {
  constructor() {
    this.canvas = document.getElementById("particles-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.svgImages = {};
    this.loadedImages = 0;
    this.totalImages = 0;

    this.config = {
      particleCount: 60,
      minParticles: 40,
      maxParticles: 70,
      animationSpeed: 0.8,
      mouseRepulsion: 80,
      showConnections: false,
      enableRotation: true,
      enableCollisions: true,
      collisionDistance: 25,
      particleSize: { min: 25, max: 45 },
    };

    this.explosionParticles = [];
    this.mouse = { x: 0, y: 0 };
    this.usedTechHistory = [];
    this.maxHistorySize = 4;

    this.techData = [
      { name: "Anaconda", file: "anaconda-original.svg", color: "#44A833", category: "tools" },
      { name: "Android", file: "android-original.svg", color: "#3DDC84", category: "mobile" },
      { name: "Android Studio", file: "androidstudio-original.svg", color: "#3DDC84", category: "tools" },
      { name: "AngularJS", file: "angularjs-original.svg", color: "#E23237", category: "frontend" },
      { name: "Angular", file: "angular-original.svg", color: "#DD0031", category: "frontend" },
      { name: "Apache Kafka", file: "apachekafka-original-wordmark.svg", color: "#231F20", category: "backend" },
      { name: "Apache", file: "apache-original.svg", color: "#D22128", category: "backend" },
      { name: "Apple", file: "apple-original.svg", color: "#000000", category: "tools" },
      { name: "Azure DevOps", file: "azuredevops-original.svg", color: "#0078D4", category: "tools" },
      { name: "Azure", file: "azure-original.svg", color: "#0078D4", category: "cloud" },
      { name: "Bash", file: "bash-original.svg", color: "#4EAA25", category: "tools" },
      { name: "Behance", file: "behance-original.svg", color: "#1769FF", category: "design" },
      { name: "BitBucket", file: "bitbucket-original.svg", color: "#0052CC", category: "tools" },
      { name: "Blazor", file: "blazor-original.svg", color: "#512BD4", category: "frontend" },
      { name: "Bootstrap", file: "bootstrap-original.svg", color: "#7952B3", category: "frontend" },
      { name: "Chrome", file: "chrome-original.svg", color: "#4285F4", category: "tools" },
      { name: "Cloudflare", file: "cloudflare-original.svg", color: "#F38020", category: "cloud" },
      { name: "COBOL", file: "cobol-original.svg", color: "#005BBB", category: "languages" },
      { name: "Composer", file: "composer-original.svg", color: "#885630", category: "tools" },
      { name: "C", file: "c-original.svg", color: "#00599C", category: "languages" },
      { name: "C++", file: "cplusplus-original.svg", color: "#00599C", category: "languages" },
      { name: "C#", file: "csharp-original.svg", color: "#239120", category: "languages" },
      { name: "CSS3", file: "css3-original.svg", color: "#1572B6", category: "frontend" },
      { name: "Dart", file: "dart-original.svg", color: "#0175C2", category: "languages" },
      { name: "Delphi", file: "delphi-original.svg", color: "#EE1F35", category: "languages" },
      { name: "Django", file: "django-plain.svg", color: "#092E20", category: "backend" },
      { name: "Django REST", file: "djangorest-original.svg", color: "#092E20", category: "backend" },
      { name: "Docker", file: "docker-original.svg", color: "#2496ED", category: "tools" },
      { name: ".NET", file: "dot-net-original.svg", color: "#512BD4", category: "backend" },
      { name: "Eclipse", file: "eclipse-original.svg", color: "#2C2255", category: "tools" },
      { name: "Express", file: "express-original.svg", color: "#000000", category: "backend" },
      { name: "FastAPI", file: "fastapi-original.svg", color: "#009688", category: "backend" },
      { name: "Figma", file: "figma-original.svg", color: "#F24E1E", category: "design" },
      { name: "Firebase", file: "firebase-original.svg", color: "#FFCA28", category: "cloud" },
      { name: "Firefox", file: "firefox-original.svg", color: "#FF7139", category: "tools" },
      { name: "Flask", file: "flask-original.svg", color: "#000000", category: "backend" },
      { name: "Flutter", file: "flutter-original.svg", color: "#02569B", category: "mobile" },
      { name: "Fortran", file: "fortran-original.svg", color: "#734F96", category: "languages" },
      { name: "GitHub", file: "github-original.svg", color: "#181717", category: "tools" },
      { name: "GitLab", file: "gitlab-original.svg", color: "#FC6D26", category: "tools" },
      { name: "Git", file: "git-original.svg", color: "#F05032", category: "tools" },
      { name: "Google", file: "google-original.svg", color: "#4285F4", category: "tools" },
      { name: "Go", file: "go-original.svg", color: "#00ADD8", category: "languages" },
      { name: "Gradle", file: "gradle-original.svg", color: "#02303A", category: "tools" },
      { name: "Haskell", file: "haskell-original.svg", color: "#5D4F85", category: "languages" },
      { name: "HTML5", file: "html5-original.svg", color: "#E34F26", category: "frontend" },
      { name: "HTMX", file: "htmx-original.svg", color: "#3366CC", category: "frontend" },
      { name: "Java", file: "java-original.svg", color: "#ED8B00", category: "languages" },
      { name: "JavaScript", file: "javascript-original.svg", color: "#F7DF1E", category: "languages" },
      { name: "Jenkins", file: "jenkins-original.svg", color: "#D24939", category: "tools" },
      { name: "JetBrains", file: "jetbrains-original.svg", color: "#000000", category: "tools" },
      { name: "Jetpack Compose", file: "jetpackcompose-original.svg", color: "#4285F4", category: "mobile" },
      { name: "Jira", file: "jira-original.svg", color: "#0052CC", category: "tools" },
      { name: "Kubernetes", file: "kubernetes-original.svg", color: "#326CE5", category: "tools" },
      { name: "Laravel", file: "laravel-original.svg", color: "#FF2D20", category: "backend" },
      { name: "Lua", file: "lua-original.svg", color: "#2C2D72", category: "languages" },
      { name: "MongoDB", file: "mongodb-original.svg", color: "#47A248", category: "database" },
      { name: "Mongoose", file: "mongoose-original.svg", color: "#880000", category: "database" },
      { name: "MySQL", file: "mysql-original.svg", color: "#4479A1", category: "database" },
      { name: "Node.js", file: "nodejs-original.svg", color: "#339933", category: "backend" },
      { name: "Nuxt.js", file: "nuxtjs-original.svg", color: "#00DC82", category: "frontend" },
      { name: "Objective-C", file: "objectivec-plain.svg", color: "#438EFF", category: "languages" },
      { name: "Oracle", file: "oracle-original.svg", color: "#F80000", category: "database" },
      { name: "PostgreSQL", file: "postgresql-original.svg", color: "#336791", category: "database" },
      { name: "Postman", file: "postman-original.svg", color: "#FF6C37", category: "tools" },
      { name: "PowerShell", file: "powershell-original.svg", color: "#5391FE", category: "tools" },
      { name: "Python", file: "python-original.svg", color: "#3776AB", category: "languages" },
      { name: "R Studio", file: "radstudio-original.svg", color: "#ED1F35", category: "tools" },
      { name: "Rails", file: "rails-original-wordmark.svg", color: "#CC0000", category: "backend" },
      { name: "React Native", file: "reactnative-original.svg", color: "#61DAFB", category: "mobile" },
      { name: "React", file: "react-original.svg", color: "#61DAFB", category: "frontend" },
      { name: "Redux", file: "redux-original.svg", color: "#764ABC", category: "frontend" },
      { name: "Ruby", file: "ruby-original.svg", color: "#CC342D", category: "languages" },
      { name: "Rust", file: "rust-original.svg", color: "#000000", category: "languages" },
      { name: "Safari", file: "safari-original.svg", color: "#006CFF", category: "tools" },
      { name: "Spring", file: "spring-original.svg", color: "#6DB33F", category: "backend" },
      { name: "SQLAlchemy", file: "sqlalchemy-original.svg", color: "#D71F00", category: "database" },
      { name: "SQLite", file: "sqlite-original.svg", color: "#003B57", category: "database" },
      { name: "Stack Overflow", file: "stackoverflow-original.svg", color: "#F58025", category: "tools" },
      { name: "Tailwind CSS", file: "tailwindcss-original.svg", color: "#06B6D4", category: "frontend" },
      { name: "Three.js", file: "threejs-original.svg", color: "#000000", category: "frontend" },
      { name: "Vue.js", file: "vuejs-original.svg", color: "#4FC08D", category: "frontend" },
      { name: "YAML", file: "yaml-original.svg", color: "#CB171E", category: "tools" },
      { name: "Zustand", file: "zustand-original.svg", color: "#FF6B35", category: "frontend" },
    ];

    this.init();
  }

  async init() {
    this.setupCanvas();
    this.setupEventListeners();
    await this.loadImages();
    this.createParticles();
    this.startAnimation();
  }

  setupCanvas() {
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  setupEventListeners() {
    document.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    document.addEventListener("touchmove", (e) => {
      if (e.touches[0]) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
      }
    });
  }

  async loadImages() {
    this.totalImages = this.techData.length;
    const promises = this.techData.map((tech) => this.loadImage(tech));
    await Promise.allSettled(promises);
  }

  loadImage(tech) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.svgImages[tech.file] = img;
        this.loadedImages++;
        resolve();
      };
      img.onerror = () => {
        this.loadedImages++;
        resolve();
      };
      img.src = `assets/icons/${tech.file}`;
    });
  }

  getSmartRandomTech() {
    const availableTech = this.techData.filter(
      (tech) => !this.usedTechHistory.includes(tech.name)
    );

    if (availableTech.length < 5) {
      this.usedTechHistory = this.usedTechHistory.slice(-2);
      return this.getSmartRandomTech();
    }

    const randomTech = availableTech[Math.floor(Math.random() * availableTech.length)];
    this.usedTechHistory.push(randomTech.name);

    if (this.usedTechHistory.length > this.maxHistorySize) {
      this.usedTechHistory.shift();
    }

    return randomTech;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    const tech = this.getSmartRandomTech();
    const size =
      Math.random() * (this.config.particleSize.max - this.config.particleSize.min) +
      this.config.particleSize.min;

    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      tech: tech,
      size: size,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.25 + 0.7,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    };
  }

  updateParticles() {
    const speedMultiplier = this.config.animationSpeed;

    if (this.config.enableCollisions) {
      this.checkCollisions();
    }

    this.particles.forEach((particle) => {
      particle.x += particle.vx * speedMultiplier;
      particle.y += particle.vy * speedMultiplier;

      if (this.config.enableRotation) {
        particle.rotation += particle.rotationSpeed * speedMultiplier;
      }

      particle.pulse += particle.pulseSpeed * speedMultiplier;

      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.config.mouseRepulsion) {
        const force = (this.config.mouseRepulsion - distance) / this.config.mouseRepulsion;
        const angle = Math.atan2(dy, dx);
        particle.vx -= Math.cos(angle) * force * 0.3 * speedMultiplier;
        particle.vy -= Math.sin(angle) * force * 0.3 * speedMultiplier;
      }

      if (particle.x <= 0 || particle.x >= this.canvas.width) {
        particle.vx *= -0.9;
        particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      }

      if (particle.y <= 0 || particle.y >= this.canvas.height) {
        particle.vy *= -0.9;
        particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
      }

      particle.vx *= 0.998;
      particle.vy *= 0.998;

      const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      const minSpeed = 0.2;

      if (currentSpeed < minSpeed && currentSpeed > 0.01) {
        const angle = Math.random() * Math.PI * 2;
        const impulse = minSpeed * 0.3;
        particle.vx += Math.cos(angle) * impulse;
        particle.vy += Math.sin(angle) * impulse;
      }

      if (Math.random() < 0.01) {
        particle.vx += (Math.random() - 0.5) * 0.05;
        particle.vy += (Math.random() - 0.5) * 0.05;
      }
    });

    this.updateExplosionParticles();
    this.replenishParticles();
  }

  checkCollisions() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      for (let j = i - 1; j >= 0; j--) {
        const particle1 = this.particles[i];
        const particle2 = this.particles[j];

        const dx = particle1.x - particle2.x;
        const dy = particle1.y - particle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.config.collisionDistance) {
          this.createExplosion(
            (particle1.x + particle2.x) / 2,
            (particle1.y + particle2.y) / 2
          );

          this.particles.splice(i, 1);
          if (j < i) {
            this.particles.splice(j, 1);
            i--;
          }
          break;
        }
      }
    }
  }

  createExplosion(x, y) {
    const colors = ["#2563eb", "#1d4ed8", "#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe"];

    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      this.explosionParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 30,
        maxLife: 30,
        size: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: "circle",
      });
    }
  }

  updateExplosionParticles() {
    for (let i = this.explosionParticles.length - 1; i >= 0; i--) {
      const particle = this.explosionParticles[i];

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.95;
      particle.vy *= 0.95;
      particle.life--;

      if (particle.life <= 0) {
        this.explosionParticles.splice(i, 1);
      }
    }
  }

  replenishParticles() {
    if (this.particles.length < this.config.minParticles) {
      const needed = this.config.minParticles - this.particles.length;
      for (let i = 0; i < needed; i++) {
        setTimeout(() => {
          if (this.particles.length < this.config.maxParticles) {
            this.particles.push(this.createParticle());
          }
        }, i * 500);
      }
    }
  }

  drawParticles() {
    this.particles.forEach((particle) => {
      this.ctx.save();
      this.ctx.translate(particle.x, particle.y);
      this.ctx.rotate(particle.rotation);

      const pulseScale = 1 + Math.sin(particle.pulse) * 0.05;
      this.ctx.scale(pulseScale, pulseScale);

      this.ctx.globalAlpha = particle.opacity;

      const halfSize = particle.size / 2;

      if (this.svgImages[particle.tech.file]) {
        this.ctx.drawImage(
          this.svgImages[particle.tech.file],
          -halfSize,
          -halfSize,
          particle.size,
          particle.size
        );
      } else {
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, halfSize);
        gradient.addColorStop(0, particle.tech.color);
        gradient.addColorStop(0.7, particle.tech.color + "66");
        gradient.addColorStop(1, particle.tech.color + "00");

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, halfSize, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    });

    this.explosionParticles.forEach((particle) => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.life / particle.maxLife;
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawParticles();
  }

  startAnimation() {
    const animate = () => {
      this.updateParticles();
      this.render();
      requestAnimationFrame(animate);
    };
    animate();
  }
}

// Dark Mode Toggle
function initDarkMode() {
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  // Check saved preference - default is dark mode
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme !== "light") {
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

    // Update mini stats for all variants
    if (user && !user.message) {
      // Update Variant A elements
      updateElement('gh-repos-a', user.public_repos || 0);
      updateElement('gh-followers-a', user.followers || 0);

      // Update Recommended Combo elements
      updateElement('gh-repos', user.public_repos || 0);
      updateElement('gh-followers', user.followers || 0);
    }

    if (Array.isArray(repos)) {
      let totalStars = 0;
      let totalForks = 0;

      repos.forEach(repo => {
        totalStars += repo.stargazers_count || 0;
        totalForks += repo.forks_count || 0;
      });

      // Update Variant A elements
      updateElement('gh-stars-a', totalStars);
      updateElement('gh-forks-a', totalForks);

      // Update Recommended Combo elements
      updateElement('gh-stars', totalStars);

      // Render top repos
      const topRepos = repos
        .filter(r => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 4);

      // Render to Variant E (4 repos)
      renderGitHubRepos(topRepos, 'gh-repos-grid');

      // Render to Recommended Combo (3 repos)
      renderGitHubRepos(topRepos.slice(0, 3), 'gh-featured-repos');
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

// Initialize everything on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  // Initialize particles background
  new TechParticlesEngine();

  // Initialize UI features
  initDarkMode();
  initScrollToTop();
  initNavigation();
  initMobileNav();

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

  document.querySelectorAll(".card, .cta-section").forEach((el) => {
    observer.observe(el);
  });

  // Add hover effects to skill tags
  document.querySelectorAll(".skill-tag").forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) translateY(-1px)";
      this.style.boxShadow = "0 8px 20px rgba(37, 99, 235, 0.3)";
    });

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)";
      this.style.boxShadow = "none";
    });
  });
});
