import { Job } from '@/lib/jobsScanner.types';
import { APP_ROUTES } from '@/lib/routes';
import { createLocalDate } from '@/lib/utils';

import Link from 'next/link';
import React, { MouseEventHandler } from 'react';
import { MdTextSnippet } from 'react-icons/md';
import TrackButton from '../Buttons/TrackButton';
import Field from '../Field/Field';
const jobItemStyle = {
  item: 'flex flex-[100%] flex-col justify-between rounded-md bg-white p-4 shadow-lg sm:flex-[45%] md:flex-[30%] gap-2',
  content: 'flex gap-2 flex-col',
  dateContainer: 'flex flex-end',
  bookmarkContainer: 'flex w-full justify-end',
  bookmarkButton: 'text-base',
  buttonStatusContainer: 'flex justify-center mt-3',
  sendCVContainer: 'flex flex-end',
  linkTrackDetailsContainer: 'flex justify-center ',
  linkTrackDetails: 'button-custom bg-status-400 text-white text-sm  flex items-center gap-1'
};

function JobTrackingItem(
  props: Job & {
    index: number;
    handleClickBookmark: MouseEventHandler<HTMLButtonElement>;
    mark: boolean;
  }
) {
  const { link, title, jobID, index, mark, info } = props;
  const localDateStr = createLocalDate(info?.createdAt);
  return (
    <li className={jobItemStyle.item} key={jobID + index}>
      <div className={jobItemStyle.content}>
        <div className={jobItemStyle.bookmarkContainer}>
          <TrackButton onClick={props.handleClickBookmark} mark={mark} />
        </div>
        <div dir="rtl" className={jobItemStyle.dateContainer}>
          <Field value={localDateStr} titleStyle={'font-bold'} title="נוצר ב-" />
        </div>
        <div>
          <Link href={link}> {title}</Link>{' '}
        </div>
        {props.company && <div> {props.company}</div>}
      </div>
      <div className={jobItemStyle.linkTrackDetailsContainer}>
        <Link
          className={jobItemStyle.linkTrackDetails}
          href={`/${APP_ROUTES.JOBS_TRACKINGING_INFO(jobID)}`}
        >
          <MdTextSnippet /> הוסף פרטים
        </Link>
      </div>
    </li>
  );
}

export default JobTrackingItem;
