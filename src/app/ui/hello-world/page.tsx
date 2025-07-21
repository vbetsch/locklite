'use client'
import styles from './page.module.css'
import {useState} from 'react';
import Title from "@ui/components/common/atoms/Title";
import UsersList from "@ui/components/users/molecules/UsersList";
import {UserModelDto} from "@shared/dto/models/user.model.dto";
import {UserGateway} from "@ui/gateways/user.gateway";
import {GetAllUsersResponseDto} from "@shared/dto/responses/get-all-users.response.dto";
import {useApi} from "@ui/hooks/useApi";

export default function HelloWorldPage() {
    const [users, setUsers] = useState<UserModelDto[]>([])
    const [error, setError] = useState<string | null>(null)

    useApi<GetAllUsersResponseDto>({
        request: UserGateway.getAll,
        onSuccess: (data) => setUsers(data.users),
        onError: (error) => setError(error.message),
    })

    return (
        <div className={styles.container}>
            <Title label="Hello world!"/>
            <p>Here we display the list of users: </p>
            {error && <span className="error">{error}</span>}
            <UsersList users={users}/>
        </div>
    )
}
