import {Autocomplete, TextField} from '@mui/material';
import React, {useEffect, useRef} from 'react';

type Props = {
    dataArray: string[];
    id: string;
    label?: string,
    shouldFocus?: boolean,
    onSelectValue: (value: string) => void;
};

export const CustomAutocomplete: React.FC<Props> = ({
                                                        dataArray,
                                                        id,
                                                        onSelectValue,
                                                        label, shouldFocus
                                                    }) => {
    const handleSelect = (e: React.SyntheticEvent, val: string | null) => {
        if (val) {
            onSelectValue(val);
        }
    }

    return (
        <Autocomplete
            disablePortal
            id={id}
            options={dataArray}
            sx={{
                width: '100%',
            }}
            onChange={handleSelect}
            disableClearable
            forcePopupIcon={false}
            renderInput={(params) => (
                <TextField
                    inputRef={input => shouldFocus && input && input.focus()}
                    {...params}
                    placeholder={label}
                    size="small"
                    hiddenLabel
                    sx={{
                        border: '1px solid #ECF5ED',
                        borderRadius: '8px',
                        '& fieldset': {
                            border: 'none',
                        },
                        '& input': {
                            padding: '0 5px',
                            fontSize: '14px',
                            color: '#61463a',
                            backgroundColor: '#fff',

                            '&::placeholder': {
                                color: '#61b766',
                            }
                        },
                        '& .MuiOutlinedInput-root': {
                            padding: 0,
                        },
                        '& .MuiFormLabel-filled': {
                            color: 'rgba(0, 0, 0, 0.6)',
                        },
                    }}
                />
            )}
        />
    );
};
