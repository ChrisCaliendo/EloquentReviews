import { useContext } from 'react'
import { SettingsContext } from '../Contexts/SettingsContext'

export const useSettingsContext = () => {
  const context = useContext(SettingsContext)

  if (!context) {
    throw Error('useSettingsContext must be used inside an SettingsContextProvider')
  }

  return context
}