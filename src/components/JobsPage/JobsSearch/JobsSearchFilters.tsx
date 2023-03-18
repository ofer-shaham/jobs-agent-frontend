import React from 'react';
import Autocomplete from '@/components/Inputs/Autocomplete/Autocomplete';

import { FacetFilterResults } from '@/lib/types/jobsScanner.types';
import { IconButtonProps } from '@/components/Inputs/InputLabel/inputLabel.types';

import { createAutocompletePropsArr } from './utils';
import FiltersPopup from '@/components/SearchInput/FiltersPopup';
import { ReturnUseFilterJobsProps } from '@/hooks/useFiltersHooks/useFilterJobs';

export const JobsSearchFiltersStyle = {
  autocompleteList: 'flex flex-col gap-2',
  autocompleteWrapper: 'relative flex flex-col gap-1',
  autocompleteLabel: 'self-end',
  popupInputIcon: 'text-blue-300 absolute  text-xl top-[53%] right-1'
};

interface JobsSearchFiltersProps {
  iconButtonProps: IconButtonProps;
  filterJobsProps: ReturnUseFilterJobsProps;
  jobsFilters: FacetFilterResults;
  includeReasonFilters: boolean;
}

function JobsSearchFilters({
  iconButtonProps,
  filterJobsProps,
  jobsFilters,
  includeReasonFilters
}: JobsSearchFiltersProps) {
  const { handleSetFilterValue } = filterJobsProps;
  const autocompletePropsArr = createAutocompletePropsArr(jobsFilters);

  return (
    <FiltersPopup>
      <ul className={JobsSearchFiltersStyle.autocompleteList}>
        {autocompletePropsArr.map(({ key, label, options }, i) => {
          //If it is match page, the reason filter will be empty.
          if (i === 0 && !includeReasonFilters) return <li key={key + i}></li>;

          const value = filterJobsProps.formValues[key];

          return (
            <li key={i + key + Date.now()}>
              <Autocomplete
                defaultValue={value}
                label={label}
                setValue={handleSetFilterValue(key)}
                options={options}
                inputLabelProps={{
                  wrapperInputLabel: {
                    className: JobsSearchFiltersStyle.autocompleteWrapper
                  },
                  labelProps: {
                    className: JobsSearchFiltersStyle.autocompleteLabel
                  },
                  IconButtonProps: {
                    ...iconButtonProps,
                    buttonProps: {
                      className: JobsSearchFiltersStyle.popupInputIcon
                    }
                  }
                }}
              />
            </li>
          );
        })}
      </ul>
    </FiltersPopup>
  );
}

export default JobsSearchFilters;
