#!/bin/bash

# Script de instalação e configuração do Multi-Downloader

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo "🚀 Iniciando setup do Multi-Downloader..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado. Por favor, instale o Node.js${NC}"
    exit 1
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm não encontrado. Por favor, instale o npm${NC}"
    exit 1
fi

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Configurar ambiente
if [ ! -f .env ]; then
    echo "⚙️ Configurando ambiente..."
    cp .env.example .env
    echo -e "${GREEN}✅ Arquivo .env criado${NC}"
fi

# Criar diretórios necessários
echo "📁 Criando diretórios..."
mkdir -p src/data/tempDownloads

echo -e "${GREEN}✅ Setup concluído com sucesso!${NC}"
echo "🎉 Para iniciar o servidor, execute: npm start"