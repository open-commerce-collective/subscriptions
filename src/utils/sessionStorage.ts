let sessionToken: string | null = null
let shopName: string | null = null

export const setSessionToken = (token: string) => {
	sessionToken = token
}

export const getSessionToken = () => sessionToken

export const clearSessionToken = () => {
	sessionToken = null
}

export const setShopName = (shop: string) => {
	shopName = shop
}

export const getShopName = () => shopName
