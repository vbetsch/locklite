import UserItem from "@ui/components/users/atoms/UserItem";
import {UserDto} from "@shared/dto/user.dto";

type UsersListProps = {
    users: UserDto[]
}

export default function UsersList(props: UsersListProps) {
    return (
        <ul>
            {props.users.map((user, index) => (
                <UserItem key={index} user={user}/>
            ))}
        </ul>
    )
}
