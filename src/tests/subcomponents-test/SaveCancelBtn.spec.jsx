import { screen, fireEvent } from '@testing-library/react';
import { customRender } from '../test.utils';
import SaveCancelBtn from '../../sub-components/SaveCancelBtn';
import { beforeEach, describe } from 'vitest';

describe('SaveCancelButtons', () => {
    const mockSetAddingToFavourites = vi.fn();
    const mockHandleOverwriteFavourites = vi.fn();
    let providerProps = {};

    beforeEach(() => {
        providerProps = {
            setAddingToFavourites: mockSetAddingToFavourites,
            handleOverWriteFavourites: mockHandleOverwriteFavourites,
        };

        vi.clearAllMocks();
    });

    it('Overwrite Favourite save button renders and works correctly', () => {
        customRender(
            <SaveCancelBtn
                type="save"
                setAddingToFavourites={null}
                handleOverWriteFavourites={mockHandleOverwriteFavourites}
            />,
            { providerProps }
        );

        expect(
            screen.getByRole('button', { name: 'Save' })
        ).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Save' }));
        expect(mockHandleOverwriteFavourites).toHaveBeenCalled();
    });

    it('Default save button renders correctly', () => {
        customRender(
            <SaveCancelBtn
                type="save"
                setAddingToFavourites={null}
                handleOverWriteFavourites={null}
            />,
            { providerProps }
        );

        expect(
            screen.getByRole('button', { name: 'Save' })
        ).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Save' }));
        expect(mockSetAddingToFavourites).not.toHaveBeenCalled();
        expect(mockHandleOverwriteFavourites).not.toHaveBeenCalled();
    });

    it('Cancel button renders and works correctly', () => {
        customRender(
            <SaveCancelBtn
                setAddingToFavourites={mockSetAddingToFavourites}
                handleOverWriteFavourites={null}
            />,
            { providerProps }
        );

        expect(
            screen.getByRole('button', { name: 'Cancel' })
        ).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
        expect(mockSetAddingToFavourites).toHaveBeenCalledWith(false);
    });
});
