import styles from './page.module.css'

export default function HelloWorldPage() {
    return (
        <div className={styles.container}>
            <h1>Hello world!</h1>
            <p>Here we display the list of users: </p>
            <ul>
              <li>example</li>
              <li>foo</li>
              <li>bar</li>
            </ul>
        </div>
    )
}
