fetch("/assets/navbar/navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar-container").innerHTML = data;

        const navbar = document.getElementById('navbar');
        const menuToggle = document.getElementById('menu-toggle');
        const navLinks = document.getElementById('nav-links');

        // Récupérer ou créer la balise meta theme-color
        let themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (!themeColorMeta) {
            themeColorMeta = document.createElement('meta');
            themeColorMeta.setAttribute('name', 'theme-color');
            document.head.appendChild(themeColorMeta);
        }

        // Définir la couleur du thème initiale
        themeColorMeta.setAttribute('content', '#d7f1e0'); // Couleur initiale

        const scrollSteps = [
            { limit: 0, className: 'scrolled' } // Le changement se déclenche dès 1px de défilement (scrollY > 0)
        ];

        window.addEventListener('scroll', () => {
            scrollSteps.forEach(step => {
                if (window.scrollY > step.limit) {
                    navbar.classList.add(step.className);
                    themeColorMeta.setAttribute('content', '#e0ffd6'); // Couleur quand la page est défilée
                } else {
                    navbar.classList.remove(step.className);
                    themeColorMeta.setAttribute('content', '#d7f1e0'); // Revenir à la couleur initiale
                }
            });
        });

        // Gestion du changement de couleur du thème au survol de la navbar (quand elle est scrollée)
        if (navbar) {
            navbar.addEventListener('mouseenter', () => {
                // Si la navbar est scrollée ET survolée, on met la couleur du thème à #d7f1e0
                if (navbar.classList.contains('scrolled')) {
                    themeColorMeta.setAttribute('content', '#d7f1e0');
                }
            });

            navbar.addEventListener('mouseleave', () => {
                // Si la navbar est scrollée ET que la souris quitte, on remet la couleur du thème à #e0ffd6
                if (navbar.classList.contains('scrolled')) {
                    themeColorMeta.setAttribute('content', '#e0ffd6');
                }
            });
        }

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    })
    .catch(err => console.error("Erreur de chargement de la navbar :", err));
