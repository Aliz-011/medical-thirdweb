import { useContract, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { createContext, useContext, useState } from 'react';

const MedicalContext = createContext();

export const MedicalContextProvider = ({ children }) => {
  const { contract } = useContract(
    '0x388f2AEDcdA3A4b362424df5729a8A51c1A079A7'
  );

  const { mutateAsync: addMedicalRecord } = useContractWrite(
    contract,
    'addMedicalRecord'
  );

  const addPatient = async (form) => {
    try {
      const data = await addMedicalRecord([
        form.medicalRecordId,
        form.nama,
        form.asuransi,
        form.tempatLahir,
        new Date(form.tanggalLahir).getTime(),
        form.nomorTelpon,
        form.poliklinik,
        new Date(form.tanggalBerobat).getTime(),
        form.jk,
        form.dokter,
        form.diagnosa,
      ]);

      console.log('success', data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MedicalContext.Provider value={{ contract, addMedicalRecord: addPatient }}>
      {children}
    </MedicalContext.Provider>
  );
};

export const useMedicalContext = () => useContext(MedicalContext);
