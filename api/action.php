<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');

include "db_config.php";
$postjson = json_decode(file_get_contents('php://input'), true);
$aksi = strip_tags($postjson['aksi']);
$data = array();

switch($aksi)
{
    case "addregister":
        $nama = strip_tags($postjson['nama']);
        $nik = strip_tags($postjson['nik']);
        $alamat = strip_tags($postjson['alamat']);
        $noHp = strip_tags($postjson['noHp']);
        $dokteryangbertugas = strip_tags($postjson['dokteryangbertugas']);
        $jenislayanan = strip_tags($postjson['jenislayanan']);
        $ruangRawat = strip_tags($postjson['ruangRawat']);

        try {
            $sql = "INSERT INTO RegistrasiPasien (nama, nik, alamat, noHp, dokteryangbertugas, jenislayanan, ruangRawat) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$nama, $nik, $alamat, $noHp, $dokteryangbertugas, $jenislayanan, $ruangRawat]);

            echo json_encode(array('success' => true, 'msg' => 'Registrasi berhasil'));
        } catch (PDOException $e) {
            echo json_encode(array('success' => false, 'msg' => $e->getMessage()));
        }
        break;  

    case "getdata":
        $limit = isset($postjson['limit']) ? (int)$postjson['limit'] : 10;
        $start = isset($postjson['start']) ? (int)$postjson['start'] : 0;

        try {
            $sql = "SELECT nama, nik, alamat, noHp, dokteryangbertugas, jenislayanan, ruangRawat FROM RegistrasiPasien LIMIT :start, :limit";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':start', $start, PDO::PARAM_INT);
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(array('success' => true, 'result' => $rows));
        } catch (PDOException $e) {
            echo json_encode(array('success' => false, 'msg' => $e->getMessage()));
        }
        break;

    default:
        echo json_encode(array('success' => false, 'msg' => 'Aksi tidak dikenali'));
        break;
}
