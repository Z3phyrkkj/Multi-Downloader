<<<<<<< HEAD
// Theme handling
const initTheme = () => {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    const setTheme = (isDark) => {
        document.body.classList.toggle('dark', isDark);
        document.querySelectorAll('[data-theme]').forEach(el => {
            el.classList.toggle('hidden', el.dataset.theme !== (isDark ? 'dark' : 'light'));
        });
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

    themeToggle?.addEventListener('click', () => {
        setTheme(!document.body.classList.contains('dark'));
    });
};

// Clipboard handling
const initClipboard = () => {
    const urlInput = document.getElementById('urlInput');
    const pasteBtn = document.getElementById('pasteBtn');

    if (!pasteBtn || !urlInput) return;

    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            urlInput.value = text;
            urlInput.focus();
        } catch (err) {
            showToast('Erro ao acessar área de transferência', 'error');
        }
    });
};

// Platform detection
const PLATFORMS = {
    instagram: {
        regex: /instagram\.com|instagr\.am/i,
        endpoint: '/api/ig',
        icon: 'ti-brand-instagram',
        placeholder: 'Cole o link do Instagram aqui...'
    },
    tiktok: {
        regex: /tiktok\.com|vm\.tiktok\.com/i,
        endpoint: '/api/tiktok',
        icon: 'ti-brand-tiktok',
        placeholder: 'Cole o link do TikTok aqui...'
    },
    twitter: {
        regex: /twitter\.com|x\.com/i,
        endpoint: '/api/twitter',
        icon: 'ti-brand-twitter',
        placeholder: 'Cole o link do Twitter aqui...'
    }
};

const detectPlatform = (url) => {
    return Object.entries(PLATFORMS).find(([_, config]) => 
        config.regex.test(url)
    )?.[0] || 'instagram';
};

// UI States
const UI_STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    ERROR: 'error',
    SUCCESS: 'success'
};

const updateUIState = (state, data = {}) => {
    document.getElementById('loading')?.classList.toggle('hidden', state !== UI_STATES.LOADING);
    document.getElementById('error')?.classList.toggle('hidden', state !== UI_STATES.ERROR);
    document.getElementById('result')?.classList.toggle('hidden', state !== UI_STATES.SUCCESS);

    if (state === UI_STATES.ERROR && data.message) {
        document.getElementById('errorMessage').textContent = data.message;
        document.getElementById('error').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (state === UI_STATES.SUCCESS && data.media) {
        renderMediaResult(data.media);
    }
};

// Media handling
const renderMediaResult = (media) => {
    if (!media?.data?.length) return;

    const firstItem = media.data[0];
    
    // Update preview
    const previewImage = document.getElementById('previewImage');
    previewImage.src = firstItem.thumbnail || '';
    previewImage.style.display = firstItem.thumbnail ? 'block' : 'none';
    
    document.getElementById('mediaTitle').textContent = firstItem.title || 'Mídia';
    document.getElementById('mediaAuthor').textContent = firstItem.author || media.criador || 'Desconhecido';
    
    if (firstItem.duration) {
        document.getElementById('mediaDuration').textContent = formatDuration(firstItem.duration);
    }

    // Generate download options
    const optionsContainer = document.getElementById('qualityOptions');
    optionsContainer.innerHTML = media.data.map((item, index) => {
        const quality = item.quality || (item.wm ? 'Com marca d\'água' : 'HD') || `Opção ${index + 1}`;
        return `
            <button class="quality-option" onclick="window.open('${item.url}', '_blank')">
                <div>
                    <strong>${quality}</strong>
                    <span>${item.type || 'video'}</span>
                </div>
                <i class="ti ti-download"></i>
            </button>
        `;
    }).join('');

    showToast('Mídia encontrada com sucesso!', 'success');
};

// Format duration helper
const formatDuration = (seconds) => {
    if (!seconds) return '';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return hours > 0
        ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        : `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// Download handling
const handleDownload = async () => {
    const urlInput = document.getElementById('urlInput');
    const url = urlInput?.value?.trim();

    if (!url) {
        showToast('Por favor, insira uma URL', 'error');
        return;
    }

    try {
        new URL(url);
    } catch {
        showToast('URL inválida', 'error');
        return;
    }

    const platform = detectPlatform(url);
    if (!platform) {
        showToast('Plataforma não suportada', 'error');
        return;
    }

    updateUIState(UI_STATES.LOADING);

    try {
        const response = await fetch(`${PLATFORMS[platform].endpoint}?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.error || 'Erro ao processar mídia');
        }

        updateUIState(UI_STATES.SUCCESS, { media: data });
    } catch (error) {
        updateUIState(UI_STATES.ERROR, { message: error.message });
        showToast(error.message, 'error');
    }
};

// Toast notifications
const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="ti ti-${type === 'error' ? 'alert-triangle' : 'check'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Initialize
const init = () => {
    initTheme();
    initClipboard();

    // Update input placeholder based on platform
    document.querySelectorAll('.platform-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const platform = e.currentTarget.dataset.platform;
            
            document.querySelectorAll('.platform-btn').forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            const input = document.getElementById('urlInput');
            input.placeholder = platform === 'all' 
                ? 'Cole o link do Instagram, TikTok ou Twitter aqui...'
                : PLATFORMS[platform]?.placeholder || '';
        });
    });

    // Bind download handlers
    document.getElementById('downloadBtn')?.addEventListener('click', handleDownload);
    document.getElementById('urlInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleDownload();
    });

    // Bind retry button
    document.getElementById('retryBtn')?.addEventListener('click', () => {
        updateUIState(UI_STATES.IDLE);
    });

    // Support button handler
    document.getElementById('supportBtn')?.addEventListener('click', () => {
        window.open('https://chat.whatsapp.com/JDciDHplLDhKkgyTCoYhs0', '_blank');
    });
};

// Add toast animations
=======
class SocialDownloader {
    constructor() {
        this.currentPlatform = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setPlatform('all');
    }

    bindEvents() {
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.handleDownload();
        });

        document.getElementById('urlInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleDownload();
            }
        });

        document.querySelectorAll('.platform-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setPlatform(e.currentTarget.dataset.platform);
            });
        });
    }

    setPlatform(platform) {
        this.currentPlatform = platform;
        
        document.querySelectorAll('.platform-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelector(`[data-platform="${platform}"]`).classList.add('active');
        
        const input = document.getElementById('urlInput');
        switch(platform) {
            case 'instagram':
                input.placeholder = 'Cole o link do Instagram aqui...';
                break;
            case 'tiktok':
                input.placeholder = 'Cole o link do TikTok aqui...';
                break;
            case 'twitter':
                input.placeholder = 'Cole o link do Twitter aqui...';
                break;
            default:
                input.placeholder = 'Cole o link do Instagram, TikTok ou Twitter aqui...';
        }
    }

    async handleDownload() {
        const url = document.getElementById('urlInput').value.trim();
        
        if (!url) {
            this.showError('Por favor, cole uma URL válida');
            return;
        }

        if (!this.isValidUrl(url)) {
            this.showError('Por favor, insira uma URL válida');
            return;
        }

        this.showLoading();
        this.hideError();
        this.hideResult();

        try {
            const platform = this.detectPlatform(url);
            const endpoint = this.getEndpoint(platform);
            
            const response = await fetch(`${endpoint}?url=${encodeURIComponent(url)}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao processar a requisição');
            }

            if (!data.success) {
                throw new Error(data.error || 'Erro desconhecido');
            }

            this.showResult(data);
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    detectPlatform(url) {
        if (url.includes('instagram.com') || url.includes('instagr.am')) {
            return 'instagram';
        } else if (url.includes('tiktok.com') || url.includes('vm.tiktok.com')) {
            return 'tiktok';
        } else if (url.includes('twitter.com') || url.includes('x.com')) {
            return 'twitter';
        }
        return this.currentPlatform === 'all' ? 'instagram' : this.currentPlatform;
    }

    getEndpoint(platform) {
        const endpoints = {
            instagram: '/api/ig',
            tiktok: '/api/tiktok',
            twitter: '/api/twitter'
        };
        return endpoints[platform] || '/api/ig';
    }

    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    showResult(data) {
        const result = document.getElementById('result');
        
        if (data.data && Array.isArray(data.data)) {
            this.showNewFormatResult(data);
        } else {
            this.showLegacyFormatResult(data);
        }
        
        result.classList.remove('hidden');
    }

    showNewFormatResult(data) {
        const mediaData = data.data[0];
        
        document.getElementById('mediaTitle').textContent = mediaData.title || 'Mídia baixada com sucesso';
        document.getElementById('mediaAuthor').textContent = `Por: ${mediaData.author || mediaData.wm || data.criador || 'Desconhecido'}`;
        document.getElementById('mediaDuration').textContent = '';
        
        const previewImage = document.getElementById('previewImage');
        if (mediaData.thumbnail) {
            previewImage.src = mediaData.thumbnail;
            previewImage.style.display = 'block';
        } else {
            previewImage.style.display = 'none';
        }
        
        this.generateNewQualityOptions(data.data);
    }

    showLegacyFormatResult(data) {
        const mediaData = data.data;
        
        document.getElementById('mediaTitle').textContent = mediaData.title;
        document.getElementById('mediaAuthor').textContent = `Por: ${mediaData.author}`;
        
        if (mediaData.duration) {
            document.getElementById('mediaDuration').textContent = `Duração: ${this.formatDuration(mediaData.duration)}`;
        } else {
            document.getElementById('mediaDuration').textContent = '';
        }
        
        const previewImage = document.getElementById('previewImage');
        if (mediaData.thumbnail) {
            previewImage.src = mediaData.thumbnail;
            previewImage.style.display = 'block';
        } else {
            previewImage.style.display = 'none';
        }
        
        this.generateQualityOptions(mediaData.urls);
    }

    generateNewQualityOptions(urls) {
        const container = document.getElementById('qualityOptions');
        container.innerHTML = '';
        
        if (!urls || urls.length === 0) {
            container.innerHTML = '<p class="no-options">Nenhuma opção de download disponível</p>';
            return;
        }
        
        urls.forEach((urlData, index) => {
            const button = document.createElement('button');
            button.className = 'quality-btn';
            
            const quality = urlData.quality || (urlData.wm ? 'Com marca d\'água' : 'HD') || `Opção ${index + 1}`;
            
            button.innerHTML = `
                <span>
                    <strong>${quality}</strong>
                    <small>${urlData.type || 'video'}</small>
                </span>
                <i class="fas fa-download"></i>
            `;
            
            button.addEventListener('click', () => {
                this.downloadFile(urlData.url, `download_${quality}`);
            });
            
            container.appendChild(button);
        });
    }

    generateQualityOptions(urls) {
        const container = document.getElementById('qualityOptions');
        container.innerHTML = '';
        
        if (!urls || urls.length === 0) {
            container.innerHTML = '<p class="no-options">Nenhuma opção de download disponível</p>';
            return;
        }
        
        urls.forEach((urlData, index) => {
            const button = document.createElement('button');
            button.className = 'quality-btn';
            button.innerHTML = `
                <span>
                    <strong>${urlData.quality}</strong>
                    <small>${urlData.type}</small>
                </span>
                <i class="fas fa-download"></i>
            `;
            
            button.addEventListener('click', () => {
                this.downloadFile(urlData.url, `${urlData.quality}_${urlData.type}`);
            });
            
            container.appendChild(button);
        });
    }

    downloadFile(url, filename) {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showToast('Download iniciado!');
    }

    formatDuration(seconds) {
        if (!seconds) return 'Desconhecida';
        
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${secs.toString().padStart(2, '0')}`;
        }
    }

    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
    }

    showError(message) {
        const errorDiv = document.getElementById('error');
        const errorMessage = document.getElementById('errorMessage');
        
        errorMessage.textContent = message;
        errorDiv.classList.remove('hidden');
        
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    hideError() {
        document.getElementById('error').classList.add('hidden');
    }

    hideResult() {
        document.getElementById('result').classList.add('hidden');
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

>>>>>>> dcc6880abe550e5ed61fbba79edbf64995e852db
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(toastStyles);

<<<<<<< HEAD
// Start app
document.addEventListener('DOMContentLoaded', init);
=======
document.addEventListener('DOMContentLoaded', () => {
    new SocialDownloader();
});
>>>>>>> dcc6880abe550e5ed61fbba79edbf64995e852db
