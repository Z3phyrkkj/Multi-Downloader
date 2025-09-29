# 📥 Multi-Downloader

API e interface web para baixar vídeos do **Instagram**, **TikTok** e **Twitter** de forma rápida, segura e gratuita, incluindo um módulo de jogo Gartic.

<p align="center">
  <img src="https://img.icons8.com/color/96/000000/instagram-new.png" alt="Instagram"/>
  <img src="https://img.icons8.com/color/96/000000/tiktok--v1.png" alt="TikTok"/>
  <img src="https://img.icons8.com/color/96/000000/twitter--v1.png" alt="Twitter"/>
</p>

## 🚀 Funcionalidades

- Download de mídias de Instagram, TikTok e Twitter
- API Gartic integrada com sistema de imagens e respostas
- Interface web moderna e responsiva
- API RESTful pronta para integração
- Limite de requisições e proteção contra abusos
- Sistema de logs e tratamento de erros
- Validação de URLs e formatos

## 🗂 Estrutura do Projeto

```
Multi-Downloader/
├── docs/             # Documentação detalhada
├── scripts/          # Scripts úteis
│   ├── setup.sh      # Configuração inicial
│   └── cleanup.sh    # Limpeza de arquivos temporários
├── src/              # Código fonte
│   ├── config/       # Configurações
│   ├── controllers/  # Controllers da API
│   ├── data/         # Dados e arquivos temporários
│   ├── features/     # Módulos específicos
│   │   └── gartic/   # Feature Gartic
│   ├── middlewares/  # Middlewares Express
│   ├── public/       # Interface web
│   ├── routes/       # Rotas da API
│   ├── services/     # Serviços e lógica de negócio
│   ├── utils/        # Utilitários
│   ├── validators/   # Validação de dados
│   ├── app.js        # Configuração Express
│   └── server.js     # Entrada da aplicação
├── tests/            # Testes automatizados
│   ├── integration/  # Testes de integração
│   └── unit/        # Testes unitários
├── .env.example      # Template de variáveis de ambiente
├── jest.config.js    # Configuração de testes
└── package.json      # Dependências e scripts
```

## ⚙️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Z3phyrkkj/Multi-Downloader.git
cd Multi-Downloader
```

2. Execute o script de setup:
```bash
./scripts/setup.sh
```

3. Inicie o servidor:
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## � Documentação

Consulte a pasta `docs/` para documentação detalhada sobre:
- Endpoints da API
- Configuração do ambiente
- Guia de contribuição
- Especificações técnicas

## 🛠 Scripts Disponíveis

- `npm start` - Inicia em produção
- `npm run dev` - Inicia em desenvolvimento
- `npm test` - Executa testes
- `./scripts/cleanup.sh` - Limpa arquivos temporários

## 🧪 Testes

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

## � Contato

- GitHub: [@Z3phyrkkj](https://github.com/Z3phyrkkj)
- Email: Z3phyrPy@proton.me

---

<p align="center">
  Feito com ❤️ por Z3phyrkkj
</p>
