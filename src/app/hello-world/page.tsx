'use client'
import styles from './page.module.css'
import Title from "@/components/Title";
import UsersList from "@/components/UsersList";
import { useState } from 'react';

export default function HelloWorldPage() {
    const [users, ] = useState<string[]>(['example', 'foo', 'nar'])

    return (
        <div className={styles.container}>
            <Title label="Hello world!"/>
            <p>Here we display the list of users: </p>
            <UsersList users={users}/>
        </div>
    )
}
