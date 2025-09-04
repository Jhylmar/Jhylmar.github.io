/**
 * ====================================
 * ANIMACIÓN DE RED NEURONAL FEEDFORWARD
 * ====================================
 * 
 * Este script crea una animación interactiva de una red neuronal
 * con tres capas (entrada, oculta, salida) que simula la propagación
 * de información a través de la red.
 * 
 * Características:
 * - Animación progresiva nodo por nodo
 * - Efectos de glow y pulsación
 * - Conexiones animadas entre capas
 * - Indicador de progreso
 * - Responsive design
 * - Reinicio automático al hacer clic
 */

class NeuralNetworkAnimation {
    constructor(canvasId = 'neuralCanvas', options = {}) {
        // Elementos del DOM
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error(`Canvas with id "${canvasId}" not found`);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.loadingBar = document.getElementById('loadingBar');
        this.interactionHint = document.getElementById('interactionHint');
        
        // Configuración de dimensiones
        this.setupCanvas();
        
        // Configuración personalizable de la red neuronal
        this.config = this.mergeConfig({
            // Estructura de la red
            layers: [4, 6, 3], // Nodos por capa: entrada, oculta, salida
            
            // Configuración visual de nodos
            nodeRadius: 12,
            nodeGlowRadius: 25,
            nodeInactiveRadius: 8,
            
            // Configuración de conexiones
            connectionWidth: 1.5,
            connectionGlowWidth: 3,
            
            // Configuración de animación
            animationSpeed: 120, // ms entre activaciones
            glowAnimationSpeed: 0.08, // velocidad de aparición del glow
            pulseSpeed: 0.003, // velocidad del efecto pulsante
            connectionFadeSpeed: 0.06, // velocidad de aparición de conexiones
            
            // Colores personalizables
            colors: {
                background: '#0a0a0a',
                nodeInactive: '#2a2a3a',
                nodeActive: '#00ffff',
                nodeCore: '#ffffff',
                nodeGlow: '#00ffff',
                connectionStart: '#ff00ff',
                connectionEnd: '#00ff00',
                connectionGlow: '#00ff00'
            },
            
            // Configuración de efectos
            effects: {
                enableGlow: true,
                enablePulse: true,
                enableParticles: false, // Para futuras mejoras
                glowIntensity: 0.8,
                pulseIntensity: 0.3
            }
        }, options);
        
        // Estado de la animación
        this.resetAnimationState();
        
        // Inicializar
        this.init();
    }

    /**
     * Fusiona configuración por defecto con opciones personalizadas
     */
    mergeConfig(defaultConfig, userConfig) {
        const merged = { ...defaultConfig };
        
        for (const key in userConfig) {
            if (typeof userConfig[key] === 'object' && !Array.isArray(userConfig[key])) {
                merged[key] = { ...defaultConfig[key], ...userConfig[key] };
            } else {
                merged[key] = userConfig[key];
            }
        }
        
        return merged;
    }

    /**
     * Reinicia el estado de la animación
     */
    resetAnimationState() {
        this.nodes = [];
        this.connections = [];
        this.animationState = {
            currentLayer: 0,
            currentNode: 0,
            phase: 'nodes', // 'nodes' o 'connections'
            isComplete: false,
            progress: 0,
            startTime: Date.now()
        };
    }

    /**
     * Configurar el canvas para pantalla completa
     */
    setupCanvas() {
        this.resizeCanvas();
        
        // Redimensionar automáticamente
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.calculatePositions();
        });
    }

    /**
     * Redimensionar canvas manteniendo la calidad
     */
    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.ctx.scale(dpr, dpr);
        
        // Usar dimensiones CSS para cálculos
        this.canvasWidth = rect.width;
        this.canvasHeight = rect.height;
    }

    /**
     * Inicializar la red neuronal
     */
    init() {
        this.calculatePositions();
        this.showLoadingOverlay();
        this.setupEventListeners();
        this.startAnimation();
    }

    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        // Reiniciar animación al hacer clic
        this.canvas.addEventListener('click', () => {
            this.restartAnimation();
        });
        
        // Mostrar hint de interacción cuando termine
        this.canvas.addEventListener('mouseenter', () => {
            if (this.animationState.isComplete && this.interactionHint) {
                this.interactionHint.classList.add('visible');
            }
        });
    }

    /**
     * Calcular posiciones de nodos y conexiones
     */
    calculatePositions() {
        this.nodes = [];
        this.connections = [];
        
        const margin = 100; // Margen desde los bordes
        const layerSpacing = (this.canvasWidth - 2 * margin) / (this.config.layers.length - 1);
        
        // Crear nodos para cada capa
        this.config.layers.forEach((nodeCount, layerIndex) => {
            const x = margin + layerSpacing * layerIndex;
            const availableHeight = this.canvasHeight - 2 * margin;
            const nodeSpacing = availableHeight / (nodeCount - 1);
            
            for (let nodeIndex = 0; nodeIndex < nodeCount; nodeIndex++) {
                const y = margin + nodeSpacing * nodeIndex;
                
                this.nodes.push({
                    layer: layerIndex,
                    index: nodeIndex,
                    x: x,
                    y: y,
                    active: false,
                    glowIntensity: 0,
                    activationTime: 0
                });
            }
        });
        
        // Crear conexiones entre capas adyacentes
        for (let layerIndex = 0; layerIndex < this.config.layers.length - 1; layerIndex++) {
            const currentLayerNodes = this.nodes.filter(node => node.layer === layerIndex);
            const nextLayerNodes = this.nodes.filter(node => node.layer === layerIndex + 1);
            
            currentLayerNodes.forEach(fromNode => {
                nextLayerNodes.forEach(toNode => {
                    this.connections.push({
                        from: fromNode,
                        to: toNode,
                        active: false,
                        opacity: 0,
                        activationTime: 0
                    });
                });
            });
        }
    }

    /**
     * Mostrar overlay de carga
     */
    showLoadingOverlay() {
        if (this.loadingOverlay) {
            this.loadingOverlay.style.opacity = '1';
        }
    }

    /**
     * Ocultar overlay de carga
     */
    hideLoadingOverlay() {
        if (this.loadingOverlay) {
            this.loadingOverlay.style.opacity = '0';
        }
        
        // Mostrar hint de interacción después de un momento
        setTimeout(() => {
            if (this.interactionHint) {
                this.interactionHint.classList.add('visible');
            }
        }, 2000);
    }

    /**
     * Actualizar progreso de carga
     */
    updateProgress(progress) {
        if (this.loadingBar) {
            this.loadingBar.style.width = Math.min(100, progress) + '%';
        }
        this.animationState.progress = progress;
    }

    /**
     * Reiniciar la animación
     */
    restartAnimation() {
        this.resetAnimationState();
        this.calculatePositions();
        this.showLoadingOverlay();
        if (this.interactionHint) {
            this.interactionHint.classList.remove('visible');
        }
    }

    /**
     * Iniciar la animación
     */
    startAnimation() {
        this.animationLoop();
    }

    /**
     * Bucle principal de animación
     */
    animationLoop() {
        this.render();
        
        if (!this.animationState.isComplete) {
            this.updateAnimation();
            setTimeout(() => {
                requestAnimationFrame(() => this.animationLoop());
            }, this.config.animationSpeed);
        } else {
            // Animación completada - continuar renderizado para efectos visuales
            requestAnimationFrame(() => this.animationLoop());
        }
    }

    /**
     * Actualizar estado de la animación
     */
    updateAnimation() {
        const totalLayers = this.config.layers.length;
        const currentLayerNodes = this.config.layers[this.animationState.currentLayer];
        const currentTime = Date.now();
        
        if (this.animationState.phase === 'nodes') {
            // Activar nodos de la capa actual
            if (this.animationState.currentNode < currentLayerNodes) {
                const nodeToActivate = this.nodes.find(node => 
                    node.layer === this.animationState.currentLayer && 
                    node.index === this.animationState.currentNode
                );
                
                if (nodeToActivate) {
                    nodeToActivate.active = true;
                    nodeToActivate.activationTime = currentTime;
                }
                
                this.animationState.currentNode++;
                
                // Calcular progreso de nodos
                let totalNodes = this.config.layers.reduce((sum, count) => sum + count, 0);
                let activatedNodes = 0;
                for (let i = 0; i < this.animationState.currentLayer; i++) {
                    activatedNodes += this.config.layers[i];
                }
                activatedNodes += this.animationState.currentNode;
                this.updateProgress((activatedNodes / (totalNodes + this.connections.length)) * 100);
                
            } else {
                // Todos los nodos de esta capa están activos, pasar a conexiones
                if (this.animationState.currentLayer < totalLayers - 1) {
                    this.animationState.phase = 'connections';
                    this.animationState.currentNode = 0;
                } else {
                    // Última capa completada
                    this.completeAnimation();
                }
            }
        } else {
            // Activar conexiones desde la capa actual
            const connectionsFromCurrentLayer = this.connections.filter(conn => 
                conn.from.layer === this.animationState.currentLayer
            );
            
            if (this.animationState.currentNode < connectionsFromCurrentLayer.length) {
                const connectionToActivate = connectionsFromCurrentLayer[this.animationState.currentNode];
                connectionToActivate.active = true;
                connectionToActivate.activationTime = currentTime;
                
                // También activar el nodo de destino si no está activo
                if (!connectionToActivate.to.active) {
                    connectionToActivate.to.active = true;
                    connectionToActivate.to.activationTime = currentTime;
                }
                
                this.animationState.currentNode++;
                
                // Actualizar progreso para conexiones
                let totalNodes = this.config.layers.reduce((sum, count) => sum + count, 0);
                let activeConnections = this.connections.filter(conn => conn.active).length;
                let nodeProgress = totalNodes / (totalNodes + this.connections.length) * 100;
                let connectionProgress = (activeConnections / this.connections.length) * (100 - nodeProgress);
                this.updateProgress(nodeProgress + connectionProgress);
                
            } else {
                // Todas las conexiones de esta capa están activas
                this.animationState.currentLayer++;
                this.animationState.phase = 'nodes';
                this.animationState.currentNode = 0;
                
                if (this.animationState.currentLayer >= totalLayers) {
                    this.completeAnimation();
                }
            }
        }
    }

    /**
     * Completar la animación
     */
    completeAnimation() {
        this.animationState.isComplete = true;
        this.updateProgress(100);
        setTimeout(() => this.hideLoadingOverlay(), 1000);
    }

    /**
     * Renderizar la red neuronal
     */
    render() {
        // Limpiar canvas con gradiente de fondo
        this.renderBackground();
        
        // Renderizar conexiones primero (detrás de los nodos)
        this.renderConnections();
        
        // Renderizar nodos encima
        this.renderNodes();
    }

    /**
     * Renderizar fondo con gradiente
     */
    renderBackground() {
        const gradient = this.ctx.createRadialGradient(
            this.canvasWidth / 2, this.canvasHeight / 2, 0,
            this.canvasWidth / 2, this.canvasHeight / 2, Math.max(this.canvasWidth, this.canvasHeight) / 2
        );
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(0.5, '#16213e');
        gradient.addColorStop(1, this.config.colors.background);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    /**
     * Renderizar conexiones
     */
    renderConnections() {
        const currentTime = Date.now();
        
        this.connections.forEach(connection => {
            if (connection.active) {
                // Animar opacidad de la conexión
                const timeSinceActivation = currentTime - connection.activationTime;
                const targetOpacity = Math.min(1, timeSinceActivation / 500); // 500ms para fade in completo
                
                if (connection.opacity < targetOpacity) {
                    connection.opacity = Math.min(targetOpacity, connection.opacity + this.config.connectionFadeSpeed);
                }
                
                // Crear gradiente para la conexión
                const gradient = this.ctx.createLinearGradient(
                    connection.from.x, connection.from.y,
                    connection.to.x, connection.to.y
                );
                gradient.addColorStop(0, this.config.colors.connectionStart);
                gradient.addColorStop(1, this.config.colors.connectionEnd);
                
                // Configurar estilo de línea
                this.ctx.strokeStyle = gradient;
                this.ctx.lineWidth = this.config.connectionWidth;
                this.ctx.globalAlpha = connection.opacity;
                
                // Efecto glow en conexiones
                if (this.config.effects.enableGlow) {
                    this.ctx.shadowColor = this.config.colors.connectionGlow;
                    this.ctx.shadowBlur = 8;
                }
                
                // Dibujar conexión
                this.ctx.beginPath();
                this.ctx.moveTo(connection.from.x, connection.from.y);
                this.ctx.lineTo(connection.to.x, connection.to.y);
                this.ctx.stroke();
                
                // Limpiar efectos
                this.ctx.globalAlpha = 1;
                this.ctx.shadowBlur = 0;
            }
        });
    }

    /**
     * Renderizar nodos
     */
    renderNodes() {
        const currentTime = Date.now();
        
        this.nodes.forEach(node => {
            if (node.active) {
                // Animar intensidad del glow
                const timeSinceActivation = currentTime - node.activationTime;
                const targetGlow = Math.min(1, timeSinceActivation / 300); // 300ms para glow completo
                
                if (node.glowIntensity < targetGlow) {
                    node.glowIntensity = Math.min(targetGlow, node.glowIntensity + this.config.glowAnimationSpeed);
                }
                
                // Efecto pulsante
                let pulse = 1;
                if (this.config.effects.enablePulse) {
                    pulse = Math.sin(currentTime * this.config.pulseSpeed) * this.config.effects.pulseIntensity + (1 - this.config.effects.pulseIntensity);
                }
                
                const currentGlow = node.glowIntensity * pulse * this.config.effects.glowIntensity;
                
                // Renderizar glow del nodo
                if (this.config.effects.enableGlow) {
                    const glowGradient = this.ctx.createRadialGradient(
                        node.x, node.y, 0,
                        node.x, node.y, this.config.nodeGlowRadius
                    );
                    glowGradient.addColorStop(0, `rgba(0, 255, 255, ${currentGlow * 0.8})`);
                    glowGradient.addColorStop(0.5, `rgba(0, 255, 255, ${currentGlow * 0.4})`);
                    glowGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
                    
                    this.ctx.fillStyle = glowGradient;
                    this.ctx.beginPath();
                    this.ctx.arc(node.x, node.y, this.config.nodeGlowRadius, 0, Math.PI * 2);
                    this.ctx.fill();
                }
                
                // Renderizar nodo principal
                this.ctx.fillStyle = this.config.colors.nodeActive;
                this.ctx.shadowColor = this.config.colors.nodeGlow;
                this.ctx.shadowBlur = 10;
                
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, this.config.nodeRadius * pulse, 0, Math.PI * 2);
                this.ctx.fill();
                
                // Núcleo interno brillante
                this.ctx.fillStyle = this.config.colors.nodeCore;
                this.ctx.shadowBlur = 0;
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, this.config.nodeRadius * 0.3 * pulse, 0, Math.PI * 2);
                this.ctx.fill();
                
            } else {
                // Nodo inactivo
                this.ctx.fillStyle = this.config.colors.nodeInactive;
                this.ctx.shadowBlur = 0;
                
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, this.config.nodeInactiveRadius, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
    }

    /**
     * Método público para cambiar configuración en tiempo real
     */
    updateConfig(newConfig) {
        this.config = this.mergeConfig(this.config, newConfig);
        this.restartAnimation();
    }

    /**
     * Método público para obtener estadísticas de la animación
     */
    getStats() {
        const totalNodes = this.nodes.length;
        const activeNodes = this.nodes.filter(n => n.active).length;
        const totalConnections = this.connections.length;
        const activeConnections = this.connections.filter(c => c.active).length;
        
        return {
            totalNodes,
            activeNodes,
            totalConnections,
            activeConnections,
            progress: this.animationState.progress,
            isComplete: this.animationState.isComplete,
            duration: Date.now() - this.animationState.startTime
        };
    }
}

// Funciones de utilidad para integración fácil

/**
 * Inicializar animación con configuración por defecto
 */
function initNeuralAnimation(canvasId = 'neuralCanvas', options = {}) {
    return new NeuralNetworkAnimation(canvasId, options);
}

/**
 * Configuraciones predefinidas
 */
const NeuralAnimationPresets = {
    // Tema cyberpunk (por defecto)
    cyberpunk: {
        colors: {
            nodeActive: '#00ffff',
            nodeGlow: '#00ffff',
            connectionStart: '#ff00ff',
            connectionEnd: '#00ff00'
        }
    },
    
    // Tema matrix
    matrix: {
        colors: {
            background: '#000000',
            nodeInactive: '#001100',
            nodeActive: '#00ff00',
            nodeGlow: '#00ff00',
            connectionStart: '#00ff00',
            connectionEnd: '#33ff33'
        }
    },
    
    // Tema neon
    neon: {
        colors: {
            background: '#1a1a1a',
            nodeActive: '#ff6b6b',
            nodeGlow: '#ff6b6b',
            connectionStart: '#4ecdc4',
            connectionEnd: '#45b7d1'
        }
    },
    
    // Configuración rápida
    fast: {
        animationSpeed: 50,
        glowAnimationSpeed: 0.15,
        connectionFadeSpeed: 0.12
    },
    
    // Red neuronal grande
    large: {
        layers: [6, 8, 4],
        nodeRadius: 15,
        nodeGlowRadius: 30
    },
    
    // Red neuronal simple
    simple: {
        layers: [3, 4, 2],
        effects: {
            enableGlow: false,
            enablePulse: false
        }
    }
};

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NeuralNetworkAnimation, initNeuralAnimation, NeuralAnimationPresets };
}
