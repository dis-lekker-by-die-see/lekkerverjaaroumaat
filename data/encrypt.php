<?php
// encrypt.php
function encryptData($password, $dataFile, $outputFile) {
    $data = json_encode($dataFile);
    $salt = random_bytes(16);
    $key = hash_pbkdf2("sha256", $password, $salt, 100000, 32, true);

    $iv = random_bytes(16);
    $ciphertext = openssl_encrypt($data, "aes-256-gcm", $key, OPENSSL_RAW_DATA, $iv, $tag);

    // Save salt, IV, and ciphertext
    $encryptedData = [
        'salt' => base64_encode($salt),
        'iv' => base64_encode($iv),
        'ciphertext' => base64_encode($ciphertext),
        'tag' => base64_encode($tag),
    ];
    file_put_contents($outputFile, json_encode($encryptedData));
}

// Sample data to encrypt, with "TOB" included
$data = [
    ["name" => "Alice", "DOB" => "1990-05-20", "TOB" => "21:59"],
    ["name" => "Bob", "DOB" => "1985-12-15", "TOB" => "03:59"],
    ["name" => "Charlie", "DOB" => "2000-01-30", "TOB" => "12:05"]
];

$password = "MySecurePassword123";
encryptData($password, $data, "data/data.json.enc");
