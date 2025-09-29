# 📥 Social Media Downloader

API e interface web para baixar vídeos do **Instagram**, **TikTok** e **Twitter** de forma rápida, segura e gratuita.

<p align="center">
  <img src="https://img.icons8.com/color/96/000000/instagram-new.png" alt="Instagram"/>
  <img src="https://img.icons8.com/color/96/000000/tiktok--v1.png" alt="TikTok"/>
  <img src="https://img.icons8.com/color/96/000000/twitter--v1.png" alt="Twitter"/>
</p>

---

## 🚀 Funcionalidades

- Download de mídias de Instagram, TikTok e Twitter
- Suporte a múltiplos formatos e qualidades
- Interface web moderna e responsiva
- API RESTful pronta para integração
- Limite de requisições e proteção contra abusos
- Logs, tratamento de erros e validação de URLs

---

## 🗂 Estrutura do Projeto

```
api/
├── config/           # Configurações da API
│   └── apiConfig.js
├── controllers/      # Lógica dos endpoints
│   ├── downloadController.js
│   └── metaController.js
├── data/
│   └── tempDownloads/ # Arquivos temporários
├── middlewares/      # Middlewares globais
│   ├── errorMiddleware.js
│   └── logger.js
├── public/           # Interface web
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── routes/           # Rotas da API
│   ├── index.js
│   ├── instagram.js
│   ├── tiktok.js
│   └── twitter.js
├── services/         # Serviços de download e scraping
│   ├── downloaderService.js
│   ├── durationParser.js
│   └── scraperService.js
├── utils/            # Utilitários
│   ├── errorHandler.js
│   └── responseFormatter.js
├── validators/       # Validação de URLs
│   └── urlValidator.js
├── server.js         # Servidor principal
├── test.js           # Testes de integração
├── package.json      # Dependências e scripts
└── .env              # Variáveis de ambiente
```

---

## 🌐 Interface Web

<p align="center">
  <img src="https://img.icons8.com/fluency/96/000000/web.png" alt="Web"/>
</p>

- **URL Input:** Cole o link do vídeo desejado
- **Botão Baixar:** Inicia o download
- **Opções de Qualidade:** Escolha o formato e qualidade
- **Preview:** Visualize a mídia antes de baixar

---

## ⚙️ Instalação e Uso

```bash
# Instale as dependências
npm install

# Inicie o servidor em modo desenvolvimento
npm run dev

# Ou em modo produção
npm start

# Acesse a interface web:
http://localhost:3000
```

---

## 🛠 Tecnologias

<p align="center">
  <img src="https://img.icons8.com/color/48/000000/nodejs.png" alt="Node.js"/>
  <img src="https://img.icons8.com/color/48/000000/javascript--v1.png" alt="JavaScript"/>
  <img src="https://img.icons8.com/color/48/000000/html-5--v1.png" alt="HTML5"/>
  <img src="https://img.icons8.com/color/48/000000/css3.png" alt="CSS3"/>
</p>

- Node.js + Express
- Axios, Cheerio, dotenv, cors, helmet, compression
- rate-limiter-flexible (proteção)
- aetherz-downloader (download de mídias)
- Jest, Supertest (testes)
- HTML5, CSS3, JavaScript (frontend)

---

## 📑 Endpoints Principais

- `GET /api/ig` - Download do Instagram
- `GET /api/tiktok` - Download do TikTok
- `GET /api/twitter` - Download do Twitter

Veja os arquivos em `routes/` para detalhes.

---

## 🧪 Testes

Execute os testes com:

```bash
npm test
```

---

## 📝 Licença

MIT © Mkg

---

## 💡 Contribua

Pull requests são bem-vindos! Veja o arquivo `CONTRIBUTING.md` para detalhes.

---

## 📬 Contato

- [GitHub Issues](https://github.com/seu-usuario/social-media-downloader/issues)
- Email: seu-email@dominio.com

---

<p align="center">
  <img src="https://img.icons8.com/fluency/96/000000/download.png" alt="Download"/>
</p>
