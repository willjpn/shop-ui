import {Fragment} from "react";
import {deleteUser} from "../actions/userActions";

const UserTable = ({users, dispatch, history}) => {

    const removeUser = (id) => {
        dispatch(deleteUser(id))
    }

    const updateUser = (id) => {
        history.push(`/user/edit/${id}`)
    }

    return (
        <Fragment>
            {!users.length ? <h2>No users have been created...</h2> :
                <table style={{minWidth: 650}} aria-label="simple table">
                    <thead>
                    <tr>
                        <th align="left">Name</th>
                        <th align="left">Admin</th>
                        <th align="left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                {user.firstName} {user.lastName}
                            </td>
                            <td>
                                {user.isAdmin ? "Yes" : "No"}
                            </td>
                            <td>
                                <button onClick={() => updateUser(user._id)}>
                                    Edit
                                </button>
                                <button onClick={() => removeUser(user._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>}

        </Fragment>


    )
}

export default UserTable
