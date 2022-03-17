import { Button, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from '@material-ui/core'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJournal } from '../../actions/journal';

import { MyDialog } from '../Dialogs/Dialogs';


// BUDGET
export const Budget = ({submitEntry }) => {
    const [add, setAdd] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getJournal('budget'))
    }, [dispatch]);

    const budget = useSelector(state => state.journal.budget)


    const editForm = (
        <div>
            <TextField id='category' variant='outlined' label='Category' type='text' />
            <TextField id='item' variant='outlined' label='Item/Descr' type='text' />
            <TextField id='amount' variant='outlined' type='number' label='Amount' />       
        </div>
    );

    const actions = (
        <div>
            <Button onClick={e => {
                e.preventDefault();
                const entry = {
                    'category': document.getElementById('category').value,
                    'item': document.getElementById('item').value,
                    'amount': document.getElementById('amount').value,
                }
                submitEntry('budget', entry);
                setAdd(false);
            }} >Save</Button>
            <Button onClick={e => {
                setAdd(false)
            }}>CANCEL</Button>
        </div>
    );

    return (
        <div>
            <h3>
                Budget
                <Button onClick={() => setAdd(!add)}>{add ? 'Cancel' : 'Add'}</Button>
            </h3>
            <hr/>
            <hr />
            {add && <MyDialog open={add} title='Record Budget - Expenditure or Income' content={editForm} actions={actions} />}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell>
                            Category
                            <TableSortLabel />
                        </TableCell>
                        <TableCell>
                            Item
                            <TableSortLabel />
                        </TableCell>
                        <TableCell>
                            Amount
                            <TableSortLabel />
                        </TableCell>
                    </TableHead>
                    <TableBody>
                        {budget?.map(budget =>
                            <TableRow key={budget.id}>
                                <TableCell>
                                    {budget.category}
                                </TableCell>
                                <TableCell>
                                    {budget.item}
                                </TableCell>
                                <TableCell>
                                    {budget.amount}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TablePagination  defaultValue={10} />
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
};