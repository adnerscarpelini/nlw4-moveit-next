import styles from '../styles/components/Profile.module.css';

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/adnerscarpelini.png" alt="Adner Giovanni Scarpelini" />
            <div>
                <strong>Adner Scarpelini</strong>
                <p>
                    {/* Tudo que está na pasta public ele ja sabe que é publico, então não precisa passar a pasta */}
                    <img src="icons/level.svg" alt="Nível" />
                    Level 1
               </p>
            </div>
        </div>
    );
}