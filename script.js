// Portfolio JavaScript - Sistema Interactivo de Jhylmar Subia
class PortfolioSystem {
    constructor() {
        this.isLoaded = false;
        this.currentSection = 'home';
        this.plcInputs = {};
        this.plcOutputs = {};
        this.visionSettings = {
            threshold: 85,
            objectCount: 2,
            fps: 30
        };
        
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupParticles();
        this.setupTypewriter();
        this.setupAnimations();
        this.setupPLCSimulator();
        this.setupVisionDemo();
        this.setupNetworkMonitor();
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

    // Skill Animations
    setupSkillAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBars();
                }
            });
        });

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = `${width}%`;
            }, index * 200);
        });
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

    // PLC Simulator
    setupPLCSimulator() {
        const inputs = document.querySelectorAll('.plc-input');
        const outputs = document.querySelectorAll('.plc-output');

        inputs.forEach(input => {
            const inputId = input.getAttribute('data-input');
            this.plcInputs[inputId] = false;

            input.addEventListener('click', () => {
                this.plcInputs[inputId] = !this.plcInputs[inputId];
                input.classList.toggle('active', this.plcInputs[inputId]);
                this.updatePLCLogic();
            });
        });

        outputs.forEach(output => {
            const outputId = output.getAttribute('data-output');
            this.plcOutputs[outputId] = false;
        });

        // Initialize contacts and coils
        this.setupLadderDiagram();
    }

    setupLadderDiagram() {
        const contacts = document.querySelectorAll('.contact');
        const coils = document.querySelectorAll('.coil');

        contacts.forEach(contact => {
            const inputId = contact.getAttribute('data-input');
            contact.addEventListener('click', () => {
                // Visual feedback for contact activation
                if (this.plcInputs[inputId]) {
                    contact.classList.add('active');
                } else {
                    contact.classList.remove('active');
                }
            });
        });
    }

    updatePLCLogic() {
        // Logic for Q0.0: I0.0 AND I0.1
        this.plcOutputs['Q0.0'] = this.plcInputs['I0.0'] && this.plcInputs['I0.1'];
        
        // Logic for Q0.1: NOT I0.2
        this.plcOutputs['Q0.1'] = !this.plcInputs['I0.2'];

        // Update visual indicators
        Object.keys(this.plcOutputs).forEach(outputId => {
            const output = document.querySelector(`[data-output="${outputId}"]`);
            const contact = document.querySelector(`.contact[data-input="${outputId.replace('Q', 'I')}"]`);
            const coil = document.querySelector(`.coil[data-output="${outputId}"]`);
            
            if (output) {
                output.classList.toggle('active', this.plcOutputs[outputId]);
            }
            
            if (coil) {
                coil.classList.toggle('active', this.plcOutputs[outputId]);
            }
        });

        // Update contacts based on inputs
        Object.keys(this.plcInputs).forEach(inputId => {
            const contact = document.querySelector(`.contact[data-input="${inputId}"]`);
            if (contact) {
                if (contact.classList.contains('normally-open')) {
                    contact.classList.toggle('active', this.plcInputs[inputId]);
                } else if (contact.classList.contains('normally-closed')) {
                    contact.classList.toggle('active', !this.plcInputs[inputId]);
                }
            }
        });

        // Add some visual feedback with sound (optional)
        this.playSystemSound('plc_update');
    }

    // Vision Demo
    setupVisionDemo() {
        const thresholdSlider = document.getElementById('threshold');
        const thresholdValue = document.getElementById('threshold-value');
        const objectCount = document.getElementById('object-count');
        const fpsCounter = document.getElementById('fps-counter');

        if (thresholdSlider) {
            thresholdSlider.addEventListener('input', (e) => {
                this.visionSettings.threshold = e.target.value;
                thresholdValue.textContent = `${e.target.value}%`;
                this.updateVisionDemo();
            });
        }

        // Simulate real-time detection
        this.startVisionSimulation();
    }

    startVisionSimulation() {
        const detectionBoxes = document.querySelectorAll('.detection-box');
        const objectCount = document.getElementById('object-count');
        const fpsCounter = document.getElementById('fps-counter');

        setInterval(() => {
            // Simulate FPS fluctuation
            this.visionSettings.fps = 28 + Math.random() * 4;
            if (fpsCounter) {
                fpsCounter.textContent = Math.round(this.visionSettings.fps);
            }

            // Simulate object count changes
            const newCount = Math.random() > 0.3 ? 2 : Math.random() > 0.5 ? 1 : 3;
            this.visionSettings.objectCount = newCount;
            if (objectCount) {
                objectCount.textContent = newCount;
            }

            // Update detection boxes
            detectionBoxes.forEach((box, index) => {
                if (index < newCount) {
                    box.style.display = 'block';
                    // Simulate slight movement
                    const currentTop = parseFloat(box.style.top) || 30;
                    const currentLeft = parseFloat(box.style.left) || 20;
                    box.style.top = `${currentTop + (Math.random() - 0.5) * 5}%`;
                    box.style.left = `${currentLeft + (Math.random() - 0.5) * 5}%`;
                } else {
                    box.style.display = 'none';
                }
            });
        }, 1000);
    }

    updateVisionDemo() {
        // Update detection confidence based on threshold
        const labels = document.querySelectorAll('.detection-label');
        labels.forEach(label => {
            const confidence = Math.max(60, Math.min(95, this.visionSettings.threshold + Math.random() * 10));
            const objectType = label.textContent.split(' (')[0];
            label.textContent = `${objectType} (${Math.round(confidence)}%)`;
        });
    }

    // Network Monitor
    setupNetworkMonitor() {
        const nodes = document.querySelectorAll('.network-node');
        const connections = document.querySelectorAll('.connection-line');
        const dataPackets = document.querySelectorAll('.data-packet');

        // Simulate network activity
        setInterval(() => {
            // Random node status changes
            nodes.forEach(node => {
                const status = node.querySelector('.node-status');
                if (Math.random() > 0.9) {
                    status.classList.toggle('warning');
                    setTimeout(() => {
                        status.classList.remove('warning');
                    }, 2000);
                }
            });

            // Connection status simulation
            connections.forEach(connection => {
                if (Math.random() > 0.8) {
                    connection.classList.add('active');
                    setTimeout(() => {
                        connection.classList.remove('active');
                    }, 1500);
                }
            });

            // Data packet simulation
            this.simulateDataPackets();
        }, 3000);
    }

    simulateDataPackets() {
        const packets = [
            "Modbus RTU: 01 03 00 00 00 01 84 0A",
            "Response: 01 03 02 12 34 B8 FA",
            "Profinet: DCP Hello Request",
            "EtherCAT: LRW 0x1000 0x0004",
            "Modbus TCP: FC03 Read Holding Registers"
        ];

        const dataStream = document.querySelector('.data-stream');
        if (dataStream) {
            const randomPacket = packets[Math.floor(Math.random() * packets.length)];
            const packetElement = document.createElement('div');
            packetElement.className = 'data-packet';
            packetElement.textContent = randomPacket;
            
            dataStream.appendChild(packetElement);
            
            // Remove old packets
            if (dataStream.children.length > 10) {
                dataStream.removeChild(dataStream.firstChild);
            }
        }
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
        document.querySelectorAll('.timeline-item, .project-card, .skill-category, .expertise-item, .lab-demo').forEach(el => {
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
