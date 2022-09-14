interface Window {
  ethereum?: {
    isMetaMask?: true
    on?: (...args: any[]) => void
    chainId?: string
    removeListener?: (...args: any[]) => void
    request: any
    providers: any
    setSelectedProvider: any
  }
}
