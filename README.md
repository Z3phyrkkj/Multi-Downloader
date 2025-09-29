
# 📥 Multi-Downloader

API e interface web para baixar vídeos do **Instagram**, **TikTok** e **Twitter** de forma rápida, segura e gratuita, incluindo um módulo de jogo Gartic.

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


---

<p align="center">
  Feito com ❤️ por Z3phyrkkj
</p>
