// Smooth scrolling to contact section
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Interactive Form Handling
function handleFormSubmit() {
  const name = document.getElementById('username').value;
  const feedback = document.getElementById('form-feedback');

  feedback.innerText = `[ SYSTEM ACCEPTED ] :: NEURAL LINK ESTABLISHED FOR OPERATIVE ${name.toUpperCase()}`;
  feedback.style.color = "#00f0ff";

  // Reset form inputs after submission
  setTimeout(() => {
    document.getElementById('username').value = '';
    document.getElementById('useremail').value = '';
  }, 1000);
}

// Counter animation for performance metrics
document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        let count = 0;
        const speed = target / 50;

        const updateCount = () => {
          count += speed;
          if (count < target) {
            entry.target.innerText = count.toFixed(target % 1 !== 0 ? 2 : 0);
            setTimeout(updateCount, 30);
          } else {
            entry.target.innerText = target;
          }
        };

        updateCount();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((stat) => observer.observe(stat));
});
