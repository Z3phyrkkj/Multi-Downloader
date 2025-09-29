# Documentação do Multi-Downloader

## Visão Geral
Multi-Downloader é uma API para download de mídias de diferentes plataformas sociais (Instagram, TikTok, Twitter) e inclui um módulo de jogo Gartic.

## Endpoints

### Instagram (`/api/ig`)
- `GET /` - Download de mídia do Instagram
  - Query: `url` - URL do post/reels do Instagram

### TikTok (`/api/tiktok`)
- `GET /` - Download de vídeo do TikTok
  - Query: `url` - URL do vídeo do TikTok

### Twitter (`/api/twitter`)
- `GET /` - Download de mídia do Twitter
  - Query: `url` - URL do tweet

### Gartic (`/api/gartic`)
- `GET /` - Obter imagem aleatória
  - Query: `category` (opcional) - Categoria específica
- `POST /` - Verificar resposta
  - Body: `{ imageId, answer }`
- `GET /health` - Status do serviço Gartic

## Configuração
1. Clone o repositório
2. Copie `.env.example` para `.env`
3. Configure as variáveis de ambiente
4. Instale as dependências: `npm install`
5. Inicie o servidor: `npm start`

## Scripts Disponíveis
- `npm start` - Inicia o servidor
- `npm test` - Executa os testes
- `npm run dev` - Inicia em modo desenvolvimento