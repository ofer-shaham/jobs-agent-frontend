import { API_ENDPOINTS, SERVER_URL } from '@/lib/endpoints';
import { UserOptions } from '@/lib/types/api.types';

import { useSession } from 'next-auth/react';

import React, { MouseEventHandler, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { MdOutlineDataSaverOff } from 'react-icons/md';
import Spinner from '../Spinner/Spinner';
const buttonsStyle = {
  buttonsContainer: 'mt-3 flex justify-between',
  load: 'button-custom flex items-center justify-between gap-2 bg-loading-500 hover:bg-loading-400 disabled:bg-loading-600  text-xl text-text-secondary',
  download:
    'button-custom bg-success-secondary flex items-center justify-between gap-2 disabled:bg-success-primary-600 bg-success-secondary-500 text-xl text-text-secondary hover:bg-success-secondary-400'
};
function ScannerControlButtons({ user }: { user: UserOptions }) {
  // Let the user decide if he wants the current query result or all the results that the scanner scan until now base the user queries.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeQuery, setActiveQuery] = useState(true);

  const session = useSession();

  const createScannerURL = (endpoint: string) =>
    `${SERVER_URL}/${endpoint}/${user.userID}?activeQuery=${activeQuery}`;

  //Initialize loading scanner fetcher.
  const scanner = useSWRMutation(createScannerURL(API_ENDPOINTS.SCANNER_START), (url: string) =>
    fetch(url).then((res) => res.json())
  );

  //Initialize downloads fetcher.
  const download = useSWRMutation(createScannerURL(API_ENDPOINTS.SCANNER_DOWNLOAD), (url: string) =>
    fetch(url).then((res) => res.blob())
  );

  // Handles the Load button click event.
  const handleLoadButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      await scanner.trigger();
      console.log(scanner.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Attaches the blob result to link element.
  const downloadFile = (blob: Blob, name?: string | null) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name?.replace('.', '-') || ''}-jobs.csv`;
    a.click();
  };

  // Handles the download button click event.
  const handleDownloadButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const blob = await download.trigger();
    if (!blob) return;
    downloadFile(blob, session.data?.user.name);
  };

  return (
    <div className={buttonsStyle.buttonsContainer}>
      <button disabled={scanner.isMutating} className={buttonsStyle.load} onClick={handleLoadButton}>
        טען משרות <MdOutlineDataSaverOff />
      </button>
      <button
        disabled={scanner.isMutating}
        className={buttonsStyle.download}
        onClick={handleDownloadButton}
      >
        הורדה <FaCloudDownloadAlt />
      </button>
      <Spinner isLoading={scanner.isMutating} />
    </div>
  );
}

export default ScannerControlButtons;
{
  /* <button className="bg-blue-300" onClick={() => setActiveQuery((pre) => !pre)}>
        {activeQuery ? 'בטל' : 'הפעל'} חיפוש לפי חיפוש אחרון
      </button> */
}
