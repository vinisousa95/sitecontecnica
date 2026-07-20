<?php
/**
 * Contécnica — Construções e Reformas
 * Processador do formulário de contato (compatível com hospedagem Locaweb).
 *
 * Usa a função nativa mail() do PHP, suportada pela Locaweb.
 * Responde em JSON quando chamado via AJAX e faz redirect quando via POST comum.
 *
 * >> AJUSTE a variável $para abaixo para o e-mail que deve receber os contatos.
 */

// ------------------------------------------------------------------
// CONFIGURAÇÕES
// ------------------------------------------------------------------
$para        = 'contecnica@contecnica.net';   // e-mail que recebe as mensagens
$assunto_pre = 'Novo contato pelo site';       // prefixo do assunto
// Remetente: em hospedagem compartilhada, use um e-mail do próprio domínio.
$remetente   = 'no-reply@contecnica.net';
// ------------------------------------------------------------------

header('X-Content-Type-Options: nosniff');

$ehAjax = (
    isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&
    strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest'
);

/**
 * Responde ao cliente e encerra.
 */
function responder($ok, $mensagem, $ehAjax) {
    if ($ehAjax) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(array('ok' => $ok, 'message' => $mensagem));
    } else {
        $status = $ok ? 'sucesso' : 'erro';
        header('Location: obrigado.html?status=' . $status);
    }
    exit;
}

// Apenas POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(false, 'Método não permitido.', $ehAjax);
}

// ------------------------------------------------------------------
// Anti-spam (honeypot): campo "website" deve vir vazio
// ------------------------------------------------------------------
if (!empty($_POST['website'])) {
    // Provável bot — finge sucesso para não dar pistas.
    responder(true, 'Mensagem enviada com sucesso!', $ehAjax);
}

// ------------------------------------------------------------------
// Coleta e sanitização
// ------------------------------------------------------------------
function limpar($v) {
    return trim(str_replace(array("\r", "\n", "%0a", "%0d"), ' ', (string) $v));
}

$nome     = limpar(isset($_POST['nome']) ? $_POST['nome'] : '');
$telefone = limpar(isset($_POST['telefone']) ? $_POST['telefone'] : '');
$email    = limpar(isset($_POST['email']) ? $_POST['email'] : '');
$mensagem = trim(isset($_POST['mensagem']) ? $_POST['mensagem'] : '');

// ------------------------------------------------------------------
// Validação
// ------------------------------------------------------------------
$erros = array();
if ($nome === '' || mb_strlen($nome) < 2)        $erros[] = 'nome';
if ($telefone === '' || mb_strlen($telefone) < 8) $erros[] = 'telefone';
if ($mensagem === '' || mb_strlen($mensagem) < 5) $erros[] = 'mensagem';
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $erros[] = 'email';

if (!empty($erros)) {
    responder(false, 'Verifique os campos: ' . implode(', ', $erros) . '.', $ehAjax);
}

// ------------------------------------------------------------------
// Monta e envia o e-mail
// ------------------------------------------------------------------
$assunto = $assunto_pre . ' — ' . $nome;

$corpo  = "Você recebeu um novo contato pelo site da Contécnica:\n\n";
$corpo .= "Nome:      " . $nome . "\n";
$corpo .= "Telefone:  " . $telefone . "\n";
$corpo .= "E-mail:    " . ($email !== '' ? $email : '(não informado)') . "\n";
$corpo .= "Data/hora: " . date('d/m/Y H:i') . "\n";
$corpo .= "IP:        " . (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '-') . "\n";
$corpo .= "\nMensagem:\n" . $mensagem . "\n";

$headers  = 'From: Site Contécnica <' . $remetente . ">\r\n";
if ($email !== '') {
    $headers .= 'Reply-To: ' . $nome . ' <' . $email . ">\r\n";
}
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$enviado = @mail($para, '=?UTF-8?B?' . base64_encode($assunto) . '?=', $corpo, $headers);

if ($enviado) {
    responder(true, 'Mensagem enviada com sucesso! Em breve entraremos em contato.', $ehAjax);
} else {
    responder(false, 'Não foi possível enviar a mensagem. Tente novamente ou fale pelo WhatsApp.', $ehAjax);
}
