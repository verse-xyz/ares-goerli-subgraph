import { log, BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { Token, User } from "../../generated/schema"

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const FACTORY_ADDRESS = '0x6cb65249ca0309E79797e2955D20f958Fab6E658'

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

export function setUser(userAddress: Address): void {
  let user = User.load(userAddress.toHexString())
  if (user === null) {
    user = new User(userAddress.toHexString())
    user.save()
  }
}