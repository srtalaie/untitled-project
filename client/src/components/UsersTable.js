import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const UsersTable = () => {
  const users = useSelector((state) => state.users)

  return (
    <Grid container direction={'column'}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>user</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell><Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>{user.name}</Link></TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default UsersTable