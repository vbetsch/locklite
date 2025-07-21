import {UserDto} from "@shared/dto/user.dto";

type UserItemProps = {
    user: UserDto
}

export default function UserItem(props: UserItemProps) {
    return (
        <li>{props.user.email}</li>
    )
}
