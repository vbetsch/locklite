'use client'
import styles from './page.module.css'
import {useEffect, useState} from 'react';
import Title from "@ui/components/common/atoms/Title";
import UsersList from "@ui/components/users/molecules/UsersList";
import {RequestService} from "@ui/services/requestService";
import {UserDto} from "@shared/dto/user.dto";

export default function HelloWorldPage() {
    const [users, setUsers] = useState<string[]>([])

    useEffect(() => {
        void (async () => {
            try {
                const data: UserDto[] = await RequestService.get<UserDto[]>('/api/users')
                setUsers(data.map(user => user.email))
            } catch (error) {
                console.error('Error:', error)
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
