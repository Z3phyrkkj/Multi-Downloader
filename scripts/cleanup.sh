#!/bin/bash

# Script de limpeza dos arquivos temporários

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

TEMP_DIR="src/data/tempDownloads"

echo "🧹 Iniciando limpeza de arquivos temporários..."

# Verificar se o diretório existe
if [ ! -d "$TEMP_DIR" ]; then
    echo -e "${RED}❌ Diretório $TEMP_DIR não encontrado${NC}"
    exit 1
fi

# Remover arquivos mais antigos que 24 horas
find "$TEMP_DIR" -type f -mtime +1 -delete

echo -e "${GREEN}✅ Limpeza concluída!${NC}"