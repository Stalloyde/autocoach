import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { InputStateContext } from '../App';

export function customRender(ui, { providerProps, ...renderOptions }) {
    return render(
        <MemoryRouter>
            <InputStateContext.Provider value={providerProps}>
                {ui}
            </InputStateContext.Provider>
        </MemoryRouter>,
        renderOptions
    );
}
