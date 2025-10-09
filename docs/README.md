# Documentação do Multi-Downloader

## Visão Geral
Multi-Downloader é uma API para download de mídias de diferentes plataformas sociais (Instagram, TikTok, Twitter) e inclui um módulo de jogo Gartic.

## Endpoints

### Instagram (`/api/ig`)
  - Query: `url` - URL do post/reels do Instagram

### TikTok (`/api/tiktok`)
  - Query: `url` - URL do vídeo do TikTok

### Twitter (`/api/twitter`)
  - Query: `url` - URL do tweet

### Gartic (`/api/gartic`)
  - Query: `category` (opcional) - Categoria específica
  - Body: `{ imageId, answer }`

## Configuração
1. Clone o repositório
2. Copie `.env.example` para `.env`
3. Configure as variáveis de ambiente
4. Instale as dependências: `npm install`
5. Inicie o servidor: `npm start`

## Scripts Disponíveis