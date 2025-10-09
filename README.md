
# 📥 Multi-Downloader

<<<<<<< HEAD
API and web interface for downloading media from Instagram, TikTok and Twitter.

## Quick Start
With Docker:
```bash
docker-compose up -d
```

Local development:
```bash
npm install
npm run dev
```

## Stack
- Node.js + Express
- Redis cache
- Docker multi-stage builds
- Jest + Supertest
- GitHub Actions CI/CD
- OpenAPI documentation
- Discord webhook analytics
=======
API e interface web para baixar vídeos do **Instagram**, **TikTok** e **Twitter** de forma rápida, segura e gratuita, incluindo um módulo de jogo Gartic.
>>>>>>> dcc6880abe550e5ed61fbba79edbf64995e852db

<p align="center">
  <img src="https://img.icons8.com/color/96/000000/instagram-new.png" alt="Instagram"/>
  <img src="https://img.icons8.com/color/96/000000/tiktok--v1.png" alt="TikTok"/>
  <img src="https://img.icons8.com/color/96/000000/twitter--v1.png" alt="Twitter"/>
</p>


## 🚀 Funcionalidades

- Download de mídias de Instagram, TikTok e Twitter (suporte a vídeo, imagem e áudio)
- API RESTful pronta para integração
- Interface web moderna e responsiva (frontend em HTML/CSS/JS)
- Validação automática de URLs por plataforma
- Limite de requisições e proteção contra abusos (rate limit)
- Sistema de logs avançado (Winston + Morgan)
- Analytics via Discord Webhook
- Tratamento global de erros
- Módulo de jogo Gartic: API com imagens, respostas, validação e estatísticas
- Testes automatizados (unitários e integração via Jest/Supertest)


## 🗂 Estrutura do Projeto

```
Multi-Downloader/
├── docs/                # Documentação detalhada
├── scripts/             # Scripts úteis (setup, cleanup)
├── src/                 # Código fonte principal
│   ├── config/          # Configurações (API, logger)
│   ├── controllers/     # Controllers da API principal
│   ├── data/            # Dados e arquivos temporários
│   ├── features/        # Módulos específicos (ex: Gartic)
│   │   └── gartic/      # API de jogo Gartic (controllers, services, rotas, dados)
│   ├── middlewares/     # Middlewares Express (logger, error)
│   ├── models/          # Modelos de dados (se aplicável)
│   ├── public/          # Interface web (HTML, CSS, JS)
│   ├── routes/          # Rotas da API (Instagram, TikTok, Twitter, Gartic, Health)
│   ├── services/        # Serviços de download, scraping, parsing
│   ├── utils/           # Utilitários (formatadores, handlers)
│   ├── validators/      # Validação de URLs
│   ├── app.js           # Configuração principal Express
│   └── server.js        # Entrada da aplicação
├── tests/               # Testes automatizados (unitários e integração)
├── .env.example         # Template de variáveis de ambiente
├── jest.config.js       # Configuração de testes
└── package.json         # Dependências e scripts
```


## ⚙️ Instalação

1. Clone o repositório:
  ```bash
  git clone https://github.com/Z3phyrkkj/Multi-Downloader.git
  cd Multi-Downloader
  ```
2. Configure o webhook do Discord em `.env`:
  ```bash
  DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your/webhook/url
  ```

3. Execute o script de setup:
  ```bash
  ./scripts/setup.sh
  ```
4. Inicie o servidor:
  ```bash
  # Desenvolvimento
  npm run dev

  # Produção
  npm start
  ```


## 📚 Documentação

Consulte a pasta `docs/` para detalhes sobre:
- Endpoints da API (Instagram, TikTok, Twitter, Gartic)
- Parâmetros e exemplos de uso
- Configuração do ambiente
- Guia de contribuição
- Especificações técnicas

<<<<<<< HEAD
### API Endpoints

#### Batch Download
```http
POST /api/batch
Content-Type: application/json

{
  "urls": [
    "https://www.instagram.com/p/example1",
    "https://www.tiktok.com/@user/video/123",
    "https://twitter.com/user/status/456"
  ]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "total": 3,
    "successful": 3,
    "failed": 0,
    "results": [
      {
        "url": "https://www.instagram.com/p/example1",
        "success": true,
        "platform": "instagram",
        "data": {
          "url": "https://instagram.com/download/url",
          "type": "video",
          "author": "Mkg",
          "criador": "Mkg"
        }
      },
      {
        "url": "https://www.tiktok.com/@user/video/123",
        "success": true,
        "platform": "tiktok",
        "data": {
          "url": "https://tiktok.com/download/url",
          "type": "video",
          "author": "Mkg",
          "criador": "Mkg"
        }
      },
      {
        "url": "https://twitter.com/user/status/456",
        "success": true,
        "platform": "twitter",
        "data": {
          "url": "https://twitter.com/download/url",
          "type": "video",
          "author": "Mkg",
          "criador": "Mkg"
        }
      }
    ]
  }
}
```

#### Instagram
```http
GET /api/ig?url=https://www.instagram.com/p/example
```

Response:
```json
{
  "success": true,
  "data": {
    "url": "https://instagram.com/download/url",
    "type": "video",
    "duration": "00:30",
    "size": "5.2MB",
    "author": "Mkg",
    "criador": "Mkg"
  }
}
```

#### TikTok
```http
GET /api/tiktok?url=https://www.tiktok.com/@user/video/123
```

Response:
```json
{
  "success": true,
  "data": {
    "url": "https://tiktok.com/download/url",
    "author": "Mkg",
    "description": "Video description",
    "duration": "00:15",
    "criador": "Mkg"
  }
}
```

#### Twitter
```http
GET /api/twitter?url=https://twitter.com/user/status/123
```

Response:
```json
{
  "success": true,
  "data": {
    "url": "https://twitter.com/download/url",
    "type": "video",
    "author": "Mkg",
    "text": "Tweet text",
    "criador": "Mkg"
  }
}
```

#### Gartic
Get random image:
```http
GET /api/gartic
```

Response:
```json
{
  "success": true,
  "data": {
    "imageUrl": "https://example.com/image.jpg",
    "category": "animals"
  }
}
```

Check answer:
```http
POST /api/gartic
Content-Type: application/json

{
  "answer": "dog",
  "imageId": "123"
}
```

Response:
```json
{
  "success": true,
  "correct": true,
  "word": "dog"
}
```

Health check:
```http
GET /api/gartic/health
```

Response:
```json
{
  "status": "healthy",
  "uptime": "2d 5h 30m"
}
```

#### YouTube
```http
GET /api/youtube?url=https://www.youtube.com/watch?v=example
```

Response:
```json
{
  "success": true,
  "platform": "youtube",
  "data": [
    {
      "url": "https://youtube.com/download/url",
      "quality": "1080p",
      "type": "video",
      "title": "Example Video Title",
      "author": "Mkg",
      "thumbnail": "https://i.ytimg.com/vi/example/maxresdefault.jpg",
      "duration": "10:30"
    },
    {
      "url": "https://youtube.com/download/url2",
      "quality": "720p",
      "type": "video",
      "title": "Example Video Title",
      "author": "Mkg",
      "thumbnail": "https://i.ytimg.com/vi/example/maxresdefault.jpg",
      "duration": "10:30"
    }
  ],
  "criador": "Mkg"
}
```

#### Health Check
```http
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2025-10-08T12:00:00Z"
}
```
=======
### Principais Endpoints

**Instagram**
- `GET /api/ig?url=...` — Download de mídia

**TikTok**
- `GET /api/tiktok?url=...` — Download de vídeo

**Twitter**
- `GET /api/twitter?url=...` — Download de mídia

**Gartic**
- `GET /api/gartic` — Imagem aleatória
- `POST /api/gartic` — Verificar resposta
- `GET /api/gartic/health` — Status do serviço

**Health**
- `GET /api/health` — Status do servidor
>>>>>>> dcc6880abe550e5ed61fbba79edbf64995e852db


## 🛠 Scripts Disponíveis

- `npm start` — Inicia em produção
- `npm run dev` — Inicia em desenvolvimento
- `npm test` — Executa todos os testes
- `npm run test:unit` — Testes unitários
- `npm run test:integration` — Testes de integração
- `npm run lint` — Lint do código
- `npm run lint:fix` — Corrige problemas de lint
- `npm run format` — Formata arquivos
- `./scripts/cleanup.sh` — Limpa arquivos temporários


## 🧪 Testes

Testes automatizados com Jest e Supertest:

```bash
# Executa todos os testes
npm test

# Testes unitários
npm run test:unit

# Testes de integração
npm run test:integration
```


## 📝 Licença

MIT © Z3phyrkkj


## 💬 Suporte

<p align="center">
  <a href="https://chat.whatsapp.com/JDciDHplLDhKkgyTCoYhs0" target="_blank">
    <img src="https://img.icons8.com/color/96/000000/whatsapp--v1.png" alt="WhatsApp"/>
  </a>
</p>

Entre no nosso grupo do WhatsApp:
👉 [Entrar no grupo de suporte](https://chat.whatsapp.com/JDciDHplLDhKkgyTCoYhs0)


## 📬 Contato

- GitHub: [@Z3phyrkkj](https://github.com/Z3phyrkkj)
- Email: Z3phyrPy@proton.me


<<<<<<< HEAD
---
=======
---

<p align="center">
  Feito com ❤️ por Z3phyrkkj
</p>
>>>>>>> dcc6880abe550e5ed61fbba79edbf64995e852db
