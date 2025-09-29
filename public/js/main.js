
class Main {
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
            document.getElementById('mediaDuration').textContent = `Duração: ${this.formatDuration ? this.formatDuration(mediaData.duration) : mediaData.duration}`;
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

}

const main = new Main();