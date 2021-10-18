import { useState } from 'react'
import styles from './SearchBar.module.css'
import { ImSearch } from 'react-icons/im'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Searchbar({onSubmit}) {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearchChange = e => setSearchQuery(e.currentTarget.value.trim())
    
    const handleSubmit = e => {
        e.preventDefault()
        
        if (searchQuery === '') {
            toast.error('Empty request')
            return
        }
        onSubmit(searchQuery)
        setSearchQuery('')
    }

    return (
        <header className={styles.searchbar}>
        <form className={styles.searchForm}
            onSubmit={handleSubmit}
        >
            <input
            type='text'
            name='searchbar'
            autoComplete="off"
            autoFocus
            onChange={handleSearchChange}
            value={searchQuery}
            className={styles.input}
            placeholder='Set your location'
            />
            <button type="submit" className={styles.button}>
            <span className={styles.label} aria-label='Search'><ImSearch />
            </span>
            </button>
        </form>
    </header>
    )
}