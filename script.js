// Portfolio JavaScript - Sistema Interactivo de Jhylmar Subia
class PortfolioSystem {
    constructor() {
        this.isLoaded = false;
        this.currentSection = 'home';
        this.experienceData = null;
        this.currentExperienceIndex = 0;
        
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupParticles();
        this.setupTypewriter();
        this.setupSkillAnimations();
        this.setupContactForm();
        this.setupScrollEffects();
        this.initializeSystemStatus();
        
        // Initialize experience system when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('🚀 DOM loaded, initializing experience system...');
                this.initializeExperienceSystem();
            });
        } else {
            // DOM is already ready
            console.log('🚀 DOM already ready, initializing experience system immediately...');
            this.initializeExperienceSystem();
        }
    }



    // Loading Screen
    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressFill = document.querySelector('.progress-fill');
        
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    this.isLoaded = true;
                    this.startSystemAnimations();
                }, 500);
            }
            progressFill.style.width = `${progress}%`;
        }, 150);

        // Simulate system initialization messages
        const messages = [
            "Inicializando sistemas de automatización...",
            "Cargando módulos de visión artificial...",
            "Conectando protocolos industriales...",
            "Activando interfaces de control...",
            "Sistema listo para operación."
        ];
        
        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            if (messageIndex < messages.length) {
                document.querySelector('.loader-text').textContent = messages[messageIndex];
                messageIndex++;
            } else {
                clearInterval(messageInterval);
            }
        }, 600);
    }

    // Navigation System
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                this.navigateToSection(targetSection);
            });
        });

        // Update navigation based on scroll
        window.addEventListener('scroll', () => {
            if (!this.isLoaded) return;
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            if (current && current !== this.currentSection) {
                this.updateActiveNavLink(current);
            }
        });
    }

    navigateToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        const navOffset = 0;
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - navOffset,
                behavior: 'smooth'
            });
            
            this.updateActiveNavLink(sectionId);
        }
    }

    updateActiveNavLink(sectionId) {
        this.currentSection = sectionId;
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Animate section into view
        const section = document.getElementById(sectionId);
        if (section && !section.classList.contains('active')) {
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            section.classList.add('active');
        }
    }

    // Particles.js Setup
    setupParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: ['#00a8ff', '#64ffda', '#ff6b35']
                    },
                    shape: {
                        type: ['circle', 'triangle'],
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00a8ff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }
    }

    // Typewriter Effect
    setupTypewriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement || typewriterElement.dataset.typed === 'true') return;

        const text = typewriterElement.getAttribute('data-text');
        const cursor = document.querySelector('.cursor');
        
        // Mark as being processed to prevent multiple executions
        typewriterElement.dataset.typed = 'true';
        
        let i = 0;
        typewriterElement.textContent = ''; // Limpiar cualquier contenido previo
        
        const typeWriter = () => {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            } else {
                // Add blinking cursor animation
                if (cursor) {
                    cursor.style.animation = 'blink 1s infinite';
                }
            }
        };

        // Start typing after loading screen
        setTimeout(typeWriter, 3500);
    }

    // System Animations
    startSystemAnimations() {
        // Animate system status bars
        const statusFills = document.querySelectorAll('.status-fill');
        statusFills.forEach(fill => {
            const value = fill.getAttribute('data-value');
            setTimeout(() => {
                fill.style.width = `${value}%`;
            }, Math.random() * 1000);
        });

        // Animate skill progress bars
        this.animateSkillBars();

        // Start neural network animation
        this.startNeuralNetworkAnimation();

        // Initialize IoT network animation (commented out - elements don't exist)
        // this.startIoTAnimation();
    }

    // Enhanced Skills & Experience System
    setupSkillAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.id === 'skills') {
                        this.animateSkillBars();
                    } else if (entry.target.id === 'experience') {
                        this.initializeExperienceSystem();
                    }
                }
            });
        }, { threshold: 0.3 });

        const skillsSection = document.getElementById('skills');
        const experienceSection = document.getElementById('experience');
        
        if (skillsSection) observer.observe(skillsSection);
        if (experienceSection) observer.observe(experienceSection);
    }

    animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            const progressBar = item.querySelector('.skill-progress');
            const level = item.getAttribute('data-level');
            
            setTimeout(() => {
                if (progressBar) {
                    progressBar.style.width = `${level}%`;
                }
                
                // Add hover interactions
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'translateX(8px) scale(1.02)';
                });
                
                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'translateX(0) scale(1)';
                });
            }, index * 100);
        });
    }

    async initializeExperienceSystem() {
        console.log('� LOADING EXPERIENCE DATA FROM JSON...');
        if (this.experienceSystemInitialized) {
            console.log('⚠️ System already initialized');
            return;
        }
        this.experienceSystemInitialized = true;

        try {
            // Cargar datos desde el archivo JSON
            const response = await fetch('./experience-data.json');
            console.log('📥 JSON Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const jsonData = await response.json();
            console.log('✅ JSON Data loaded successfully:', jsonData);
            
            // Si el JSON es un array directo, lo envolvemos en un objeto experiences
            if (Array.isArray(jsonData)) {
                this.experienceData = { experiences: jsonData };
            } else {
                // Si ya tiene la estructura esperada
                this.experienceData = jsonData;
            }
            
            console.log('🔄 Experience data set:', this.experienceData.experiences?.length, 'experiences loaded');
            
        } catch (error) {
            console.error('❌ Error loading JSON:', error);
            alert('Error al cargar los datos de experiencia desde JSON. Verifica que el archivo experience-data.json existe y tiene el formato correcto.');
            return;
        }

        console.log('✅ Data loaded:', this.experienceData);

        this.setupExperienceInteractions();
        
        // Give DOM time to render, then initialize
        setTimeout(() => {
            console.log('🔄 Initializing after timeout...');
            this.selectExperience(0);
            this.initializeInfoPanel();
        }, 500); // Increased timeout
    }

    setupExperienceInteractions() {
        console.log('🔧 Setting up experience interactions...');
        const prevBtn = document.getElementById('prevExperience');
        const nextBtn = document.getElementById('nextExperience');

        console.log('🎯 Found elements:', { prevBtn, nextBtn });

        // Navigation arrows with futuristic effects
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                console.log('⬅️ Previous button clicked');
                e.preventDefault();
                this.navigateExperience(-1);
                this.triggerNavigationEffect(prevBtn);
            });
        } else {
            console.error('❌ Previous button not found!');
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                console.log('➡️ Next button clicked');
                e.preventDefault();
                this.navigateExperience(1);
                this.triggerNavigationEffect(nextBtn);
            });
        } else {
            console.error('❌ Next button not found!');
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                console.log('⌨️ Left arrow key pressed');
                this.navigateExperience(-1);
            } else if (e.key === 'ArrowRight') {
                console.log('⌨️ Right arrow key pressed');
                this.navigateExperience(1);
            }
        });
    }

    triggerNavigationEffect(button) {
        // Add visual feedback for navigation
        button.style.transform = button.classList.contains('nav-left') 
            ? 'translateY(-50%) scale(0.9) translateX(-5px)' 
            : 'translateY(-50%) scale(0.9) translateX(5px)';
        
        setTimeout(() => {
            button.style.transform = button.classList.contains('nav-left')
                ? 'translateY(-50%) scale(1.1)'
                : 'translateY(-50%) scale(1.1)';
        }, 150);
        
        setTimeout(() => {
            button.style.transform = '';
        }, 300);
    }

    initializeInfoPanel() {
        console.log('📱 Initializing info panel...');
        const activitiesBtn = document.getElementById('activitiesBtn');
        const technologiesBtn = document.getElementById('technologiesBtn');
        const achievementsBtn = document.getElementById('achievementsBtn');

        console.log('🎮 Panel buttons found:', { activitiesBtn, technologiesBtn, achievementsBtn });

        // Set default active panel
        console.log('🏆 Setting default panel to achievements...');
        this.showPanelContent('achievements');

        // Panel button interactions
        [activitiesBtn, technologiesBtn, achievementsBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('🎯 Panel button clicked:', btn.id);
                    
                    // Remove active class from all buttons
                    document.querySelectorAll('.control-button').forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    btn.classList.add('active');
                    
                    // Show corresponding content
                    const panelType = btn.id.replace('Btn', '');
                    console.log('📋 Showing panel type:', panelType);
                    this.showPanelContent(panelType);
                    
                    // Add click effect
                    this.triggerPanelEffect(btn);
                });
            } else {
                console.error('❌ Button not found for panel interaction');
            }
        });
    }

    triggerPanelEffect(button) {
        button.style.transform = 'translateY(-2px) scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'translateY(-2px) scale(1.05)';
        }, 100);
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }

    selectExperience(index) {
        if (!this.experienceData || !this.experienceData.experiences || index < 0 || index >= this.experienceData.experiences.length) {
            console.warn('Invalid experience data or index');
            return;
        }

        this.currentExperienceIndex = index;
        const experience = this.experienceData.experiences[index];
        
        if (!experience) {
            console.error(`No experience found at index ${index}`);
            return;
        }

        // Update center console with sweep effect
        this.updateCenterConsole(experience);
        
        // Update info panel content based on currently active panel
        const activeButton = document.querySelector('.control-button.active');
        if (activeButton) {
            const panelType = activeButton.id.replace('Btn', '');
            this.showPanelContent(panelType);
        }
    }

    navigateExperience(direction) {
        if (!this.experienceData || !this.experienceData.experiences) {
            console.warn('No experience data available');
            return;
        }

        let newIndex = this.currentExperienceIndex + direction;
        const total = this.experienceData.experiences.length;
        
        if (newIndex < 0) {
            newIndex = total - 1;
        } else if (newIndex >= total) {
            newIndex = 0;
        }
        
        // Add sweep transition effect
        this.triggerHorizontalSweep(direction > 0 ? 'left' : 'right');
        
        setTimeout(() => {
            this.selectExperience(newIndex);
        }, 300);
    }

    updateCenterConsole(experience) {
        const titleElement = document.getElementById('currentTitle');
        const companyElement = document.getElementById('currentCompany');
        const statusElement = document.getElementById('currentStatus');
        const console = document.querySelector('.center-console');
        const semicircleBase = document.querySelector('.semicircle-base');

        // Apply dynamic color from experience data
        if (experience.color) {
            if (console) {
                console.style.setProperty('--experience-color', experience.color);
                console.style.borderColor = experience.color + '40'; // 25% opacity
            }
            
            if (semicircleBase) {
                // Update the semicircle gradient colors
                semicircleBase.style.background = `linear-gradient(180deg,
                    ${experience.color}10 0%,
                    ${experience.color}05 30%,
                    rgba(30, 39, 46, 0.8) 70%,
                    var(--dark-bg) 100%)`;
                
                // Update the border gradient
                const beforeElement = semicircleBase;
                beforeElement.style.setProperty('--dynamic-color', experience.color);
            }
            
            // Update status indicator color
            const statusIndicator = document.querySelector('.status-indicator');
            if (statusIndicator) {
                statusIndicator.style.backgroundColor = experience.color;
                statusIndicator.style.boxShadow = `0 0 15px ${experience.color}`;
            }
        }

        // Fade out effect
        [titleElement, companyElement, statusElement].forEach(el => {
            if (el) el.style.opacity = '0';
        });

        setTimeout(() => {
            if (titleElement) {
                titleElement.textContent = experience.title;
                titleElement.style.opacity = '1';
                if (experience.color) {
                    titleElement.style.textShadow = `0 0 10px ${experience.color}30`;
                }
            }
            if (companyElement) {
                companyElement.textContent = experience.company;
                companyElement.style.opacity = '1';
            }
            if (statusElement) {
                statusElement.textContent = experience.status === 'Actual' ? 'POSICIÓN ACTUAL' : 'EXPERIENCIA PREVIA';
                statusElement.style.opacity = '1';
                if (experience.color) {
                    statusElement.style.textShadow = `0 0 8px ${experience.color}30`;
                }
            }
        }, 300);
    }

    showPanelContent(type) {
        console.log('📺 Showing panel content for type:', type);
        console.log('💾 Experience data available:', !!this.experienceData);
        console.log('📊 Current index:', this.currentExperienceIndex);
        
        if (!this.experienceData || !this.experienceData.experiences[this.currentExperienceIndex]) {
            console.error('❌ No experience data available');
            return;
        }
        
        const experience = this.experienceData.experiences[this.currentExperienceIndex];
        console.log('🎯 Current experience:', experience.title);
        
        const contentDisplay = document.getElementById('contentDisplay');
        console.log('🖥️ Content display element found:', !!contentDisplay);
        
        if (!contentDisplay) {
            console.error('❌ Content display element not found');
            return;
        }

        // Fade out current content
        contentDisplay.style.opacity = '0';
        
        setTimeout(() => {
            let content = '';
            
            switch(type) {
                case 'activities':
                    content = this.generateActivitiesContent(experience.activities);
                    console.log('📋 Generated activities content');
                    break;
                case 'technologies':
                    content = this.generateTechnologiesContent(experience.technologies);
                    console.log('⚙️ Generated technologies content');
                    break;
                case 'achievements':
                    content = this.generateAchievementsContent(experience.achievements);
                    console.log('🏆 Generated achievements content');
                    break;
                default:
                    content = '<p>Contenido no disponible</p>';
                    console.log('⚠️ No content type matched');
            }
            
            console.log('📝 Setting content:', content.substring(0, 100) + '...');
            contentDisplay.innerHTML = content;
            contentDisplay.style.opacity = '1';
        }, 200);
    }

    generateActivitiesContent(activities) {
        if (!activities || !Array.isArray(activities) || activities.length === 0) {
            return '<p>No hay actividades registradas para esta experiencia.</p>';
        }
        
        const activitiesList = activities.map(activity => 
            `<li>${activity}</li>`
        ).join('');
        
        return `<ul>${activitiesList}</ul>`;
    }

    generateTechnologiesContent(technologies) {
        if (!technologies || !Array.isArray(technologies) || technologies.length === 0) {
            return '<p>No hay tecnologías registradas para esta experiencia.</p>';
        }
        
        const techTags = technologies.map(tech => 
            `<div class="tech-tag-modern">${tech}</div>`
        ).join('');
        
        return `<div class="tech-tags-grid">${techTags}</div>`;
    }

    generateAchievementsContent(achievements) {
        if (!achievements || !Array.isArray(achievements) || achievements.length === 0) {
            return '<p>No hay logros registrados para esta experiencia.</p>';
        }

        const achievementIcons = ['🎯', '📈', '⚡', '🏆', '💡', '🚀', '💪', '🌟'];
        
        const achievementItems = achievements.map((achievement, index) => 
            `<div class="achievement-item-modern">
                <div class="achievement-icon-modern">${achievementIcons[index % achievementIcons.length]}</div>
                <div class="achievement-text-modern">${achievement}</div>
            </div>`
        ).join('');
        
        return achievementItems;
    }

    triggerHorizontalSweep(direction) {
        // Create sweep overlay
        const sweepOverlay = document.createElement('div');
        sweepOverlay.style.cssText = `
            position: fixed;
            top: 0;
            ${direction === 'left' ? 'left: -100vw' : 'right: -100vw'};
            width: 100vw;
            height: 100vh;
            background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(0, 168, 255, 0.1) 30%, 
                rgba(0, 168, 255, 0.3) 50%, 
                rgba(0, 168, 255, 0.1) 70%, 
                transparent 100%);
            z-index: 1000;
            pointer-events: none;
        `;
        
        document.body.appendChild(sweepOverlay);
        
        // Animate sweep
        requestAnimationFrame(() => {
            sweepOverlay.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
            sweepOverlay.style[direction] = '100vw';
        });
        
        // Remove overlay after animation
        setTimeout(() => {
            document.body.removeChild(sweepOverlay);
        }, 600);
    }

    // Neural Network Animation
    startNeuralNetworkAnimation() {
        const neurons = document.querySelectorAll('.neural-node');
        const connections = document.querySelector('.connections-svg');
        
        if (!connections) return;

        // Draw connections between neurons
        let connectionsHTML = '';
        for (let i = 0; i < neurons.length - 1; i++) {
            connectionsHTML += `<line x1="50" y1="${50 + i * 60}" x2="200" y2="${50 + (i + 1) * 60}" 
                               stroke="#00a8ff" stroke-width="2" opacity="0.5" class="neural-connection"/>`;
        }
        connections.innerHTML = connectionsHTML;

        // Animate neural signals
        setInterval(() => {
            const randomNeuron = neurons[Math.floor(Math.random() * neurons.length)];
            randomNeuron.classList.add('active');
            setTimeout(() => {
                randomNeuron.classList.remove('active');
            }, 1000);
        }, 2000);
    }

    // IoT Animation
    startIoTAnimation() {
        const iotDevices = document.querySelectorAll('.iot-device');
        const iotConnections = document.querySelectorAll('.iot-connection');

        // Only run if elements exist
        if (iotDevices.length === 0 && iotConnections.length === 0) {
            return;
        }

        setInterval(() => {
            // Animate device activity
            if (iotDevices.length > 0) {
                const randomDevice = iotDevices[Math.floor(Math.random() * iotDevices.length)];
                if (randomDevice && randomDevice.style) {
                    randomDevice.style.transform += ' scale(1.2)';
                    setTimeout(() => {
                        if (randomDevice && randomDevice.style) {
                            randomDevice.style.transform = randomDevice.style.transform.replace(' scale(1.2)', '');
                        }
                    }, 500);
                }
            }

            // Animate data transmission
            if (iotConnections.length > 0) {
                const randomConnection = iotConnections[Math.floor(Math.random() * iotConnections.length)];
                if (randomConnection && randomConnection.style) {
                    randomConnection.style.background = '#2ed573';
                    setTimeout(() => {
                        if (randomConnection && randomConnection.style) {
                            randomConnection.style.background = '#00a8ff';
                        }
                    }, 1000);
                }
            }
        }, 3000);
    }

    // Contact Form
    setupContactForm() {
        const form = document.querySelector('.message-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactForm(form);
        });

        // Add input focus effects
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentNode.classList.remove('focused');
                }
            });
        });
    }

    handleContactForm(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.submit-btn');
        
        // Simulate form processing
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'PROCESANDO...';
        
        setTimeout(() => {
            // Create mailto link (since we don't have a backend)
            const name = formData.get('name');
            const email = formData.get('email');
            const company = formData.get('company');
            const message = formData.get('message');
            
            const subject = `Contacto desde Portfolio - ${name}${company ? ` (${company})` : ''}`;
            const body = `Nombre: ${name}\nEmail: ${email}\n${company ? `Empresa: ${company}\n` : ''}\nMensaje:\n${message}`;
            
            const mailtoLink = `mailto:jhylmarsubia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(mailtoLink);
            
            // Reset form
            form.reset();
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = 'MENSAJE ENVIADO ✓';
            
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = 'ENVIAR TRANSMISIÓN';
            }, 3000);
            
            this.playSystemSound('message_sent');
        }, 2000);
    }

    // Scroll Effects
    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations for different elements
                    if (entry.target.classList.contains('timeline-item')) {
                        this.animateTimelineItem(entry.target);
                    } else if (entry.target.classList.contains('project-card')) {
                        this.animateProjectCard(entry.target);
                    } else if (entry.target.classList.contains('skill-category')) {
                        this.animateSkillCategory(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.timeline-item, .project-card, .skill-category, .expertise-item, .skill-terminal-item, .ai-skill-item, .tech-node').forEach(el => {
            observer.observe(el);
        });
    }

    animateTimelineItem(item) {
        const marker = item.querySelector('.timeline-marker');
        if (marker) {
            marker.style.animation = 'pulse 2s infinite';
        }
    }

    animateProjectCard(card) {
        card.style.animation = 'slideInUp 0.6s ease-out';
    }

    animateSkillCategory(category) {
        const skillBars = category.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = `${width}%`;
            }, index * 200);
        });
    }

    // System Status
    initializeSystemStatus() {
        setInterval(() => {
            this.updateSystemStatus();
        }, 5000);
    }

    updateSystemStatus() {
        const cpuFill = document.querySelector('.status-fill[data-value]');
        const ramFills = document.querySelectorAll('.status-fill');
        
        if (cpuFill) {
            const currentCpu = parseInt(cpuFill.getAttribute('data-value'));
            const newCpu = Math.max(60, Math.min(95, currentCpu + (Math.random() - 0.5) * 10));
            cpuFill.setAttribute('data-value', Math.round(newCpu));
            cpuFill.style.width = `${newCpu}%`;
        }

        if (ramFills.length > 1) {
            const ramFill = ramFills[1];
            const currentRam = parseInt(ramFill.getAttribute('data-value'));
            const newRam = Math.max(40, Math.min(80, currentRam + (Math.random() - 0.5) * 8));
            ramFill.setAttribute('data-value', Math.round(newRam));
            ramFill.style.width = `${newRam}%`;
        }
    }

    // Sound Effects (Optional - requires audio files)
    playSystemSound(soundType) {
        // You can add actual audio files here
        const sounds = {
            'plc_update': 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYdBHvv9YcwBCWa4/DFZB4I0brf'+
                              'wNUhBT7U4v1RI0EMQM3y3pgvBSel1PD2mQsTO6zb4rFvbB8Oj1vh+4s9BT7z8c9FbCCk9QsTO67Q5q17aQwPiRrk4HA6BlYqgcz0Hk1dAkHC7uJzVhFU',
            'message_sent': '',
            'section_change': ''
        };

        // Simple beep using Web Audio API
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(soundType === 'plc_update' ? 800 : 400, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    }

    // Mobile Navigation Toggle
    setupMobileNav() {
        // Add hamburger menu for mobile
        const nav = document.querySelector('.nav-panel');
        const hamburger = document.createElement('div');
        hamburger.className = 'mobile-nav-toggle';
        hamburger.innerHTML = '☰';
        document.body.appendChild(hamburger);

        hamburger.addEventListener('click', () => {
            nav.classList.toggle('open');
        });

        // Close nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
                nav.classList.remove('open');
            }
        });
    }

    // Radar Chart for Skills
    drawRadarChart() {
        const canvas = document.getElementById('automationRadar');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 100;

        const skills = [
            { name: 'PLC Siemens', value: 0.9 },
            { name: 'PLC Schneider', value: 0.85 },
            { name: 'SCADA/HMI', value: 0.88 },
            { name: 'Modbus', value: 0.82 },
            { name: 'Profinet', value: 0.75 }
        ];

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw radar grid
        ctx.strokeStyle = '#233554';
        ctx.lineWidth = 1;

        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius / 5) * i, 0, 2 * Math.PI);
            ctx.stroke();
        }

        // Draw axis lines
        const angleStep = (2 * Math.PI) / skills.length;
        for (let i = 0; i < skills.length; i++) {
            const angle = i * angleStep - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + Math.cos(angle) * radius,
                centerY + Math.sin(angle) * radius
            );
            ctx.stroke();
        }

        // Draw skill values
        ctx.strokeStyle = '#00a8ff';
        ctx.fillStyle = 'rgba(0, 168, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let i = 0; i < skills.length; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const value = skills[i].value;
            const x = centerX + Math.cos(angle) * radius * value;
            const y = centerY + Math.sin(angle) * radius * value;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw skill points
        ctx.fillStyle = '#64ffda';
        for (let i = 0; i < skills.length; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const value = skills[i].value;
            const x = centerX + Math.cos(angle) * radius * value;
            const y = centerY + Math.sin(angle) * radius * value;

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

// Initialize the portfolio system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new PortfolioSystem();
    
    // Make it globally accessible for debugging
    window.portfolioSystem = portfolio;
    
    // Setup mobile navigation if on mobile device
    if (window.innerWidth <= 1200) {
        portfolio.setupMobileNav();
    }

    // Setup radar chart after a delay to ensure canvas is ready
    setTimeout(() => {
        portfolio.drawRadarChart();
    }, 1000);
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.portfolioSystem) {
        // Redraw charts on resize
        setTimeout(() => {
            window.portfolioSystem.drawRadarChart();
        }, 100);
    }
});

// Add some CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    .mobile-nav-toggle {
        display: none;
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1001;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 10px;
        color: var(--text-accent);
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: var(--shadow-panel);
    }
    
    @media (max-width: 1200px) {
        .mobile-nav-toggle {
            display: block;
        }
    }
`;
document.head.appendChild(style);

// Inicializar el sistema cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Portfolio System...');
    new PortfolioSystem();
});

// También inicializar si el DOM ya está cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PortfolioSystem());
} else {
    new PortfolioSystem();
}
