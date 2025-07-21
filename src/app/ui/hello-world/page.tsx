'use client'
import styles from './page.module.css'
import {useEffect, useState} from 'react';
import Title from "@ui/components/common/atoms/Title";
import UsersList from "@ui/components/users/molecules/UsersList";
import {UserModelDto} from "@shared/dto/models/user.model.dto";
import {UserGateway} from "@ui/gateways/user.gateway";
import {GetAllUsersResponseDto} from "@shared/dto/responses/get-all-users.response.dto";

export default function HelloWorldPage() {
    const [users, setUsers] = useState<UserModelDto[]>([])

    useEffect(() => {
        void (async () => {
            try {
                const data: GetAllUsersResponseDto = await UserGateway.getAll();
                setUsers(data.users);
            } catch (error) {
                console.error('Error while get all users: ', error);
            }
        })()
    }, [])

    return (
        <div className={styles.container}>
            <Title label="Hello world!"/>
            <p>Here we display the list of users: </p>
            <UsersList users={users}/>
        </div>
    )
}
