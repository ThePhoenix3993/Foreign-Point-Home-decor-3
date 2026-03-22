document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    }
    
    // Close mobile menu on link click smoothly
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. Intersection Observer for Scroll Animations
    // Select all elements needing staggered animations
    const animatedElements = document.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Trigger animation when element is 15% visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add("appear");
                // Unobserve to ensure animation only plays once for premium feel
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
    
    // 4. Subtle Parallax for Fixed Background
    // Adds a rich, dynamic sense of depth combined with the blur
    const bg = document.querySelector(".fixed-bg");
    window.addEventListener("scroll", () => {
        const scrollVal = window.scrollY;
        // Move the background slightly down as user scrolls down for depth
        // Maintain scale to hide any edge blurring artifacts
        if (bg) {
            bg.style.transform = `translateY(${scrollVal * 0.05}px) translateZ(0)`;
        }
    });

    // 5. Smooth Scroll Fallback (Optional, since CSS handles most of it)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== "#") {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 6. Form Submission Prevention Layout (for static demo)
    const form = document.querySelector(".contact-form");
    if(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = "Message Sent!";
            btn.style.background = "transparent";
            btn.style.color = "var(--gold)";
            
            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalText;
                btn.style.background = "var(--gold)";
                btn.style.color = "#111";
            }, 3000);
        });
    }

    // --- NEW: PRODUCT DETAILS FEATURE ---

    const productsDb = {
        "golden-wall-clocks": {
            name: "Golden Wall Clocks",
            price: "$120.00",
            description: "Timeless elegance for any room. A signature piece that captures luxury and precision. Features a premium metallic finish and silent quartz movement.",
            specs: ["Material: Gold-plated metal", "Size: 24 inches diameter", "Movement: Silent Quartz"],
            category: "Clocks",
            image: "golden_wall_clocks_1773927637156.png"
        },
        "ganesha-fountains": {
            name: "Ganesha Fountains",
            price: "$85.00",
            description: "Serenity and grace intertwined. Bring calming ambiance to your personal space with this beautiful flowing water feature, ideal for meditation and relaxation.",
            specs: ["Material: Resin with stone finish", "Size: 12x8x15 inches", "Pump: Ultra-quiet included"],
            category: "Fountains",
            image: "ganesha_fountains_1773927973157.png"
        },
        "calligraphy-metal-art": {
            name: "Calligraphy Metal Art",
            price: "$150.00",
            description: "Modern artistic expression. Transform blank walls into compelling focal points. This handmade calligraphy piece features intricate detailing.",
            specs: ["Material: Wrought Iron", "Size: 36x24 inches", "Finish: Matte Black/Gold"],
            category: "Wall Art",
            image: "calligraphy_metal_art_1773927695140.png"
        },
        "gallery-1": {
            name: "Modern Vase Setup",
            price: "$45.00",
            description: "A beautiful modern vase setup for contemporary minimalist homes.",
            specs: ["Material: Ceramic", "Color: Neutral"],
            category: "Accessories",
            image: "image3.jpg"
        },
        "gallery-2": {
            name: "Luxury Living Room Decor",
            price: "$300.00",
            description: "Premium curated items for an upscale living space.",
            specs: ["Various materials"],
            category: "Furniture Set",
            image: "image4.jpg"
        },
        "gallery-3": {
            name: "Storefront Highlight",
            price: "$250.00",
            description: "An exclusive item highlighted in our storefront.",
            specs: ["Premium Build"],
            category: "Featured",
            image: "storefront_1773927592315.png"
        },
        "gallery-4": {
            name: "Abstract Table Decor",
            price: "$75.00",
            description: "Eye-catching abstract pieces for your center table.",
            specs: ["Material: Resin and Metal"],
            category: "Accessories",
            image: "image6.jpg"
        },
        "gallery-5": {
            name: "Earthy Tones Decor",
            price: "$90.00",
            description: "Bring the outside in with earthy tones and natural textures.",
            specs: ["Material: Terracotta"],
            category: "Accessories",
            image: "image7.jpg"
        },
        "gallery-6": {
            name: "Cozy Corner Lighting",
            price: "$110.00",
            description: "Warm, cozy lighting options for the perfect reading nook.",
            specs: ["Bulb Type: Warm LED", "Material: Brass"],
            category: "Lighting",
            image: "image8.jpg"
        },
        "gallery-7": {
            name: "Minimalist Wall Shelves",
            price: "$130.00",
            description: "Sleek and minimalist, perfect for displaying your favorite items.",
            specs: ["Material: Engineered Wood"],
            category: "Furniture",
            image: "image9.jpg"
        },
        "gallery-8": {
            name: "Premium Dining Setup",
            price: "$450.00",
            description: "Complete dining setup with luxurious plates and centerpieces.",
            specs: ["Includes 12 pieces"],
            category: "Dining",
            image: "image5.jpg"
        }
    };

    const productMappings = {
        'golden_wall_clocks_1773927637156.png': 'golden-wall-clocks',
        'ganesha_fountains_1773927973157.png': 'ganesha-fountains',
        'calligraphy_metal_art_1773927695140.png': 'calligraphy-metal-art',
        'image3.jpg': 'gallery-1',
        'image4.jpg': 'gallery-2',
        'storefront_1773927592315.png': 'gallery-3',
        'image6.jpg': 'gallery-4',
        'image7.jpg': 'gallery-5',
        'image8.jpg': 'gallery-6',
        'image9.jpg': 'gallery-7',
        'image5.jpg': 'gallery-8'
    };

    // Attach click listener dynamically to links in index.html without modifying its DOM structure directly
    document.querySelectorAll('.card-img-wrapper, .gallery-item').forEach(el => {
        const img = el.querySelector('img');
        if (img) {
            const src = img.getAttribute('src');
            const id = productMappings[src];
            if (id) {
                el.style.cursor = 'pointer';
                el.addEventListener('click', () => {
                    window.location.href = `?id=${id}`;
                });
            }
        }
    });

    // Populate Product Details Page dynamically via SPA approach
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        const product = productsDb[productId];

        // Hide main page sections
        ['hero', 'about', 'featured', 'gallery', 'contact'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        // Create the product details container
        const detailsSection = document.createElement('section');
        detailsSection.className = 'section product-details';
        detailsSection.id = 'product-details-section';

        if (product) {
            let specsHtml = '';
            if (product.specs && product.specs.length > 0) {
                const lis = product.specs.map(s => `<li>${s}</li>`).join('');
                specsHtml = `
                    <div class="pd-specs-container">
                        <h4>Specifications</h4>
                        <ul class="pd-specs-list">
                            ${lis}
                        </ul>
                    </div>
                `;
            }

            detailsSection.innerHTML = `
                <div class="glass-panel product-details-container fade-in-up appear">
                    <div class="pd-image-wrapper">
                        <img src="${product.image}" alt="${product.name}" id="pd-image">
                    </div>
                    <div class="pd-info">
                        <div class="pd-category" id="pd-category">${product.category}</div>
                        <h1 class="pd-title" id="pd-name">${product.name}</h1>
                        <div class="pd-price" id="pd-price">${product.price}</div>
                        <p class="pd-description" id="pd-description">${product.description}</p>
                        ${specsHtml}
                        <a href="${window.location.pathname}" class="pd-back-btn">← Back to Collection</a>
                    </div>
                </div>
            `;

            // Related products
            const relatedSection = document.createElement('section');
            relatedSection.className = 'section related-products';
            relatedSection.innerHTML = `
                <div class="section-header fade-in-up appear">
                    <h2>Related Products</h2>
                    <div class="gold-divider center"></div>
                </div>
                <div class="featured-grid" id="pd-related"></div>
            `;

            // Insert before footer
            const footer = document.querySelector('footer');
            if (footer) {
                footer.parentNode.insertBefore(detailsSection, footer);
                footer.parentNode.insertBefore(relatedSection, footer);
            } else {
                document.body.appendChild(detailsSection);
                document.body.appendChild(relatedSection);
            }

            const relatedContainer = document.getElementById('pd-related');
            if (relatedContainer) {
                let relatedKeys = Object.keys(productsDb).filter(key => key !== productId && productsDb[key].category === product.category);
                if (relatedKeys.length < 3) {
                    const fallbackKeys = Object.keys(productsDb).filter(key => key !== productId && !relatedKeys.includes(key));
                    relatedKeys = relatedKeys.concat(fallbackKeys).slice(0, 3);
                } else {
                    relatedKeys = relatedKeys.slice(0, 3);
                }

                relatedKeys.forEach(key => {
                    const relProd = productsDb[key];
                    const card = document.createElement('div');
                    card.className = 'featured-card glass-panel fade-in-up appear';
                    card.style.cursor = 'pointer';
                    card.onclick = () => window.location.href = `?id=${key}`;
                    card.innerHTML = `
                        <div class="card-img-wrapper">
                            <img src="${relProd.image}" alt="${relProd.name}">
                            <div class="card-overlay">
                                <span class="view-text">View Details</span>
                            </div>
                        </div>
                        <div class="card-content">
                            <h3>${relProd.name}</h3>
                            <p>${relProd.price}</p>
                        </div>
                    `;
                    relatedContainer.appendChild(card);
                });
            }

            // Also make sure page is at top
            window.scrollTo(0, 0);

            // Change nav links to go to home anchors effectively turning off SPA mode
            document.querySelectorAll('.nav-links a').forEach(link => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    link.setAttribute('href', window.location.pathname + href);
                }
            });

        } else {
            detailsSection.innerHTML = `
                <div class="glass-panel product-details-container fade-in-up appear">
                    <h2>Product not found.</h2>
                    <a href="${window.location.pathname}" class="pd-back-btn">← Back to Home</a>
                </div>
            `;
            const footer = document.querySelector('footer');
            if (footer) {
                footer.parentNode.insertBefore(detailsSection, footer);
            } else {
                document.body.appendChild(detailsSection);
            }
        }
    }
});
