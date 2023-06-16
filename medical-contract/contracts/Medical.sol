// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Medical  {

    struct MedicalRecord {
        string medicalRecordId;
        string nama;
        string asuransi;
        string tempatlahir;
        uint256 tanggallahir;
        string nomortelpon;
        string poliklinik;
        uint256 tanggalberobat;
        string jk;
        string dokter;
        string diagnose;
    }

    mapping(uint256 => MedicalRecord) public records;

    uint256 public numberOfRecords;

    function addMedicalRecord(string memory _medicalRecordId, string memory _nama, string memory _asuransi, string memory _tempatlahir, uint256 _tanggallahir, string memory _nomortelpon, string memory _poliklinik, uint256 _tanggalberobat, string memory _jk, string memory _dokter, string memory _diagnosa) public returns(uint256) {
        MedicalRecord storage medicalrecord = records[numberOfRecords];

        medicalrecord.medicalRecordId = _medicalRecordId;
        medicalrecord.nama = _nama;
        medicalrecord.asuransi = _asuransi;
        medicalrecord.tempatlahir = _tempatlahir;
        medicalrecord.tanggallahir = _tanggallahir;
        medicalrecord.nomortelpon = _nomortelpon;
        medicalrecord.poliklinik = _poliklinik;
        medicalrecord.tanggalberobat = _tanggalberobat;
        medicalrecord.jk = _jk;
        medicalrecord.dokter = _dokter;
        medicalrecord.diagnose = _diagnosa;

        numberOfRecords++;
        return numberOfRecords - 1;
    }

    function getMedicalRecords() view public returns (MedicalRecord[] memory) {
        MedicalRecord[] memory allRecords = new MedicalRecord[](numberOfRecords);

        for (uint i = 0; i < numberOfRecords ; i++) {
            MedicalRecord storage item = records[i];

            allRecords[i] = item;
        }

        return allRecords;
    }
}