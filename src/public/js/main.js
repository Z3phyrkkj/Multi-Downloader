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

document.addEventListener('DOMContentLoaded', () => {
    new SocialDownloader();
});
