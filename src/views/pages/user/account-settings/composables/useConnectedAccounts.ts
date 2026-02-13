import { reactive } from 'vue'
import { useMessage } from 'naive-ui'
import { markRaw } from 'vue'
import type { ConnectedAccount } from '../types'
import { CONNECTED_ACCOUNTS_DEFAULT, MESSAGES } from '../constants'
import {
  LogoGithub,
  LogoTwitter,
  LogoGoogle,
  LogoFacebook
} from '@vicons/ionicons5'

export function useConnectedAccounts() {
  const message = useMessage()
  
  // Connected Accounts State
  const connectedAccounts = reactive<ConnectedAccount[]>(
    CONNECTED_ACCOUNTS_DEFAULT.map(account => ({
      ...account,
      icon: {
        'GitHub': markRaw(LogoGithub),
        'Google': markRaw(LogoGoogle),
        'Twitter': markRaw(LogoTwitter),
        'Facebook': markRaw(LogoFacebook)
      }[account.platform] || markRaw(LogoGithub)
    }))
  )
  
  const toggleAccount = async (account: ConnectedAccount) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      account.connected = !account.connected
      
      const successMessage = account.connected 
        ? MESSAGES.ACCOUNT_CONNECTED 
        : MESSAGES.ACCOUNT_DISCONNECTED
      
      message.success(successMessage)
      
      // TODO: Make API call to connect/disconnect account
      // await toggleAccountConnection(account.platform, account.connected)
    } catch (error) {
      message.error(`Failed to ${account.connected ? 'connect' : 'disconnect'} ${account.platform}`)
      // TODO: Implement proper error logging service
      // logError('Account toggle failed', error)
    }
  }
  
  const addAccount = () => {
    // This would typically open a modal or redirect to OAuth flow
    message.info('Add account functionality would be implemented here')
  }
  
  const getConnectedCount = (): number => {
    return connectedAccounts.filter(account => account.connected).length
  }
  
  const getAccountByPlatform = (platform: string): ConnectedAccount | undefined => {
    return connectedAccounts.find(account => account.platform === platform)
  }
  
  return {
    connectedAccounts,
    toggleAccount,
    addAccount,
    getConnectedCount,
    getAccountByPlatform
  }
}
