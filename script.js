document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get all form elements including hidden fields
            const formData = {
                _subject: this.elements._subject.value, // Hidden subject field
                name: this.elements.name.value,
                _replyto: this.elements._replyto.value, // Formspree needs this for replies
                message: this.elements.message.value
            };

            // Send to Formspree using Fetch API
            fetch('https://formspree.io/f/mqapgeej', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you for your message! I will get back to you soon.');
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was a problem sending your message. Please try again.');
            });
        });
    }

    // Certifications array (static data)
    const certifications = [
        {
            title: "Python Certification",
            description: "Completed 'Python Basics to Advanced' course from GeeksforGeeks with hands-on projects and practical experience.",
            type: "pdf",
            file_url: "certifications/gfg_python_certificate.pdf"
        },
        {
            title: "SQL Certification",
            description: "Completed 'Advanced SQL Bootcamp' on Udemy with real-world projects and hands-on training.",
            type: "pdf",
            file_url: "certifications/udemy_sql_bootcamp.pdf"
        },
        {
            title: "Power BI Certification",
            description: "Completed a comprehensive Power BI training focused on data visualization, dashboards, and report generation.",
            type: "pdf",
            file_url: "certifications/power_BI_certificate.pdf"
        },
    ];

    const container = document.getElementById('certification-list');
    certifications.forEach(cert => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';

        let embed;

        if (cert.type === 'image') {
            embed = `<img src="${cert.file_url}" class="cert-media mb-2" alt="${cert.title}">`;
        } else if (cert.type === 'pdf') {
            embed = `<iframe src="${cert.file_url}" class="cert-media mb-2" frameborder="0"></iframe>`;
        }

        col.innerHTML = `
            <div class="card text-center">
                <div class="card-body">
                    ${embed}
                    <h5 class="card-title mt-2">${cert.title}</h5>
                    <p class="card-text">${cert.description}</p>
                </div>
            </div>
        `;

        container.appendChild(col);
    });
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
});