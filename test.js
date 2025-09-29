const { ttdl } = require('aetherz-downloader');
const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/test-tiktok", async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    console.log("📱 Testando URL do TikTok:", url);
    
    const data = await ttdl(url);
    console.log("📦 Resposta COMPLETA do ttdl:");
    console.log(JSON.stringify(data, null, 2));
    
    console.log("🔍 Análise da estrutura:");
    console.log("Tipo:", typeof data);
    console.log("É array?", Array.isArray(data));
    
    if (data && typeof data === 'object') {
      console.log("Chaves do objeto:", Object.keys(data));
      
      if (data.data) {
        console.log("Data existe, tipo:", typeof data.data);
        console.log("Data é array?", Array.isArray(data.data));
        if (Array.isArray(data.data)) {
          console.log("Número de itens em data:", data.data.length);
          data.data.forEach((item, index) => {
            console.log(`Item ${index}:`, Object.keys(item));
          });
        }
      }
      
      if (data.medias) {
        console.log("Medias existe, tipo:", typeof data.medias);
        console.log("Medias é array?", Array.isArray(data.medias));
      }
      
      if (data.video) {
        console.log("Video existe, tipo:", typeof data.video);
        console.log("Video é array?", Array.isArray(data.video));
      }
    }

    res.json({
      success: true,
      rawResponse: data,
      analysis: {
        type: typeof data,
        isArray: Array.isArray(data),
        keys: data ? Object.keys(data) : [],
        hasData: !!(data && data.data),
        dataIsArray: !!(data && data.data && Array.isArray(data.data)),
        dataLength: data && data.data && Array.isArray(data.data) ? data.data.length : 0,
        hasMedias: !!(data && data.medias),
        hasVideo: !!(data && data.video),
        hasUrl: !!(data && data.url)
      }
    });
  } catch (error) {
    console.error("❌ Erro no TikTok:", error);
    res.status(500).json({ 
      error: "Failed to download TikTok content",
      details: error.message,
      stack: error.stack
    });
  }
});

app.get("/test-multiple", async (req, res) => {
  const testUrls = [
    "https://www.tiktok.com/@example/video/123456789",
    "https://vm.tiktok.com/ZMExample/",
    "https://www.tiktok.com/t/ZTExample/",
    "https://vt.tiktok.com/ZSExample/"
  ];

  const results = [];

  for (let url of testUrls) {
    try {
      console.log(`\n🔗 Testando: ${url}`);
      const data = await ttdl(url);
      results.push({
        url,
        success: true,
        structure: {
          type: typeof data,
          isArray: Array.isArray(data),
          keys: data ? Object.keys(data) : []
        },
        data: data
      });
    } catch (error) {
      results.push({
        url,
        success: false,
        error: error.message
      });
    }
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de teste rodando em http://localhost:${PORT}`);
  console.log(`📱 Teste TikTok: http://localhost:${PORT}/test-tiktok?url=SUA_URL_DO_TIKTOK`);
  console.log(`🔗 Teste múltiplo: http://localhost:${PORT}/test-multiple`);
});