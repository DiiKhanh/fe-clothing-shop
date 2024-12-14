import React, { PropsWithChildren, ReactElement, useEffect, useImperativeHandle, useState } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/auth';

export type Ref = {
  getSelectedGender: () => string;
};

const GenderRadioButtonsGroup = React.forwardRef<Ref, PropsWithChildren>(
  function GenderRadioButtonsGroup(props, ref): ReactElement {
    const currentUser = useSelector(selectCurrentUser);
    const [selectedGender, setSelectedGender] = useState(currentUser?.gender || 'Nam');

    useEffect(() => {
      if (currentUser?.gender) {
        setSelectedGender(currentUser.gender);
      }
    }, [currentUser?.gender]);

    useImperativeHandle(ref, () => ({
      getSelectedGender: () => {
        return selectedGender;
      },
    }));

    return (
      <FormControl>
        <FormLabel>Giới tính</FormLabel>
        <RadioGroup value={selectedGender} row onChange={(e) => setSelectedGender(e.target.value)}>
          <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
          <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
          <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
        </RadioGroup>
      </FormControl>
    );
  },
);

export default GenderRadioButtonsGroup;
