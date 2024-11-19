<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $password = $input['password'];

    $encryptedData = json_decode(file_get_contents('data/data.json.enc'), true);

    $salt = base64_decode($encryptedData['salt']);
    $iv = base64_decode($encryptedData['iv']);
    $ciphertext = base64_decode($encryptedData['ciphertext']);
    $tag = base64_decode($encryptedData['tag']);

    $key = hash_pbkdf2("sha256", $password, $salt, 100000, 32, true);

    $decryptedData = openssl_decrypt($ciphertext, "aes-256-gcm", $key, OPENSSL_RAW_DATA, $iv, $tag);

    if ($decryptedData === false) {
        http_response_code(403);
        echo json_encode(["error" => "Invalid password"]);
        exit;
    }

    echo $decryptedData;
}
