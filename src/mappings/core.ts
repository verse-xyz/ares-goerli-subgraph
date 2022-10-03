import { log } from '@graphprotocol/graph-ts'
import {
  Factory,
  Token,
  User,
  Image,
  ImagePosition,
  Knit as KnitEvent,
  Mirror as MirrorEvent,
  Burn as BurnEvent,
} from '../../generated/schema'

import { Knitted, Mirrored, Burned, Token as TokenContract } from '../../generated/templates/Token/Token'
import { FACTORY_ADDRESS, setUser, ONE_BI } from './helpers'

// knit events
export function handleKnit(event: Knitted): void {
  // get token object from schema
  let token = Token.load(event.address.toHexString())
  if (token === null) {
    log.error('Token is null', [event.address.toHexString()])
    throw new Error('Token is null')
  }

  // get factory object from schema
  let hyperimageFactory = Factory.load(FACTORY_ADDRESS)
  if (hyperimageFactory === null) {
    log.error('Factory is null', [event.address.toHexString()])
    throw new Error("Factory is null")
  }

  // get user object from schema
  let user = User.load(event.params.creator.toHexString())
  if (user === null) {
    user = new User(event.params.creator.toHexString())
    user.save()
  }

  // get token contract from on-chain
  let tokenContract = TokenContract.bind(event.address)
  // update knit event
  let knit = new KnitEvent(event.transaction.hash.toHexString())
  knit.blockNumber = event.block.number
  knit.timestamp = event.block.timestamp
  knit.token = token.id
  knit.tokenId = event.params.tokenId
  knit.user = user.id
  knit.imageHash = event.params.imageHash
  knit.imageURI = event.params.imageURI
  knit.price = event.params.price
  knit.save()

  // update image based on event
  let imageId = event.params.imageHash.toHexString()
  let image = Image.load(imageId)
  if (image === null) {
    image = new Image(imageId)
    image.token = token.id
    image.creator = user.id
    image.imageURI = event.params.imageURI
    image.timestamp = event.block.timestamp
    image.provenanceCount.plus(ONE_BI)
    image.save()
  } else {
    image.provenanceCount.plus(ONE_BI)
    image.save()
  }

  // update image position based on event
  let imagePositionId = imageId.concat('-').concat(user.id).concat('-').concat(token.id).concat('-').concat(event.params.tokenId.toHexString())
  let imagePosition = ImagePosition.load(imagePositionId)
  if (imagePosition === null) {
    imagePosition = new ImagePosition(imagePositionId)
    imagePosition.image = image.id
    imagePosition.token = token.id
    imagePosition.tokenId = event.params.tokenId
    imagePosition.user = user.id
    imagePosition.timestamp = event.block.timestamp
    imagePosition.active = true
    imagePosition.save()
  } else {
    imagePosition.active = true
    imagePosition.save()
  }
}

// mirror events
export function handleMirror(event: Mirrored): void {
  // get token object from schema
  let token = Token.load(event.address.toHexString())
  if (token === null) {
    log.error('Token is null', [event.address.toHexString()])
    throw new Error('Token is null')
  }

  // get factory object from schema
  let hyperimageFactory = Factory.load(FACTORY_ADDRESS)
  if (hyperimageFactory === null) {
    log.error('Factory is null', [event.address.toHexString()])
    throw new Error("Factory is null")
  }

  // get user object from schema
  let user = User.load(event.params.mirrorer.toHexString())
  if (user === null) {
    user = new User(event.params.mirrorer.toHexString())
    user.save()
  }

  // get token contract from on-chain
  let tokenContract = TokenContract.bind(event.address)
  // update mirror event
  let mirror = new MirrorEvent(event.transaction.hash.toHexString())
  mirror.blockNumber = event.block.number
  mirror.timestamp = event.block.timestamp
  mirror.token = token.id
  mirror.tokenId = event.params.tokenId
  mirror.user = user.id
  mirror.imageHash = event.params.imageHash
  mirror.imageURI = event.params.imageURI
  mirror.price = event.params.price
  mirror.save()

  // update image based on event
  let imageId = event.params.imageHash.toHexString()
  let image = Image.load(imageId)
  if (image === null) {
    image = new Image(imageId)
    image.token = token.id
    image.creator = user.id
    image.imageURI = event.params.imageURI
    image.timestamp = event.block.timestamp
    image.provenanceCount.plus(ONE_BI)
    image.save()
  } else {
    image.provenanceCount.plus(ONE_BI)
    image.save()
  }

  // update image position based on event
  let imagePositionId = imageId.concat('-').concat(user.id).concat('-').concat(token.id).concat('-').concat(event.params.tokenId.toHexString())
  let imagePosition = ImagePosition.load(imagePositionId)
  if (imagePosition === null) {
    imagePosition = new ImagePosition(imagePositionId)
    imagePosition.image = image.id
    imagePosition.token = token.id
    imagePosition.tokenId = event.params.tokenId
    imagePosition.user = user.id
    imagePosition.timestamp = event.block.timestamp
    imagePosition.active = true
    imagePosition.save()
  } else {
    imagePosition.active = true
    imagePosition.save()
  }
}

// burn events
export function handleBurn(event: Burned): void {
  // get token object from schema
  let token = Token.load(event.address.toHexString())
  if (token === null) {
    log.error('Token is null', [event.address.toHexString()])
    throw new Error('Token is null')
  }

  // get factory object from schema
  let hyperimageFactory = Factory.load(FACTORY_ADDRESS)
  if (hyperimageFactory === null) {
    log.error('Factory is null', [event.address.toHexString()])
    throw new Error("Factory is null")
  }

  // get user object from schema
  let user = User.load(event.params.burner.toHexString())
  if (user === null) {
    user = new User(event.params.burner.toHexString())
    user.save()
  }

  // get token contract from on-chain
  let tokenContract = TokenContract.bind(event.address)
  // update knit event
  let burn = new BurnEvent(event.transaction.hash.toHexString())
  burn.blockNumber = event.block.number
  burn.timestamp = event.block.timestamp
  burn.token = token.id
  burn.tokenId = event.params.tokenId
  burn.user = user.id
  burn.imageHash = event.params.imageHash
  burn.imageURI = event.params.imageURI
  burn.price = event.params.price
  burn.save()

  // update image based on event
  let imageId = event.params.imageHash.toHexString()
  let image = Image.load(imageId)
  if (image === null) {
    image = new Image(imageId)
    image.token = token.id
    image.creator = user.id
    image.imageURI = event.params.imageURI
    image.timestamp = event.block.timestamp
    image.provenanceCount.minus(ONE_BI)
    image.save()
  } else {
    image.provenanceCount.minus(ONE_BI)
    image.save()
  }

  // update image position based on event
  let imagePositionId = imageId.concat('-').concat(user.id).concat('-').concat(token.id).concat('-').concat(event.params.tokenId.toHexString())
  let imagePosition = ImagePosition.load(imagePositionId)
  if (imagePosition === null) {
    imagePosition = new ImagePosition(imagePositionId)
    imagePosition.image = image.id
    imagePosition.token = token.id
    imagePosition.tokenId = event.params.tokenId
    imagePosition.user = user.id
    imagePosition.timestamp = event.block.timestamp
    imagePosition.active = false
    imagePosition.save()
  } else {
    imagePosition.active = false
    imagePosition.save()
  }
}
