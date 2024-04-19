import { render, screen, waitFor } from '@testing-library/react';
import { AccountsTable } from '../components/accounts-table';
import * as fetchUtil from '../util/helper'
import { toBeVisible } from '@testing-library/jest-dom/matchers';



describe('test the user accounts table', () => {
    const spy = jest.spyOn(fetchUtil, 'fetchAccountData')
    const mockResponse = require('./mocks/accounts-table-mock.json');

    beforeEach(() => {
        spy.mockImplementation((url, path, setData, setLoading) => {
            setLoading(false)
            setData(mockResponse)
            return null
        });
    })
    test('renders the accounts table', async () => {
        render(<AccountsTable link='mockLink' />);
        expect(spy).toHaveBeenCalledWith('mockLink', 'accounts-overview', expect.anything(), expect.anything());
        await Promise.resolve()
        await waitFor(() => {
            screen.getByText('Tus cuentas')
        });
        expect(screen.getByRole('columnheader',{name:'Cuenta'})).toBeVisible();
        expect(screen.getByRole('columnheader',{name:'Balance'})).toBeVisible();
        expect(screen.getByRole('columnheader',{name:'id. del Banco'})).toBeVisible();
        expect(screen.getByRole('rowheader',{name:'Tarjeta Plata'})).toBeVisible();
        expect(screen.getByRole('rowheader',{name:'81036.08'})).toBeVisible();
        expect(screen.getByRole('rowheader',{name:'Tarjeta Platino'})).toBeVisible();
    });

});