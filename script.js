document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Smooth scrolling for sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all
            sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
            // Add active class to clicked
            this.parentElement.classList.add('active');
            
            // Close sidebar on mobile after clicking a link
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });

    // ScrollSpy implementation
    const sections = document.querySelectorAll('section');
    
    function onScroll() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + window.innerHeight * 0.4; // 40% down the viewport
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Special case: if scrolled to the very top, activate the first section (home)
        if (window.scrollY < 50) {
            currentSectionId = sections[0].getAttribute('id');
        }

        // Special case: if scrolled to the very bottom, activate the last section
        if ((window.innerHeight + Math.ceil(window.scrollY)) >= document.body.offsetHeight - 50) {
            currentSectionId = sections[sections.length - 1].getAttribute('id');
        }
        
        if (currentSectionId) {
            sidebarLinks.forEach(link => {
                link.parentElement.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.parentElement.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', onScroll);
    // Call once on load to set initial state
    onScroll();

    // Adjust project text size to prevent overflow
    function adjustProjectTextSize() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            const info = card.querySelector('.project-info');
            const title = card.querySelector('.project-title');
            const desc = card.querySelector('.project-desc');
            
            if (!info || !title || !desc) return;

            // Reset to default
            title.style.fontSize = '';
            desc.style.fontSize = '';

            let titleSize = 18;
            let descSize = 13;

            // Reduce font size while content overflows
            while (info.scrollHeight > info.clientHeight && titleSize > 10) {
                titleSize -= 0.5;
                descSize -= 0.5;
                title.style.fontSize = titleSize + 'px';
                desc.style.fontSize = descSize + 'px';
            }
        });
    }

    // Call it after a small delay to ensure rendering is complete, and on resize
    setTimeout(adjustProjectTextSize, 100);
    window.addEventListener('resize', adjustProjectTextSize);
});
