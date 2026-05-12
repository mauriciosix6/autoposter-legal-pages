const express = require("express");
const path = require("path");

console.log("SERVER CORRETO COM /desktop CARREGADO");

const app = express();

const APP_NAME = "Autoposter GG";
const LAST_UPDATED = "10/05/2026";

// Arquivos de verificação TikTok
app.use("/terms", express.static(path.join(__dirname, "public", "terms")));
app.use("/privacy", express.static(path.join(__dirname, "public", "privacy")));
app.use("/desktop", express.static(path.join(__dirname, "public", "desktop")));

app.get("/terms/:fileName", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "terms", req.params.fileName));
});

app.get("/privacy/:fileName", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "privacy", req.params.fileName));
});

app.get("/desktop/:fileName", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "desktop", req.params.fileName));
});

function page(title, content) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    :root {
      --bg: #050b16;
      --panel: #081426;
      --text: #eaf4ff;
      --muted: #9fb3cc;
      --cyan: #00e1ff;
      --pink: #ff3baa;
      --border: rgba(0, 225, 255, 0.25);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      background: radial-gradient(circle at top left, #0d2440 0, var(--bg) 36%, #02060d 100%);
      color: var(--text);
      line-height: 1.65;
      min-height: 100vh;
      padding: 40px 18px;
    }

    main {
      max-width: 920px;
      margin: 0 auto;
      background: rgba(8, 20, 38, 0.92);
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 38px;
      box-shadow: 0 0 35px rgba(0, 225, 255, 0.08), 0 0 45px rgba(255, 59, 170, 0.06);
    }

    h1 {
      color: var(--cyan);
      margin-top: 0;
      font-size: 34px;
    }

    h2 {
      color: var(--cyan);
      margin-top: 28px;
      font-size: 21px;
    }

    p, li {
      color: var(--text);
      font-size: 16px;
    }

    .muted {
      color: var(--muted);
    }

    a {
      color: var(--pink);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .nav {
      margin-top: 28px;
      padding-top: 18px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .nav a {
      margin-right: 18px;
    }
  </style>
</head>
<body>
  <main>
    ${content}
    <div class="nav">
      <a href="/desktop">Desktop App</a>
      <a href="/terms">Termos de Serviço</a>
      <a href="/privacy">Política de Privacidade</a>
    </div>
  </main>
</body>
</html>`;
}

app.get("/", (req, res) => {
  res.redirect("/desktop");
});

app.get("/desktop", (req, res) => {
  res.type("html").send(page(`${APP_NAME} - Desktop App`, `
    <h1>${APP_NAME} - Desktop Application</h1>
    <p class="muted">Official desktop application page</p>

    <h2>About ${APP_NAME}</h2>
    <p>${APP_NAME} is a desktop application that allows users to organize, schedule, and publish videos selected by the user to connected social platforms, including TikTok.</p>

    <h2>TikTok Integration</h2>
    <p>${APP_NAME} uses TikTok Login Kit and the TikTok Content Posting API to let users connect their own TikTok account, choose local videos, attach captions from .txt files, and publish content using official TikTok APIs.</p>

    <h2>User Control</h2>
    <p>The user controls which TikTok account is connected, which video is selected, which caption is used, and when the content is posted.</p>

    <h2>Products Used</h2>
    <p>${APP_NAME} uses Login Kit for authentication and the Content Posting API for video upload and Direct Post publishing.</p>

    <h2>Legal</h2>
    <p>
      <a href="/terms">Terms of Service</a><br>
      <a href="/privacy">Privacy Policy</a>
    </p>
  `));
});

app.get("/terms", (req, res) => {
  res.type("html").send(page(`Termos de Serviço - ${APP_NAME}`, `
    <h1>Termos de Serviço - ${APP_NAME}</h1>
    <p class="muted">Última atualização: ${LAST_UPDATED}</p>

    <p>Estes Termos de Serviço se aplicam ao aplicativo ${APP_NAME}.</p>
    <p>${APP_NAME} é um aplicativo desktop para organizar, agendar e publicar vídeos escolhidos pelo próprio usuário em contas sociais conectadas, incluindo TikTok.</p>

    <h2>1. Sobre o serviço</h2>
    <p>O ${APP_NAME} é uma ferramenta para organização, agendamento e envio de vídeos selecionados pelo usuário para plataformas sociais conectadas, incluindo Instagram e TikTok, conforme permissões concedidas pelo usuário.</p>

    <h2>2. Uso permitido</h2>
    <p>O usuário concorda em utilizar o ${APP_NAME} apenas com contas próprias ou contas para as quais possua autorização de gerenciamento.</p>

    <h2>3. Responsabilidade do usuário</h2>
    <p>O usuário é responsável pelos vídeos, legendas, hashtags, títulos, descrições, contas e qualquer conteúdo enviado através do aplicativo.</p>

    <h2>4. Integração com TikTok</h2>
    <p>Quando conectado ao TikTok, o ${APP_NAME} pode solicitar autorização oficial para enviar vídeos usando permissões concedidas pelo usuário, como leitura de informações básicas da conta, upload de vídeo e publicação direta conforme os escopos autorizados.</p>

    <h2>5. Publicação e aprovação</h2>
    <p>Em determinados fluxos, como envio para TikTok Inbox, o usuário pode precisar finalizar, revisar ou aprovar a publicação dentro do aplicativo TikTok. Em fluxos de Direct Post, o ${APP_NAME} publica usando as permissões oficiais concedidas pelo usuário.</p>

    <h2>6. Controle do usuário</h2>
    <p>O usuário controla qual conta será conectada, qual vídeo será selecionado, qual legenda será usada e quando o conteúdo será publicado.</p>

    <h2>7. Limitações</h2>
    <p>Não garantimos visualizações, seguidores, curtidas, monetização, alcance, engajamento ou resultados comerciais decorrentes das publicações.</p>

    <h2>8. Suspensão ou encerramento</h2>
    <p>O acesso ao serviço pode ser suspenso em caso de uso indevido, violação destes termos ou violação das regras das plataformas conectadas.</p>

    <h2>9. Alterações</h2>
    <p>Podemos atualizar estes Termos de Serviço periodicamente. O uso contínuo do serviço após alterações indica aceitação dos novos termos.</p>

    <h2>10. Contato</h2>
    <p>Para suporte ou dúvidas sobre estes termos, entre em contato com o administrador do ${APP_NAME}.</p>
  `));
});

app.get("/privacy", (req, res) => {
  res.type("html").send(page(`Política de Privacidade - ${APP_NAME}`, `
    <h1>Política de Privacidade - ${APP_NAME}</h1>
    <p class="muted">Última atualização: ${LAST_UPDATED}</p>

    <p>Esta Política de Privacidade se aplica ao aplicativo ${APP_NAME}.</p>
    <p>${APP_NAME} coleta e usa apenas informações necessárias para autenticação, organização de vídeos, agendamento e publicação em plataformas conectadas pelo usuário.</p>

    <h2>1. Informações coletadas</h2>
    <p>Podemos armazenar informações necessárias para o funcionamento do aplicativo, como nome da conta cadastrada, status de postagem, configurações de agendamento, caminhos locais de arquivos e tokens de autorização das plataformas conectadas.</p>

    <h2>2. Como usamos as informações</h2>
    <p>Usamos essas informações para autenticar usuários, organizar postagens, enviar vídeos selecionados, consultar status de envio e exibir informações operacionais dentro do aplicativo.</p>

    <h2>3. Dados do TikTok</h2>
    <p>Quando o usuário conecta uma conta TikTok, o ${APP_NAME} utiliza tokens oficiais de autorização somente para executar ações permitidas pelo usuário, como identificar a conta conectada, enviar vídeos, consultar opções de publicação e publicar conteúdo quando autorizado.</p>

    <h2>4. Conteúdo do usuário</h2>
    <p>Vídeos, legendas, títulos, hashtags e arquivos de mídia continuam sendo responsabilidade do usuário. A ferramenta apenas organiza, processa ou envia esses arquivos conforme comandos e agendamentos configurados.</p>

    <h2>5. Armazenamento local</h2>
    <p>Algumas informações podem ser salvas localmente no computador do usuário, como sessões, tokens, arquivos de configuração, histórico de status e preferências de uso. Esses dados são usados para manter a conta conectada e executar as ações solicitadas pelo usuário.</p>

    <h2>6. Compartilhamento de dados</h2>
    <p>Não vendemos dados pessoais. Dados podem ser enviados para plataformas conectadas, como TikTok ou Instagram, somente quando necessário para executar ações solicitadas pelo usuário.</p>

    <h2>7. Segurança</h2>
    <p>Aplicamos medidas razoáveis para proteger as informações utilizadas pelo aplicativo, mas nenhum sistema é totalmente imune a falhas, acessos indevidos ou indisponibilidades.</p>

    <h2>8. Revogação de acesso</h2>
    <p>O usuário pode remover tokens locais, desconectar contas ou revogar permissões diretamente nas plataformas conectadas, incluindo as configurações da própria conta TikTok.</p>

    <h2>9. Alterações nesta política</h2>
    <p>Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente ficará disponível nesta página.</p>

    <h2>10. Contato</h2>
    <p>Para dúvidas sobre privacidade, entre em contato com o administrador do ${APP_NAME}.</p>
  `));
});

app.use((req, res) => {
  console.log("ROTA NÃO ENCONTRADA:", req.method, req.url);
  res.status(404).send("Rota não encontrada: " + req.url);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`${APP_NAME} legal pages running on port ${port}`);
});