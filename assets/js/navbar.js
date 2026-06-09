fetch("/assets/navbar/navbar.html")
    .then(response => response.text())
    .then(data => {
        // 1. On injecte le HTML de la navbar
        document.getElementById("navbar-container").innerHTML = data;

        // 2. On récupère les éléments du DOM
        const navbar = document.getElementById('navbar');
        const menuToggle = document.getElementById('menu-toggle');
        const navLinks = document.getElementById('nav-links');

        // 3. Configuration des paliers de scroll (du plus grand au plus petit)
        const scrollSteps = [
            { limit: 800, className: 'scrolled4' },
            { limit: 1950, className: 'scrolled3' },
            { limit: 1300, className: 'scrolled2' },
            { limit: 350, className: 'scrolled' }
        ];

        // 4. Écouteur de scroll dynamique
        window.addEventListener('scroll', () => {
            scrollSteps.forEach(step => {
                if (window.scrollY > step.limit) {
                    navbar.classList.add(step.className);
                } else {
                    navbar.classList.remove(step.className);
                }
            });
        });

        // 5. Sécurité pour le menu burger
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    })
    .catch(err => console.error("Erreur de chargement de la navbar :", err));
