// Portfolio JavaScript - Sistema Interactivo de Jhylmar Subia
class PortfolioSystem {
    constructor() {
        this.isLoaded = false;
        this.currentSection = 'home';
        
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupParticles();
        this.setupTypewriter();
        this.setupAnimations();
        this.setupSkillAnimations();
        this.setupContactForm();
        this.setupScrollEffects();
        this.initializeSystemStatus();
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
        if (!typewriterElement) return;

        const text = typewriterElement.getAttribute('data-text');
        const cursor = document.querySelector('.cursor');
        
        let i = 0;
        typewriterElement.textContent = '';
        
        const typeWriter = () => {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Add blinking cursor animation
                if (cursor) {
                    cursor.style.animation = 'blink 1s infinite';
                }
            }
        };

        // Start typing after a delay
        setTimeout(typeWriter, 2000);
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

        // Initialize IoT network animation
        this.startIoTAnimation();
    }

    // Enhanced Interactive Skills Animations
    setupSkillAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.initializeInteractiveSkills();
                }
            });
        }, { threshold: 0.3 });

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    initializeInteractiveSkills() {
        this.setupProgrammingTerminal();
        this.setupAutomationPanel();
        this.setupAINeuralNetwork();
        this.setupWebIoTEcosystem();
    }

    setupProgrammingTerminal() {
        const terminalItems = document.querySelectorAll('.skill-terminal-item');
        
        // Animate meter bars
        terminalItems.forEach((item, index) => {
            const level = item.getAttribute('data-level');
            const meterBar = item.querySelector('.meter-bar');
            
            setTimeout(() => {
                if (meterBar) {
                    meterBar.style.setProperty('--width', level + '%');
                    meterBar.querySelector('::after') || 
                    (meterBar.style.width = level + '%');
                }
            }, index * 300);

            // Add click interaction
            item.addEventListener('click', () => {
                this.displaySkillDetails(item.getAttribute('data-skill'));
            });

            // Add hover effect
            item.addEventListener('mouseenter', () => {
                this.typeSkillInfo(item.getAttribute('data-skill'));
            });
        });

        // Start cursor blinking
        this.startTerminalCursor();
    }

    setupAutomationPanel() {
        const controlButtons = document.querySelectorAll('.control-skill');
        const radar = document.getElementById('automationRadar');

        if (radar) {
            this.drawAutomationRadar(radar);
        }

        controlButtons.forEach((button, index) => {
            const skillButton = button.querySelector('.skill-button');
            
            setTimeout(() => {
                skillButton.classList.add('active');
                setTimeout(() => {
                    skillButton.classList.remove('active');
                }, 800);
            }, index * 500);

            skillButton.addEventListener('click', () => {
                // Remove active from all buttons
                controlButtons.forEach(btn => 
                    btn.querySelector('.skill-button').classList.remove('active'));
                
                // Add active to clicked button
                skillButton.classList.add('active');
                
                // Update radar focus
                this.updateRadarFocus(button.getAttribute('data-skill'));
            });
        });

        // Start system status animation
        this.animateSystemStatus();
    }

    setupAINeuralNetwork() {
        const neuralNodes = document.querySelectorAll('.neural-node');
        const aiSkillItems = document.querySelectorAll('.ai-skill-item');
        
        // Initialize neural network connections
        this.drawNeuralConnections();
        
        // Start neural activity
        this.startNeuralActivity();
        
        // Setup progress rings
        aiSkillItems.forEach((item, index) => {
            const circle = item.querySelector('.progress-ring-circle');
            const percent = circle.getAttribute('data-percent');
            
            setTimeout(() => {
                this.animateProgressRing(circle, percent);
            }, index * 400);

            // Add interaction
            item.addEventListener('click', () => {
                this.triggerNeuralBurst(item.getAttribute('data-skill'));
            });
        });
    }

    setupWebIoTEcosystem() {
        const techNodes = document.querySelectorAll('.tech-node');
        const connectionLines = document.querySelectorAll('.connection-line');
        
        // Position nodes dynamically
        techNodes.forEach((node, index) => {
            const angle = parseFloat(node.getAttribute('data-angle'));
            const radius = 120;
            const x = Math.cos(angle * Math.PI / 180) * radius;
            const y = Math.sin(angle * Math.PI / 180) * radius;
            
            setTimeout(() => {
                node.style.transform = `translate(${x}px, ${y}px)`;
                node.style.opacity = '1';
            }, index * 200);
        });

        // Start ecosystem animation
        this.startEcosystemAnimation();
        
        // Add node interactions
        techNodes.forEach(node => {
            node.addEventListener('click', () => {
                this.activateEcosystemNode(node);
            });
        });

        // Update network stats
        this.updateNetworkStats();
    }

    drawAutomationRadar(canvas) {
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.min(centerX, centerY) - 20;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw radar grid
        ctx.strokeStyle = '#2c5282';
        ctx.lineWidth = 1;
        
        for (let i = 1; i <= 5; i++) {
            const radius = (maxRadius / 5) * i;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.stroke();
        }

        // Draw radar lines
        const skills = ['PLC Siemens', 'PLC Schneider', 'SCADA/HMI', 'Modbus', 'Profinet'];
        const values = [95, 90, 92, 88, 85];
        
        skills.forEach((skill, index) => {
            const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
            const x = centerX + Math.cos(angle) * maxRadius;
            const y = centerY + Math.sin(angle) * maxRadius;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
        });

        // Draw skill polygon
        ctx.strokeStyle = '#2ed573';
        ctx.fillStyle = 'rgba(46, 213, 115, 0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        values.forEach((value, index) => {
            const angle = (index * 2 * Math.PI) / values.length - Math.PI / 2;
            const radius = (value / 100) * maxRadius;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw skill points
        values.forEach((value, index) => {
            const angle = (index * 2 * Math.PI) / values.length - Math.PI / 2;
            const radius = (value / 100) * maxRadius;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.fillStyle = '#00a8ff';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    drawNeuralConnections() {
        const svg = document.querySelector('.neural-connections');
        if (!svg) return;

        const layers = [
            { nodes: 4, x: 20 },
            { nodes: 5, x: 120 },
            { nodes: 3, x: 220 },
            { nodes: 2, x: 320 }
        ];

        let connections = '';
        
        // Connect each layer to the next
        for (let i = 0; i < layers.length - 1; i++) {
            const currentLayer = layers[i];
            const nextLayer = layers[i + 1];
            
            for (let j = 0; j < currentLayer.nodes; j++) {
                for (let k = 0; k < nextLayer.nodes; k++) {
                    const y1 = 40 + (j * 30);
                    const y2 = 40 + (k * 30);
                    
                    connections += `
                        <line x1="${currentLayer.x}" y1="${y1}" 
                              x2="${nextLayer.x}" y2="${y2}" 
                              stroke="#00a8ff" stroke-width="1" 
                              opacity="0.3" class="neural-connection"/>
                    `;
                }
            }
        }
        
        svg.innerHTML = connections;
    }

    startNeuralActivity() {
        const nodes = document.querySelectorAll('.neural-node');
        
        setInterval(() => {
            // Random activation pattern
            const activeNodes = Math.floor(Math.random() * 3) + 2;
            
            for (let i = 0; i < activeNodes; i++) {
                const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
                randomNode.classList.add('active');
                
                setTimeout(() => {
                    randomNode.classList.remove('active');
                }, 1500);
            }
        }, 2000);
    }

    animateProgressRing(circle, percent) {
        const circumference = 2 * Math.PI * 25; // radius = 25
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
        circle.style.stroke = '#2ed573';
        circle.style.strokeWidth = '3';
        
        setTimeout(() => {
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDashoffset = offset;
            circle.style.transition = 'stroke-dashoffset 2s ease-in-out';
        }, 100);
    }

    startEcosystemAnimation() {
        const hub = document.querySelector('.hub-core');
        const connections = document.querySelectorAll('.connection-line');
        
        // Animate hub rotation
        if (hub) {
            hub.style.animation = 'hubRotate 20s linear infinite';
        }
        
        // Animate data flow
        setInterval(() => {
            connections.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.background = 'linear-gradient(90deg, #2ed573, #00a8ff)';
                    
                    setTimeout(() => {
                        line.style.opacity = '0.6';
                        line.style.background = 'linear-gradient(90deg, #00a8ff, #2ed573)';
                    }, 1000);
                }, index * 500);
            });
        }, 4000);
    }

    updateNetworkStats() {
        const activeConnections = document.getElementById('active-connections');
        const avgPerformance = document.getElementById('avg-performance');
        
        setInterval(() => {
            if (activeConnections) {
                const connections = 3 + Math.floor(Math.random() * 3);
                activeConnections.textContent = connections;
            }
            
            if (avgPerformance) {
                const performance = 85 + Math.floor(Math.random() * 10);
                avgPerformance.textContent = performance + '%';
            }
        }, 3000);
    }

    startTerminalCursor() {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }

    triggerNeuralBurst(skillType) {
        const nodes = document.querySelectorAll('.neural-node');
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('active');
                setTimeout(() => {
                    node.classList.remove('active');
                }, 300);
            }, index * 100);
        });
    }

    activateEcosystemNode(node) {
        // Remove active from all nodes
        document.querySelectorAll('.tech-node').forEach(n => 
            n.classList.remove('active'));
        
        // Add active to clicked node
        node.classList.add('active');
        
        // Pulse effect
        const circle = node.querySelector('.node-circle');
        circle.style.transform = 'scale(1.3)';
        circle.style.boxShadow = '0 0 30px rgba(46, 213, 115, 0.5)';
        
        setTimeout(() => {
            circle.style.transform = 'scale(1)';
            circle.style.boxShadow = 'none';
        }, 500);
    }

    displaySkillDetails(skill) {
        console.log(`Displaying details for: ${skill}`);
        // Here you could add a modal or detailed view
    }

    typeSkillInfo(skill) {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.textContent = ` ${skill} analysis...`;
            setTimeout(() => {
                cursor.textContent = '|';
            }, 1500);
        }
    }

    updateRadarFocus(skill) {
        console.log(`Radar focused on: ${skill}`);
        // Update radar visualization focus
    }

    animateSystemStatus() {
        const indicator = document.querySelector('.status-indicator');
        if (indicator) {
            setInterval(() => {
                indicator.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    indicator.style.transform = 'scale(1)';
                }, 200);
            }, 2000);
        }
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

        setInterval(() => {
            // Animate device activity
            const randomDevice = iotDevices[Math.floor(Math.random() * iotDevices.length)];
            randomDevice.style.transform += ' scale(1.2)';
            setTimeout(() => {
                randomDevice.style.transform = randomDevice.style.transform.replace(' scale(1.2)', '');
            }, 500);

            // Animate data transmission
            const randomConnection = iotConnections[Math.floor(Math.random() * iotConnections.length)];
            randomConnection.style.background = '#2ed573';
            setTimeout(() => {
                randomConnection.style.background = '#00a8ff';
            }, 1000);
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
